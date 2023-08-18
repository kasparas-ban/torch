import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom"
import { motion } from "framer-motion"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import { Dialog } from "./components/ui/dialog"
import useConfirmModal from "./components/Modals/ConfirmModal/useConfirmModal"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import useModal from "./components/Modals/useModal"
import TimerPage from "./pages/TimerPage"
import ItemsPage from "./pages/ItemsPage/ItemsPage"
import TitleWrapper from "./pages/TitleWrapper"
import CalendarPage from "./pages/CalendarPage"
import WorldPage from "./pages/WorldPage"
import StatisticsPage from "./pages/StatisticsPage"
import TimerToast from "./components/TimerToast/TimerToast"
import GeneralModal from "./components/Modals/GeneralModal/GeneralModal"

const queryClient = new QueryClient()

const Wrapper = () => {
  const { isOpen: isModalOpen, closeModal } = useModal()
  const { isOpen: isConfirmOpen } = useConfirmModal()

  return (
    <motion.div
      initial={false}
      animate={{
        transform: isModalOpen || isConfirmOpen ? "scale(0.97)" : "scale(1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="origin-top pb-24"
    >
      <ScrollRestoration />
      <Dialog
        open={isModalOpen}
        onOpenChange={isOpen => !isOpen && closeModal()}
      >
        <GeneralModal />
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <TitleWrapper>
              <NavigationBar />
              <TimerToast />
              <Outlet />
            </TitleWrapper>
          </HelmetProvider>
        </QueryClientProvider>
      </Dialog>
    </motion.div>
  )
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <TimerPage />,
      },
      {
        path: "items",
        element: <ItemsPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "world",
        element: <WorldPage />,
      },
      {
        path: "stats",
        element: <StatisticsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <>Page not found</>,
  },
  {
    path: "/404",
    element: <></>,
  },
]

const router = createBrowserRouter(routes)

function App() {
  return <RouterProvider router={router} />
}

export default App
