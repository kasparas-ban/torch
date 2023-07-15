import { BrowserRouter, Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import useConfirmModal from "./components/Modals/ConfirmModal/useConfirmModal"
import NavigationBar from "./components/NavigationBar"
import useModal from "./components/Modals/useModal"
import TimerPage from "./pages/TimerPage"
import ItemsPage from "./pages/ItemsPage/ItemsPage"
import CalendarPage from "./pages/CalendarPage"
import WorldPage from "./pages/WorldPage"
import StatisticsPage from "./pages/StatisticsPage"
import "./App.css"

function App() {
  const { isOpen: isModalOpen } = useModal()
  const { isOpen: isConfirmOpen } = useConfirmModal()

  // TODO: need to disable body scroll when modal is open
  return (
    <motion.div
      initial={false}
      animate={{
        transform: isModalOpen || isConfirmOpen ? "scale(0.9)" : "scale(1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index element={<TimerPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="stats" element={<StatisticsPage />} />
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </BrowserRouter>
    </motion.div>
  )
}

export default App
