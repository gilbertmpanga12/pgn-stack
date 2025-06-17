
type Props =  {
    disconnect: () => void,
    publicKey: string,
}

export default function WalletHeader({disconnect, publicKey}: Props) {
    return (<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">PGN Staking</h1>
                <p className="text-gray-300">Stake PGN tokens and earn boosted rewards</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-300 mb-1">Connected Wallet</p>
                <p className="text-white font-mono text-sm">{publicKey}</p>
                <button
                    onClick={disconnect}
                    className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm transition-colors"
                >
                    Disconnect
                </button>
            </div>
        </div>
    </div>)
}