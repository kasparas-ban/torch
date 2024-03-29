import ComingSoon from "../components/ComingSoon"

function StatisticsPage() {
  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        <h1 className="text-5xl flex items-center font-bold text-gray-400 mb-6">
          Statistics
        </h1>
        <ComingSoon />
      </div>
    </div>
  )
}

export default StatisticsPage
