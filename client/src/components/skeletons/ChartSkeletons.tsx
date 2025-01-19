

export const LineChartSkeleton = () => (
  <div className="animate-pulse h-[300px] bg-white rounded-lg p-4">
    <div className="flex items-center justify-between mb-8">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="flex items-end justify-between h-[200px] mt-4">
      <div className="w-full flex items-end justify-between px-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-1/12">
            <div className={`w-full bg-gray-200 rounded-t h-${Math.floor(Math.random() * 32 + 16)}`}></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const RadarChartSkeleton = () => (
  <div className="animate-pulse h-[300px] bg-white rounded-lg p-4">
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-8 border-4 border-gray-200 rounded-full"></div>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1/2 bg-gray-200"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${i * 60}deg)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export const DonutChartSkeleton = () => (
  <div className="animate-pulse h-[300px] bg-white rounded-lg p-4">
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
        <div className="absolute inset-4 border-8 border-gray-100 rounded-full"></div>
      </div>
    </div>
  </div>
);

export const GaugeChartSkeleton = () => (
  <div className="animate-pulse h-[300px] bg-white rounded-lg p-4">
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute inset-0 border-8 border-t-gray-200 rounded-full"></div>
        <div className="absolute inset-4 border-8 border-t-gray-100 rounded-full"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-24 mt-4"></div>
    </div>
  </div>
);

export const StatsCardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg p-4">
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const MapChartSkeleton = () => (
  <div className="animate-pulse h-[300px] bg-white rounded-lg p-4">
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-48 bg-gray-200 rounded"></div>
    </div>
  </div>
);
