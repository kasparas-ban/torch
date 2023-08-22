import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useConfirmModal from "./components/Modals/ConfirmModal/useConfirmModal"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import TimerToast from "./components/TimerToast/TimerToast"
import useModal from "./components/Modals/useModal"
import TimerPage from "./pages/TimerPage"
import ItemsPage from "./pages/ItemsPage/ItemsPage"
import TitleWrapper from "./pages/TitleWrapper"
import CalendarPage from "./pages/CalendarPage"
import StatisticsPage from "./pages/StatisticsPage"
import WorldPage from "./pages/WorldPage"
import AccountPage from "./pages/AccountPage"
import { ROUTES } from "./routes"

const queryClient = new QueryClient()

const Wrapper = () => {
  const { isOpen: isModalOpen } = useModal()
  const { isOpen: isConfirmOpen } = useConfirmModal()

  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

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
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TitleWrapper>
            <NavigationBar />
            {!isDesktop && <TimerToast showBackdrop />}
            <Outlet />
          </TitleWrapper>
        </HelmetProvider>
      </QueryClientProvider>
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
        path: ROUTES.items.path,
        element: <ItemsPage />,
      },
      {
        path: ROUTES.calendar.path,
        element: <CalendarPage />,
      },
      {
        path: ROUTES.world.path,
        element: <WorldPage />,
      },
      {
        path: ROUTES.stats.path,
        element: <StatisticsPage />,
      },
      {
        path: ROUTES.account.path,
        element: <AccountPage />,
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
