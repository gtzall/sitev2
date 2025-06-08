export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-12",
    large: "w-16 h-16",
  }

  const textSizes = {
    small: "text-xs",
    default: "text-sm",
    large: "text-lg",
  }

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-xl shadow-lg shadow-yellow-400/30 transform rotate-3"></div>
        <div className="relative bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-xl w-full h-full flex items-center justify-center shadow-inner">
          <div className="text-black font-black tracking-tighter">
            <span className={`${textSizes[size]} font-black`}>S</span>
            <span className={`${textSizes[size]} font-black text-gray-800`}>A</span>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      {size !== "small" && (
        <div className="flex flex-col">
          <span className="text-premium-gold font-black text-lg tracking-wider">SPORTS</span>
          <span className="text-premium-gold/80 font-bold text-sm tracking-widest -mt-1">AG</span>
        </div>
      )}
    </div>
  )
}
