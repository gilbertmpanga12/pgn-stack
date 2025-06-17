import React from 'react'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'

interface TxStatus {
  type: 'success' | 'error' | 'pending'
  message: string
  txHash?: string
}

interface TransactionStatusProps {
  status: TxStatus
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.type) {
      case 'success':
        return 'bg-green-500/10 border border-green-400/30'
      case 'error':
        return 'bg-red-500/10 border border-red-400/30'
      case 'pending':
      default:
        return 'bg-blue-500/10 border border-blue-400/30'
    }
  }

  const getTextColor = () => {
    switch (status.type) {
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      case 'pending':
      default:
        return 'text-blue-400'
    }
  }

  const renderIcon = () => {
    switch (status.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-blue-400 animate-spin" />
    }
  }

  return (
    <div className={`p-4 rounded-xl flex items-center gap-3 ${getStatusStyles()}`}>
      {renderIcon()}
      <div className="flex-1">
        <p className={`text-sm font-medium ${getTextColor()}`}>
          {status.message}
        </p>
        {status.txHash && (
          <p className="text-gray-400 text-xs mt-1 font-mono break-all">
            Tx: {status.txHash}
          </p>
        )}
      </div>
    </div>
  )
}

export default TransactionStatus;