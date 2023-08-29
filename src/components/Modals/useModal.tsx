import React from "react"
import { create } from "zustand"
import { Dream, GeneralItem, Goal, Task } from "../../types"
import GeneralForm from "./ModalForms/GeneralForm"
import TaskForm from "./ModalForms/TaskForm"
import GoalForm from "./ModalForms/GoalForm"
import DreamForm from "./ModalForms/DreamForm"
import TimerSettings from "../Timer/TimerSettings"
import EmailChangeForm from "./ModalForms/EmailChangeForm"
import AccountDetailsForm from "./ModalForms/AccountDetailsForm"
import PasswordChangeForm from "./ModalForms/PasswordChangeForm"
import EmailChangeComplete from "./ModalForms/EmailChangeComplete"
import PasswordChangeComplete from "./ModalForms/PasswordChangeComplete"

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
    addTaskOnOpen?: boolean,
  ) => void
  openDreamModal: (item?: Dream, openGeneralOnClose?: boolean) => void
  openGeneralModal: () => void
  openTimerSettingsModal: () => void

  openAccountInfoModal: () => void
  openEmailChangeModal: () => void
  openEmailChangeCompleteModal: () => void
  openPasswordChangeModal: () => void
  openPasswordChangeCompleteModal: () => void

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

  openAccountInfoModal: () =>
    set(() => ({
      isOpen: true,
      title: "Edit Account",
      modalKey: "edit_account_modal",
      modalContent: <AccountDetailsForm />,
    })),
  openEmailChangeModal: () =>
    set(() => ({
      isOpen: true,
      title: "Change email",
      modalKey: "change_email_modal",
      modalContent: <EmailChangeForm />,
    })),
  openEmailChangeCompleteModal: () =>
    set(() => ({
      isOpen: true,
      title: "Confirm change",
      modalKey: "confirm_email_change_modal",
      modalContent: <EmailChangeComplete />,
    })),
  openPasswordChangeModal: () =>
    set(() => ({
      isOpen: true,
      title: "Change password",
      modalKey: "change_password_modal",
      modalContent: <PasswordChangeForm />,
    })),
  openPasswordChangeCompleteModal: () =>
    set(() => ({
      isOpen: true,
      title: "Confirm change",
      modalKey: "confirm_password_change_modal",
      modalContent: <PasswordChangeComplete />,
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
          },
    ),
  closeModal: () =>
    set(() => ({
      modalKey: "",
      isOpen: false,
      // title: "",
      // modalContent: undefined,
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

  openAccountInfoModal: useModalStore(state => state.openAccountInfoModal),
  openEmailChangeModal: useModalStore(state => state.openEmailChangeModal),
  openEmailChangeCompleteModal: useModalStore(
    state => state.openEmailChangeCompleteModal,
  ),
  openPasswordChangeModal: useModalStore(
    state => state.openPasswordChangeModal,
  ),
  openPasswordChangeCompleteModal: useModalStore(
    state => state.openPasswordChangeCompleteModal,
  ),

  closeModal: useModalStore(state => state.closeModal),
  goBack: useModalStore(state => state.goBack),
  showBackButton: useModalStore(state => state.openGeneralOnClose),
})

export default useModal
