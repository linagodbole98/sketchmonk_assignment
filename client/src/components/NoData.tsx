interface NoDataProps {
  message?: string
}

export const NoData = ({ message = 'No data available' }: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-400">
      <svg
        className="w-16 h-16 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M20 12H4M12 4v16m8-8l-4 4m0-8l4 4M8 8l-4 4m0-8l4 4"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  )
}
