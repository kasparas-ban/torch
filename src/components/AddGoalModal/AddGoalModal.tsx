import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"

interface IAddGoalModal {
  modalIsOpen: boolean
  closeModal: () => void
}

function AddGoalModal({ modalIsOpen, closeModal }: IAddGoalModal) {
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <button onClick={closeModal}>
        <BackIcon />
      </button>
      <div className="text-center text-5xl font-semibold">New Goal</div>
      <form>
        <div className="max-w-sm"></div>
        <Input />
      </form>
    </Modal>
  )
}

function Input() {
  return (
    <div className="px-10 pt-4 pb-8">
      <form className="mt-12">
        <div className="relative mb-8">
          <input
            id="goal_title"
            name="goal_title"
            type="text"
            className="peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
            placeholder="Aa..."
          />
          <label
            htmlFor="goal_title"
            className="absolute left-0 cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:-top-[22px] peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
          >
            Goal title
          </label>
          <div className="absolute right-0 top-2 cursor-text px-4 text-gray-400 transition-all peer-focus:hidden">
            <EditIcon />
          </div>
        </div>

        <div className="relative mb-8">
          <ul className="grid w-full gap-4 md:grid-cols-3">
            <li>
              <input
                type="radio"
                id="priority-low"
                name="priority"
                value="0"
                className="peer hidden"
                required
              />
              <label
                htmlFor="priority-low"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
              >
                Low
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="priority-medium"
                name="priority"
                value="1"
                defaultChecked
                className="peer hidden"
              />
              <label
                htmlFor="priority-medium"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
              >
                Medium
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="priority-high"
                name="priority"
                value="2"
                className="peer hidden"
              />
              <label
                htmlFor="priority-high"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
              >
                High
              </label>
            </li>
          </ul>
          <label
            htmlFor="priority"
            className="absolute left-0 -top-[22px] cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Priority
          </label>
        </div>

        <div className="relative mb-8">
          <input
            id="goal_deadline"
            name="goal_deadline"
            type="text"
            className="peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
            placeholder="Aa..."
          />
          <label
            htmlFor="goal_deadline"
            className="absolute left-0 cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:-top-[22px] peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
          >
            Deadline
          </label>
          <div className="absolute right-0 top-2 cursor-text px-4 text-gray-400 transition-all peer-focus:hidden">
            <EditIcon />
          </div>
        </div>

        {/* <div className="relative mb-7">
          <input
            id="goal_title"
            name="goal_title"
            type="text"
            className="peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 placeholder-transparent focus:bg-white focus:outline-2 focus:outline-blue-500/50"
            placeholder="john@doe.com"
          />
          <label
            htmlFor="goal_title"
            className="absolute left-0 -top-5 cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Deadline
          </label>
          <div className="absolute right-0 top-2 cursor-text px-4 text-gray-400 transition-all peer-focus:hidden">
            <EditIcon />
          </div>
        </div> */}

        {/* ========================================================= */}

        {/* <div className="relative">
          <input
            id="email"
            name="email"
            type="text"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
            placeholder="john@doe.com"
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Email address
          </label>
        </div> */}
        {/* <div className="relative mt-10">
          <input
            id="password"
            type="password"
            name="password"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Password
          </label>
        </div> */}

        {/* <input
          type="sumbit"
          value="Sign in"
          className="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2"
        /> */}
      </form>
      {/* <a
        href="#"
        className="mt-4 block text-center text-sm font-medium text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        {" "}
        Forgot your password?{" "}
      </a> */}
    </div>
  )
}

export default AddGoalModal
