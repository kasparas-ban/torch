import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import Timer from "../components/Timer/Timer"
import { useToast } from "@/components/ui/use-toast"

function TimerPage() {
  const location = useLocation()
  const { isSignedIn } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const search = location.search
    const signedInParam = new URLSearchParams(search).get("signInSuccess")
    if (isSignedIn && signedInParam)
      toast({ description: "You signed-in successfully." })
  }, [isSignedIn])

  return (
    <>
      <div className="mx-auto mb-2 mt-3 flex max-w-[650px] max-[768px]:px-4">
        <h1 className="flex items-center text-5xl font-bold text-gray-400">
          Timer
        </h1>
      </div>
      <Timer />
    </>
  )
}

export default TimerPage
