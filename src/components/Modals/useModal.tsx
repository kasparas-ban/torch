import React from "react"
import { create } from "zustand"
import { Dream, GeneralItem, Goal, Task } from "../../types"
import GeneralForm from "./ModalForms/GeneralForm"
import TaskForm from "./ModalForms/TaskForm"
import GoalForm from "./ModalForms/GoalForm"
import DreamForm from "./ModalForms/DreamForm"
import TimerSettings from "../Timer/TimerSettings"

type ModalState = {
  title: string
  modalKey: string
  isOpen: boolean
  editItem?: GeneralItem
  modalContent?: React.ReactNode
  addTaskOnOpen: boolean
  openGeneralOnClose?: boolean

  openTaskModal: (item?: Task, openGeneralOnClose?: boolean) => void
  openGoalModal: (
    item?: Goal,
    openGeneralOnClose?: boolean,
    addTaskOnOpen?: boolean
  ) => void
  openDreamModal: (item?: Dream, openGeneralOnClose?: boolean) => void
  openGeneralModal: () => void
  openTimerSettingsModal: () => void

  closeModal: () => void
  goBack: () => void
}

const useModalStore = create<ModalState>(set => ({
  title: "",
  modalKey: "",
  isOpen: false,
  modalContent: undefined,
  editItem: undefined, // TODO: do I need this?

  addTaskOnOpen: false,
  openGeneralOnClose: false,

  openTaskModal: (item, openGeneralOnClose = false) =>
    set(() => ({
      isOpen: true,
      title: item ? "Edit Task" : "New Task",
      modalKey: item ? "edit_task_modal" : "new_task_modal",
      editItem: item,
      modalContent: <TaskForm />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openGoalModal: (item, openGeneralOnClose = false, addTaskOnOpen = false) =>
    set(() => ({
      isOpen: true,
      title: item ? "Edit Goal" : "New Goal",
      modalKey: item ? "edit_goal_modal" : "new_goal_modal",
      addTaskOnOpen,
      editItem: item,
      modalContent: <GoalForm />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openDreamModal: (item, openGeneralOnClose = false) =>
    set(() => ({
      isOpen: true,
      title: item ? "Edit Dream" : "New Dream",
      modalKey: item ? "edit_dream_modal" : "new_dream_modal",
      editItem: item,
      modalContent: <DreamForm />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openGeneralModal: () =>
    set(() => ({
      isOpen: true,
      title: "Choose type",
      modalKey: "general_modal",
      modalContent: <GeneralForm />,
    })),
  openTimerSettingsModal: () =>
    set(() => ({
      isOpen: true,
      title: "Timer Settings",
      modalKey: "timer_settings_modal",
      modalContent: <TimerSettings />,
    })),

  goBack: () =>
    set(state =>
      state.openGeneralOnClose
        ? {
            isOpen: true,
            title: "Choose type",
            modalKey: "general_modal",
            modalContent: <GeneralForm />,
            openGeneralOnClose: false,
          }
        : {
            modalKey: "",
            isOpen: false,
            title: "",
            modalContent: undefined,
          }
    ),
  closeModal: () =>
    set(() => ({
      modalKey: "",
      isOpen: false,
      title: "",
      modalContent: undefined,
    })),
}))

const useModal = () => ({
  modalTitle: useModalStore(state => state.title),
  modalKey: useModalStore(state => state.modalKey),
  isOpen: useModalStore(state => state.isOpen),
  editItem: useModalStore(state => state.editItem),
  addTaskOnOpen: useModalStore(state => state.addTaskOnOpen),
  modalContent: useModalStore(state => state.modalContent),

  openTaskModal: useModalStore(state => state.openTaskModal),
  openGoalModal: useModalStore(state => state.openGoalModal),
  openDreamModal: useModalStore(state => state.openDreamModal),
  openGeneralModal: useModalStore(state => state.openGeneralModal),
  openTimerSettingsModal: useModalStore(state => state.openTimerSettingsModal),

  closeModal: useModalStore(state => state.closeModal),
  goBack: useModalStore(state => state.goBack),
})

export default useModal
