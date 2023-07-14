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
        opacity: 0,
      }}
      animate={{
        opacity: 0.9,
        transition: { duration: 0.2 },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      className="absolute inset-0 z-10 bg-gray-200"
    />
  )
}

export default ModalBackground
