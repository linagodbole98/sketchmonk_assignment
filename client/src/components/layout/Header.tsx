export const Header = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Voice Search */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
          🎤
        </button>

        {/* Notifications */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 relative">
          🔔
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
          ⚙️
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            U
          </div>
          <div className="text-orange-500 font-medium">•</div>
        </div>
      </div>
    </div>
  )
}
