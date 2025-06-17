import React from 'react'

interface TimelockOption {
  id: string
  label: string
  months: number
  boost: string
  description: string
}

interface StakingSummaryProps {
  stakeAmount: string
  selectedTimelockData: TimelockOption | undefined
}

const StakingSummary: React.FC<StakingSummaryProps> = ({
  stakeAmount,
  selectedTimelockData,
}) => {
  return (
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
  )
}

export default StakingSummary