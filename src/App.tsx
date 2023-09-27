import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom"
import { motion } from "framer-motion"
import { neobrutalism } from "@clerk/themes"
import { useMediaQuery } from "react-responsive"
import { ClerkProvider } from "@clerk/clerk-react"
import { HelmetProvider } from "react-helmet-async"
import { QueryClientProvider } from "@tanstack/react-query"
import useConfirmModal from "./components/Modals/ConfirmModal/useConfirmModal"
import { GeneralModal } from "./components/Modals/GeneralModal/GeneralModal"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import TimerToast from "./components/TimerToast/TimerToast"
import useModal from "./components/Modals/useModal"
import { Toaster } from "@/components/ui/toaster"
import TimerPage from "./pages/TimerPage"
import { queryClient } from "./API/apiConfig"
import ItemsPage from "./pages/ItemsPage/ItemsPage"
import TitleWrapper from "./pages/TitleWrapper"
import CalendarPage from "./pages/CalendarPage"
import StatisticsPage from "./pages/StatisticsPage"
import WorldPage from "./pages/WorldPage"
import AccountPage from "./pages/AccountPage"
import { ROUTES } from "./routes"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY

const Wrapper = () => {
  const { isOpen: isModalOpen } = useModal()
  const { isOpen: isConfirmOpen } = useConfirmModal()

  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          transform: isModalOpen || isConfirmOpen ? "scale(0.97)" : "scale(1)",
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        className="origin-top pb-24"
      >
        <ScrollRestoration />
        <ClerkProvider
          publishableKey={clerkPubKey}
          appearance={{ baseTheme: neobrutalism }}
        >
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <TitleWrapper>
                <NavigationBar />
                {!isDesktop && <TimerToast showBackdrop />}
                <GeneralModal />
                <Outlet />
              </TitleWrapper>
            </HelmetProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </motion.div>
      <Toaster />
    </>
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
      {
        path: ROUTES.signIn.path,
        element: <SignInPage />,
      },
      {
        path: ROUTES.signUp.path,
        element: <SignUpPage />,
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
