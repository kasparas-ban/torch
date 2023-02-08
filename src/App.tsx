import Timer from "./components/Timer"
import "./App.css"

function App() {
  const initialTime = 4 //5 * 60

  return (
    <>
      <main>
        <Timer initialTime={initialTime} />
      </main>
    </>
  )
}

export default App
