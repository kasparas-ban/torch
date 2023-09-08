import { motion } from "framer-motion"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import SignInPage from "./SignInPage"
import { Button } from "@/components/ui/button"
import useModal from "@/components/Modals/useModal"
import { useToast } from "@/components/ui/use-toast"
import { GeneralModal } from "@/components/Modals/GeneralModal/GeneralModal"
import { ReactComponent as AccountIcon } from "../assets/account.svg"
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"
import { ReactComponent as EmailIcon } from "../assets/email.svg"
import { ReactComponent as LockIcon } from "../assets/lock.svg"
import { ReactComponent as PaymentIcon } from "../assets/payment.svg"
import { ReactComponent as DeleteIcon } from "../assets/trash.svg"
import { ReactComponent as SignOutIcon } from "../assets/sign_out.svg"

function AccountPage() {
  const {
    openAccountInfoModal,
    openEmailChangeModal,
    openPasswordChangeModal,
    openAccountDeleteModal,
  } = useModal()

  const { isSignedIn } = useUser()
  const { toast } = useToast()

  if (!isSignedIn) return <SignInPage />

  const showSignOutToast = async () => {
    toast({ description: "You signed-out successfully." })
  }

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px] space-y-6">
        <h1 className="flex items-center text-5xl font-bold text-gray-400">
          Account
        </h1>

        <section className="flex flex-col gap-4 sm:flex-row">
          <section className="flex w-full items-center rounded-xl bg-gray-200 px-5 py-4 shadow-lg">
            <div className="h-24 w-24 rounded-full bg-gray-400" />
            <div className="flex flex-col justify-between px-5">
              <div className="font-bold">kaspis245</div>
              <div className="flex items-end">
                <span className="mr-0.5 text-4xl font-bold">32</span>
                <span className="mr-2 text-xl font-bold">h</span>
                <span className="mr-0.5 text-4xl font-bold">44</span>
                <span className="text-xl font-bold">min</span>
              </div>
              <div className="mt-2 flex w-32 justify-center rounded-lg bg-gray-400 py-0.5 text-sm font-medium">
                Free account
              </div>
            </div>
          </section>

          <motion.button
            className="bg-multi-color group m-auto flex h-32 w-full flex-col items-center justify-around rounded-xl px-5 py-3 text-sm text-gray-700 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-lg font-semibold text-gray-800">
              Unlock more features
            </div>
            <div className="flex items-center text-left font-medium tracking-wide text-gray-800">
              <div>
                <span className="mr-1">📈</span>
                Stats
              </div>
              <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
              <div>
                <span className="mr-1">📅</span>Calendar
              </div>
              <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
              <div>
                <span className="mr-1">🤝</span>Support
              </div>
            </div>
            <div className="relative rounded-md text-2xl font-bold text-white transition-all duration-75 ease-in">
              Become a member
            </div>
          </motion.button>
        </section>

        <section className="flex sm:hidden">
          <motion.div className="mx-auto w-full" whileTap={{ scale: 0.95 }}>
            <Button className="text-md w-full bg-gray-600 pl-8 pr-10 hover:bg-gray-600">
              <SignOutIcon className="t-2 relative top-px mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </motion.div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Account details
          </h2>
          <div className="flex gap-20">
            <div className="flex flex-col space-y-2 text-gray-500">
              <div>Username</div>
              <div>Email</div>
              <div>Age</div>
              <div>Gender</div>
              <div>Joined since</div>
              <div>Location</div>
            </div>
            <div className="flex flex-col space-y-2 font-semibold text-gray-800">
              <div>kaspis245</div>
              <div>kasparas@gmail.com</div>
              <div>26</div>
              <div>Male</div>
              <div>September 23rd, 2023</div>
              <div>Lithuania, Vilnius 🇱🇹</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800">Settings</h2>
          <div className="flex flex-col">
            <GeneralModal children={null} />
            <div className="hidden sm:block">
              <SignOutButton signOutCallback={showSignOutToast}>
                <motion.div
                  className="flex w-full items-center py-3 hover:cursor-pointer"
                  whileTap={{ scale: 0.99 }}
                >
                  <SignOutIcon className="mr-3 h-7 w-7" />
                  <div className="font-medium">Sign Out</div>
                  <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
                </motion.div>
              </SignOutButton>
            </div>
            <div className="hidden h-px bg-gray-200 sm:block" />
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openAccountInfoModal}
            >
              <AccountIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Edit account info</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openEmailChangeModal}
            >
              <EmailIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Change email</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openPasswordChangeModal}
            >
              <LockIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Change password</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
            >
              <PaymentIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Manage subscription</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openAccountDeleteModal}
            >
              <DeleteIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Delete account</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AccountPage
