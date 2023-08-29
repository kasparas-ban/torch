import { motion } from "framer-motion"
import { ReactComponent as AccountIcon } from "../assets/account.svg"
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"
import { ReactComponent as EmailIcon } from "../assets/email.svg"
import { ReactComponent as LockIcon } from "../assets/lock.svg"
import { ReactComponent as PaymentIcon } from "../assets/payment.svg"
import { ReactComponent as DeleteIcon } from "../assets/trash.svg"
import { GeneralModal } from "@/components/Modals/GeneralModal/GeneralModal"
import useModal from "@/components/Modals/useModal"
import { useState } from "react"

function AccountPage() {
  const {
    openAccountInfoModal,
    openEmailChangeModal,
    openPasswordChangeModal,
  } = useModal()

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <GeneralModal children={null} />
      <div className="w-full max-w-[650px] space-y-6">
        <h1 className="text-5xl flex items-center font-bold text-gray-400">
          Account
        </h1>

        <section className="flex gap-4 flex-col sm:flex-row">
          <section className="flex bg-gray-200 py-4 px-5 rounded-xl w-full items-center shadow-lg">
            <div className="h-24 w-24 rounded-full bg-gray-400" />
            <div className="flex flex-col justify-between px-5">
              <div className="font-bold">kaspis245</div>
              <div className="flex items-end">
                <span className="text-4xl font-bold mr-0.5">32</span>
                <span className="mr-2 font-bold text-xl">h</span>
                <span className="text-4xl font-bold mr-0.5">44</span>
                <span className="font-bold text-xl">min</span>
              </div>
              <div className="bg-gray-400 w-32 justify-center flex rounded-lg text-sm font-medium py-0.5 mt-2">
                Free account
              </div>
            </div>
          </section>

          <motion.button
            className="group bg-multi-color h-32 justify-around m-auto flex flex-col rounded-xl py-3 px-5 w-full items-center text-sm text-gray-700 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-semibold text-lg text-gray-800">
              Unlock more features
            </div>
            <div className="flex text-left tracking-wide font-medium items-center text-gray-800">
              <div>
                <span className="mr-1">📈</span>
                Stats
              </div>
              <div className="h-1 w-1 rounded-full mx-2 bg-gray-800/40" />
              <div>
                <span className="mr-1">📅</span>Calendar
              </div>
              <div className="h-1 w-1 rounded-full mx-2 bg-gray-800/40" />
              <div>
                <span className="mr-1">🤝</span>Support
              </div>
            </div>
            <div className="relative rounded-md text-2xl transition-all duration-75 ease-in font-bold text-gray-200">
              Become a member
            </div>
          </motion.button>
        </section>

        <section>
          <h2 className="text-gray-800 text-xl font-bold mb-4">
            Account details
          </h2>
          <div className="flex gap-20">
            <div className="flex flex-col text-gray-500 space-y-2">
              <div>Username</div>
              <div>Email</div>
              <div>Age</div>
              <div>Gender</div>
              <div>Joined since</div>
              <div>Location</div>
            </div>
            <div className="flex flex-col font-semibold text-gray-800 space-y-2">
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
          <h2 className="text-gray-800 text-xl font-bold mb-4">Settings</h2>
          <div className="flex flex-col">
            <motion.button
              className="flex items-center w-full py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openAccountInfoModal}
            >
              <AccountIcon className="w-7 h-7 mr-3" />
              <div className="font-medium">Edit account info</div>
              <ArrowIcon className="w-4 h-4 rotate-[270deg] ml-auto" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex items-center w-full py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openEmailChangeModal}
            >
              <EmailIcon className="w-7 h-7 mr-3" />
              <div className="font-medium">Change email</div>
              <ArrowIcon className="w-4 h-4 rotate-[270deg] ml-auto" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex items-center w-full py-3"
              whileTap={{ scale: 0.99 }}
              onClick={openPasswordChangeModal}
            >
              <LockIcon className="w-7 h-7 mr-3" />
              <div className="font-medium">Change password</div>
              <ArrowIcon className="w-4 h-4 rotate-[270deg] ml-auto" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex items-center w-full py-3"
              whileTap={{ scale: 0.99 }}
            >
              <PaymentIcon className="w-7 h-7 mr-3" />
              <div className="font-medium">Manage subscription</div>
              <ArrowIcon className="w-4 h-4 rotate-[270deg] ml-auto" />
            </motion.button>
            <div className="h-px bg-gray-200" />
            <motion.button
              className="flex items-center w-full py-3"
              whileTap={{ scale: 0.99 }}
            >
              <DeleteIcon className="w-7 h-7 mr-3" />
              <div className="font-medium">Delete account</div>
              <ArrowIcon className="w-4 h-4 rotate-[270deg] ml-auto" />
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AccountPage
