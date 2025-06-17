import { TrendingUp } from 'lucide-react'
import { useEffect } from 'react';

type Props = {
  pgnBalance: string,
  stakedAmount: string,
  selectedTimelockData: any,
  myBalance: string,
};

export default function AccountOverview({
  pgnBalance,
  stakedAmount,
  selectedTimelockData,
 myBalance = '0.00'
}: Props) {
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Account Overview
      </h2>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-300 text-sm mb-1">Available PGN Balance</p>
          <p className="text-2xl font-bold text-green-400">{pgnBalance} PGN</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-300 text-sm mb-1">My PGN Balance</p>
          <p className="text-2xl font-bold text-blue-400">{myBalance} PGN</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-300 text-sm mb-1">Currently Staked</p>
          <p className="text-2xl font-bold text-blue-400">{stakedAmount} PGN</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-300 text-sm mb-1">Current Boost</p>
          <p className="text-2xl font-bold text-purple-400">
            {selectedTimelockData?.boost}
          </p>
        </div>
      </div>
    </div>
  )
}
