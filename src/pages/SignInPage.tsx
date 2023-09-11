import { motion } from "framer-motion"
import { SignIn } from "@clerk/clerk-react"

function SignInPage() {
  return (
    <motion.div
      className="mt-8 flex justify-center [&>div>div]:[border:none] [&>div>div]:[box-shadow:none]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/?signInSuccess=true" />
    </motion.div>
  )
}

export default SignInPage
