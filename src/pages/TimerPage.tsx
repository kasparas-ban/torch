import Timer from "../components/Timer/Timer"

function TimerPage() {
  return (
    <>
      <div className="mx-auto mb-2 mt-3 flex max-w-[650px] max-[768px]:px-4">
        <h1 className="flex items-center text-5xl font-bold text-gray-400">
          Timer
        </h1>
      </div>
      <Timer />
    </>
  )
}

export default TimerPage
