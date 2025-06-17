'use client'
// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react'
import { Clock, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Program, AnchorProvider, setProvider, BN } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

// Components
import WalletConnector from './components/WalletConnector'
import WalletHeader from './components/WalletHeader'
import AccountOverview from './components/AccountOverview'

// Hooks & Utils
import { useWallet } from '@/hooks/useWallet'
import { accountInfo } from '@/lib/solana/connection'
import type { PgnStaking } from '@/idl/staking_devnet'
import idl from '@/idl/staking_devnet.json'

// Constants
const PROGRAM_ID = new PublicKey("8icXpLgEgEVVbvhTAgL7W7AUMZbaUh1UJ1czMiQXCuVE")
const LAMPORTS_PER_SOL = 1_000_000_000

// Timelock options with boost multipliers
const TIMELOCK_OPTIONS = [
  {
    id: 'noLock',
    label: 'No Lock',
    months: 0,
    boost: '1x',
    description: 'Unstake anytime',
  },
  {
    id: 'oneMonth',
    label: '1 Month',
    months: 1,
    boost: '2x',
    description: '30 days locked',
  },
  {
    id: 'threeMonths',
    label: '3 Months',
    months: 3,
    boost: '3x',
    description: '90 days locked',
  },
  {
    id: 'sixMonths',
    label: '6 Months',
    months: 6,
    boost: '4x',
    description: '180 days locked',
  },
  {
    id: 'nineMonths',
    label: '9 Months',
    months: 9,
    boost: '5x',
    description: '270 days locked',
  },
]

// Types
interface TxStatus {
  type: 'success' | 'error' | 'pending'
  message: string
  txHash?: string
}

const StakingInterface: React.FC = () => {
  // Wallet & Connection
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const { connected, connect, disconnect, publicKey } = useWallet()

  // State
  const [pgnBalance, setPgnBalance] = useState('0.00')
  const [stakedAmount, setStakedAmount] = useState('0.00')
  const [myBalance, setMyBalance] = useState('0.00')
  const [stakeAmount, setStakeAmount] = useState('')
  const [selectedTimelock, setSelectedTimelock] = useState('oneMonth')
  const [isStaking, setIsStaking] = useState(false)
  const [txStatus, setTxStatus] = useState<TxStatus | null>(null)

  // Anchor setup
  const provider = wallet ? new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  ) : null

  const program = provider ? new Program(idl as PgnStaking, provider) : null


  if (provider) {
    setProvider(provider)
  }


  const formatBalance = (balance: number): string => {
    return `${(balance / LAMPORTS_PER_SOL)}`
  }

  const getProgramStatePDA = useCallback((): PublicKey => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("program_state")],
      PROGRAM_ID
    )[0]
  }, [])

  const getUserStakePDA = useCallback((userPublicKey: PublicKey): PublicKey => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("user_stake"), userPublicKey.toBuffer()],
      PROGRAM_ID
    )[0]
  }, [])

  const getVaultPDA = useCallback((): PublicKey => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      PROGRAM_ID
    )[0]
  }, [])

  // Fetch wallet information
  const fetchWalletInfo = useCallback(async () => {
    if (!publicKey) return

    try {
      const info = await accountInfo(publicKey)
      
      if (info?.accountInfo?.lamports) {
        setPgnBalance(formatBalance(info.accountInfo.lamports))
      }
      
      if (info?.myBalance) {
        setMyBalance(formatBalance(info.myBalance))
      }
    } catch (error) {
      console.error('Error fetching wallet info:', error)
      setTxStatus({
        type: 'error',
        message: 'Failed to fetch wallet information'
      })
    }
  }, [publicKey])

  // Effects
  useEffect(() => {
    if (publicKey) {
      fetchWalletInfo()
    }
  }, [publicKey, fetchWalletInfo])

  // Clear status after delay
  useEffect(() => {
    if (txStatus) {
      const timer = setTimeout(() => setTxStatus(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [txStatus])

  // Handlers
  const handleMaxClick = () => {
    setStakeAmount(pgnBalance.replace(',', ''))
  }

  const handleStake = async () => {
    if (!program || !publicKey) {
      setTxStatus({ type: 'error', message: 'Wallet not connected properly' })
      return
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setTxStatus({ type: 'error', message: 'Please enter a valid amount' })
      return
    }

    setIsStaking(true)
    setTxStatus({ type: 'pending', message: 'Preparing transaction...' })

    try {
      const userPublicKey = typeof publicKey === 'string' 
        ? new PublicKey(publicKey) 
        : publicKey

      const programStatePDA = getProgramStatePDA()
      const userStakePDA = getUserStakePDA(userPublicKey)
      const vaultPDA = getVaultPDA()

      // Fetch program state to get PGN mint
      const programStateAccount = await program.account.programState.fetch(programStatePDA)
      const pgnMint = programStateAccount.pgnMint

      // Get user's token account
      const userTokenAccount = await getAssociatedTokenAddress(
        pgnMint,
        userPublicKey
      )

      const stakeAmountBN = new BN(parseFloat(stakeAmount) * LAMPORTS_PER_SOL)
      const timelockOption = { [selectedTimelock]: {} }

      setTxStatus({ type: 'pending', message: 'Sending transaction...' })

      const txHash = await program.methods
        .stake(stakeAmountBN, timelockOption)
        .accounts({
          programState: programStatePDA,
          userStake: userStakePDA,
          userTokenAccount: userTokenAccount,
          vault: vaultPDA,
          user: userPublicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc()

      setTxStatus({
        type: 'success',
        message: `Successfully staked ${stakeAmount} PGN tokens!`,
        txHash: txHash,
      })

      // Update balances
      const stakedValue = parseFloat(stakeAmount)
      const currentBalance = parseFloat(pgnBalance.replace(',', ''))
      setPgnBalance((currentBalance - stakedValue).toFixed(2))
      setStakedAmount(
        (parseFloat(stakedAmount.replace(',', '')) + stakedValue).toFixed(2)
      )
      setStakeAmount('')

    } catch (error) {
      console.error('Staking error:', error)
      setTxStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Transaction failed. Please try again.',
      })
    } finally {
      setIsStaking(false)
    }
  }

  // Computed values
  const selectedTimelockData = TIMELOCK_OPTIONS.find(
    (option) => option.id === selectedTimelock
  )

  const isValidAmount = stakeAmount && parseFloat(stakeAmount) > 0

  // Render wallet connector if not connected
  if (!connected) {
    return <WalletConnector connect={connect} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <WalletHeader publicKey={publicKey} disconnect={disconnect} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Overview */}
          <AccountOverview
            pgnBalance={pgnBalance}
            stakedAmount={stakedAmount}
            selectedTimelockData={selectedTimelockData}
            myBalance={myBalance}
          />

          {/* Staking Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Stake PGN Tokens
            </h2>

            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Amount to Stake
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    disabled={isStaking}
                  />
                  <span className="absolute right-3 top-3 text-gray-400">
                    PGN
                  </span>
                </div>
                <button
                  onClick={handleMaxClick}
                  disabled={isStaking}
                  className="mt-2 text-purple-400 hover:text-purple-300 text-sm transition-colors disabled:opacity-50"
                >
                  Max: {pgnBalance} PGN
                </button>
              </div>

              {/* Timelock Selection */}
              <div>
                <label className="block text-gray-300 text-sm mb-3">
                  Select Timelock Period
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {TIMELOCK_OPTIONS.map((option) => (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="timelock"
                        value={option.id}
                        checked={selectedTimelock === option.id}
                        onChange={(e) => setSelectedTimelock(e.target.value)}
                        disabled={isStaking}
                        className="sr-only"
                      />
                      <div
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedTimelock === option.id
                            ? 'border-purple-400 bg-purple-400/10'
                            : 'border-white/20 bg-white/5 hover:border-white/30'
                        } ${isStaking ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">
                              {option.label}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {option.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">
                              {option.boost}
                            </p>
                            <p className="text-gray-400 text-sm">boost</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Staking Summary */}
              {isValidAmount && (
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4">
                  <h3 className="text-purple-200 font-medium mb-2">
                    Staking Summary
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Amount:</span>
                      <span className="text-white">{stakeAmount} PGN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lock Period:</span>
                      <span className="text-white">
                        {selectedTimelockData?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Reward Boost:</span>
                      <span className="text-green-400 font-medium">
                        {selectedTimelockData?.boost}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {txStatus && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    txStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-400/30'
                      : txStatus.type === 'error'
                      ? 'bg-red-500/10 border border-red-400/30'
                      : 'bg-blue-500/10 border border-blue-400/30'
                  }`}
                >
                  {txStatus.type === 'success' && (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  )}
                  {txStatus.type === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  {txStatus.type === 'pending' && (
                    <Clock className="w-5 h-5 text-blue-400 animate-spin" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        txStatus.type === 'success'
                          ? 'text-green-400'
                          : txStatus.type === 'error'
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {txStatus.message}
                    </p>
                    {txStatus.txHash && (
                      <p className="text-gray-400 text-xs mt-1 font-mono break-all">
                        Tx: {txStatus.txHash}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Stake Button */}
              <button
                onClick={handleStake}
                disabled={isStaking || !isValidAmount}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isStaking ? (
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" />
                    Staking...
                  </div>
                ) : (
                  `Stake ${stakeAmount || '0'} PGN`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingInterface