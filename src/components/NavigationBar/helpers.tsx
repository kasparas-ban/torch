import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

export function useScrollPosition() {
  const [yScroll, setYScroll] = useState(window.scrollY)

  useEffect(() => {
    const setScroll = () => setYScroll(window.scrollY)
    window.addEventListener("scroll", setScroll)
    return () => window.removeEventListener("scroll", setScroll)
  }, [])

  return { yScroll }
}

export function NavigationBarWrapper({ children }: { children: ReactNode }) {
  const { yScroll } = useScrollPosition()

  return (
    <motion.nav
      layout
      className={clsx("flex justify-between rounded-2xl backdrop-blur-sm")}
      animate={{
        backgroundColor: yScroll ? "rgb(156 163 175 / 0.3)" : "rgb(0 0 0 / 0)",
        paddingLeft: yScroll ? 24 : 0,
        paddingRight: yScroll ? 24 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.nav>
  )
}
