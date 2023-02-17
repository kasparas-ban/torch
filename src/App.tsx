import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import TimerPage from "./pages/TimerPage"
import GoalsPage from "./pages/GoalsPage"
import CalendarPage from "./pages/CalendarPage"
import WorldPage from "./pages/WorldPage"
import StatisticsPage from "./pages/StatisticsPage"
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index element={<TimerPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="stats" element={<StatisticsPage />} />
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
