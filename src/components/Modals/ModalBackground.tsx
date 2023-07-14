import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

function ModalBackground({ closeModal }: { closeModal: () => void }) {
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e: MouseEvent) =>
    backgroundRef.current?.contains(e.target as Node) && closeModal()

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.div
      ref={backgroundRef}
      initial={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
      }}
      animate={{
        backgroundColor: "rgba(80, 80, 80, 0.1)",
        backdropFilter: "blur(4px)",
        transition: { duration: 0.2 },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
        transition: { duration: 0.2 },
      }}
      className="absolute inset-0 z-10 bg-gray-200"
    />
  )
}

export default ModalBackground
