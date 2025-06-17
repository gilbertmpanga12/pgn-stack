'use client'
import React, { useState, useEffect } from 'react'
import {
  Wallet,
  Clock,
  Lock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import WalletConnector from './components/WalletConnector'
import WalletHeader from './components/WalletHeader'
import AccountOverview from './components/AccountOverview'
import { useWallet } from '@/hooks/useWallet'
import { accountInfo } from '@/lib/solana/connection'
import { Program, AnchorProvider, setProvider, BN } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import type { PgnStaking } from '@/idl/staking_devnet'
import idl from '@/idl/staking_devnet.json'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

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

const StakingInterface = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const provider = new AnchorProvider(connection, wallet as any, {})
  setProvider(provider)
  const program = new Program(idl as PgnStaking, {
    connection,
  })
  const { connected, connect, disconnect } = useWallet()
  const [pgnBalance, setPgnBalance] = useState('0.00')
  const [stakedAmount, setStakedAmount] = useState('0.00')
  const [stakeAmount, setStakeAmount] = useState('')
  const [selectedTimelock, setSelectedTimelock] = useState('oneMonth')
  const [isStaking, setIsStaking] = useState(false)
  const [txStatus, setTxStatus] = useState<any>(null)

  useEffect(() => {
    async function fetchWalletInfo() {
      const info = await accountInfo()
      console.log(info)
      setPgnBalance(
        `${(info?.accountInfo?.lamports as number) / 1_000_000_000}`,
      )
    }
    fetchWalletInfo()
  }, [])

  const [programStatePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId,
  )

  if (publicKey) {
    var [userStakePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('user_stake'), new PublicKey(publicKey).toBuffer()],
      program.programId,
    )

    console.log('userStakePDA:', userStakePDA.toBase58())
  }

  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault')],
    program.programId,
  )

  useEffect(() => {
    (async() => {
      const x = program?.account?.programState
      console.log('check state', x);
    })()
  }, [publicKey])


  // Mock function to handle staking (you'll replace with actual Anchor call)
  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setTxStatus({ type: 'error', message: 'Please enter a valid amount' })
      return
    }

    setIsStaking(true)
    setTxStatus({ type: 'pending', message: 'Preparing transaction...' })

    try {
      await program.account
      const programState = program?.account?.programState
      const pgnMint = programState.pgnMint

      const userTokenAccount = await getAssociatedTokenAddress(
        pgnMint,
        publicKey,
      )

      const tx = await program.methods
        .stake(new BN(parseFloat(stakeAmount) * 1e9), {
          [selectedTimelock]: {},
        })
        .accounts({
          user: publicKey,
          userTokenAccount,
          vault: vaultPDA,
          userStake: userStakePDA,
          programState: programStatePDA,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc()
      console.log('---->', tx)
      setTxStatus({
        type: 'success',
        message: `Successfully staked ${stakeAmount} PGN tokens!`,
        txHash: 'demo_tx_hash_123...',
      })

      // Update balances
      const stakedValue = parseFloat(stakeAmount)
      const currentBalance = parseFloat(pgnBalance.replace(',', ''))
      setPgnBalance((currentBalance - stakedValue).toLocaleString())
      setStakedAmount(
        (
          parseFloat(stakedAmount.replace(',', '')) + stakedValue
        ).toLocaleString(),
      )
      setStakeAmount('')
    } catch (error) {
      console.log(error)
      setTxStatus({
        type: 'error',
        message: 'Transaction failed. Please try again.',
      })
    } finally {
      setIsStaking(false)
      setTimeout(() => setTxStatus(null), 5000)
    }
  }

  const selectedTimelockData = TIMELOCK_OPTIONS.find(
    (option) => option.id === selectedTimelock,
  )

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
                  />
                  <span className="absolute right-3 top-3 text-gray-400">
                    PGN
                  </span>
                </div>
                <button
                  onClick={() => setStakeAmount(pgnBalance.replace(',', ''))}
                  className="mt-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
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
                        className="sr-only"
                      />
                      <div
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedTimelock === option.id
                            ? 'border-purple-400 bg-purple-400/10'
                            : 'border-white/20 bg-white/5 hover:border-white/30'
                        }`}
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
              {stakeAmount && (
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
                  <div>
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
                      <p className="text-gray-400 text-xs mt-1 font-mono">
                        Tx: {txStatus.txHash}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Stake Button handleStake*/}
              <button
                onClick={handleStake}
                disabled={
                  isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0
                }
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
