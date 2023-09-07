import ComingSoon from "../components/ComingSoon"

function CalendarPage() {
  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        <h1 className="mb-6 flex items-center text-5xl font-bold text-gray-400">
          Calendar
        </h1>
        <ComingSoon />
      </div>
    </div>
  )
}

export default CalendarPage
