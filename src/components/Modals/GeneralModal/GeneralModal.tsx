import { motion } from "framer-motion"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useModal from "../useModal"
import "../inputStyles.css"

function GeneralModal() {
  const { modalContent, modalTitle } = useModal()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle asChild>
          <motion.h1 layout>{modalTitle}</motion.h1>
        </DialogTitle>
      </DialogHeader>
      {modalContent}
    </DialogContent>
  )
}

export default GeneralModal
