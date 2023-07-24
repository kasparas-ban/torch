import { BrowserRouter, Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import useConfirmModal from "./components/Modals/ConfirmModal/useConfirmModal"
import NavigationBar from "./components/NavigationBar"
import useModal from "./components/Modals/useModal"
import TimerPage from "./pages/TimerPage"
import ItemsPage from "./pages/ItemsPage/ItemsPage"
import TitleWrapper from "./pages/TitleWrapper"
import CalendarPage from "./pages/CalendarPage"
import WorldPage from "./pages/WorldPage"
import StatisticsPage from "./pages/StatisticsPage"
import TimerToast from "./components/TimerToast/TimerToast"

const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <TitleWrapper>
              <NavigationBar />
              <TimerToast />
              <Routes>
                <Route index element={<TimerPage />} />
                <Route path="items" element={<ItemsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="world" element={<WorldPage />} />
                <Route path="stats" element={<StatisticsPage />} />
                <Route path="*" element={<>Page not found</>} />
              </Routes>
            </TitleWrapper>
          </HelmetProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </motion.div>
  )
}

export default App
