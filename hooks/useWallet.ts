import { useState, useEffect } from 'react'

declare global {
  interface Window {
    solana?: any
  }
}

export const useWallet = () => {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const provider = window?.solana
    provider.on('connect', () => {
      setConnected(true)
      setPublicKey(provider.publicKey.toString())
    })
    provider.on('disconnect', () => {
      disconnect()
    })
  }, [])

  const connect = () => {
    const provider = window?.solana
    setConnected(true)
    setPublicKey(provider.publicKey.toString())
  }

  const disconnect = async () => {
    try {
      const provider = window?.solana
      setConnected(false)
      setPublicKey(null)
      provider.disconnect()
    } catch (e) {
      console.log(e)
    }
  }

  return { connected, publicKey, connect, disconnect }
}
