import { Program, AnchorProvider, setProvider } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import type { PgnStaking } from '@/idl/staking_devnet'
import idl from '@/idl/staking_devnet.json'

export const stakeSubmitter = () => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const provider = new AnchorProvider(connection, wallet as any, {})
  setProvider(provider);
  const program = new Program(idl as PgnStaking, {
    connection,
  })
 console.log(program)
}
