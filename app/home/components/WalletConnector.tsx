import { Wallet } from "lucide-react";
import {WalletButton} from './WalletButton';

type Props =  {
    connect: () => void
}

export default function WalletConnector({connect}: Props){
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">PGN Staking</h1>
            <p className="text-gray-300 mb-8">Connect your wallet to start staking PGN tokens and earn boosted rewards</p>
            <WalletButton/>
          </div>
        </div>
      </div>
    )
}