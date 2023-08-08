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

export function NavigationBarWrapper({
  children,
  mobile,
}: {
  children: ReactNode
  mobile?: boolean
}) {
  const { yScroll } = useScrollPosition()

  const backgroundColorMobile = "rgb(156 163 175 / 0.3)"
  const backgroundColorDesktop = yScroll
    ? "rgb(156 163 175 / 0.3)"
    : "rgb(0 0 0 / 0)"

  return (
    <motion.nav
      layout
      className={clsx("flex justify-between rounded-2xl backdrop-blur-sm")}
      animate={{
        backgroundColor: mobile
          ? backgroundColorMobile
          : backgroundColorDesktop,
        paddingLeft: !mobile && yScroll ? 24 : 0,
        paddingRight: !mobile && yScroll ? 24 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.nav>
  )
}
