import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"

interface IAddGeneralModal {
  showModal: boolean
  closeModal: () => void
}

function AddGeneralModal({ showModal, closeModal }: IAddGeneralModal) {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={{
        content: {
          outline: "none",
          overflowY: "auto",
          scrollbarGutter: "stable both-edges",
        },
      }}
      className="absolute inset-0 m-auto mx-auto w-full border border-gray-200 bg-white p-5 sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded sm:border"
      appElement={document.getElementById("root") || undefined}
    >
      <button onClick={closeModal}>
        <BackIcon />
      </button>
      <div className="mb-6 text-center text-5xl font-semibold">Choose type</div>
      <div className="mx-auto">
        <div className="flex flex-col gap-3 px-0 pt-4 pb-2 sm:px-10">
          <button className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300">
            <div className="text-left">
              <div className="text-2xl font-semibold">Add task</div>
              <div className="my-1">One time or recurring short task</div>
              <div className="text-sm text-gray-500">
                Read 20 pages, run 3 km, study for 2 h...
              </div>
            </div>
          </button>
          <button className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300">
            <div className="text-left">
              <div className="text-2xl font-semibold">Add goal</div>
              <div className="my-1">
                Larger objective composed of smaller tasks
              </div>
              <div className="text-sm text-gray-500">
                Finish a book, run a marathon, pass the exam...
              </div>
            </div>
          </button>
          <button className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300">
            <div className="text-left">
              <div className="text-2xl font-semibold">Add dream</div>
              <div className="my-1">General aspiration to work towards</div>
              <div className="text-sm text-gray-500">
                Become a novelist, finish university...
              </div>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddGeneralModal
