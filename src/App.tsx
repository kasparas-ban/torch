import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const initialTime =  5 * 60

  return (
    <>
      <main>
        <Timer initialTime={initialTime} />
      </main>
    </>
  )
}

interface ITimer {
  initialTime: number,
}

function Timer({ initialTime }: ITimer) {
  const [time, setTime] = useState(initialTime)
  const minutes = Math.floor(time/60)
  const seconds = time - (minutes * 60)

  const handleTimerButton = () => {
    let timesRun = time
    const interval = setInterval(() => {
      if (timesRun <= 0)  {
        clearInterval(interval)
      } else {
        setTime(prev => prev - 1)
        timesRun -= 1
      }
    }, 1000)
  }

  return (
    <>
      <div className="flex flex-col m-auto mt-8 aspect-square max-w-xs max-[320px]:mx-2 justify-center rounded-full border border-rose-800">
        <div className="text-center text-8xl font-thin">{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</div>
      </div>
      <button type="submit" onClick={handleTimerButton} className="flex m-auto mt-8 w-20 h-20 rounded-full border border-rose-800">
        <div className="m-auto">Start</div>
      </button>
    </>
  )
}

export default App
