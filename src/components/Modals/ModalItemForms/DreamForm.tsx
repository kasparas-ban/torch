import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Dream } from "@/types"
import useModal from "../useModal"
import { pruneObject } from "@/helpers"
import { useAddNewItem } from "@/API/itemAPI"
import { dreamFormSchema, DreamFormType } from "../schemas"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import PriorityInput from "../../Inputs/PriorityInput"
import { ButtonSubmit } from "@/components/ui/button"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"

type InputType = keyof DreamFormType

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

const getInitialDreamForm = (initialDream: Dream): DreamFormType => ({
  title: initialDream?.title || "",
  ...(initialDream?.priority && { priority: initialDream?.priority }),
  ...(initialDream?.targetDate && { targetDate: initialDream?.targetDate }),
})

function DreamForm() {
  const { toast } = useToast()
  const { editItem, closeModal } = useModal()
  const { mutateAsync, reset, isLoading, isError, isSuccess } = useAddNewItem()
  const defaultDream = getInitialDreamForm(editItem as Dream)

  const defaultInputOrder = Object.keys(defaultDream).filter(
    key => !!defaultDream[key as InputType],
  ) as InputType[]
  const [inputOrder, setInputOrder] = useState(defaultInputOrder)

  const form = useForm<DreamFormType>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: defaultDream,
    shouldUnregister: true,
  })

  const onSubmit = (data: DreamFormType) => {
    const newDream = {
      ...pruneObject(data),
      type: "DREAM" as const,
    }
    mutateAsync(newDream)
      .then(() => {
        setTimeout(() => {
          closeModal()
        }, 2000)
      })
      .catch(() => {
        setTimeout(
          () =>
            toast({
              title: "Failed to save",
              description:
                "Your dream has not been saved. Please try adding it again later.",
            }),
          100,
        )
        setTimeout(() => reset(), 2000)
      })
  }

  return (
    <div className="grow px-0 pb-2 sm:px-10">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div layout className="relative">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-3 tracking-wide">
                        Dream title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Aa..."
                          className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {inputOrder.map(input => {
                if (input === "priority")
                  return (
                    <motion.div
                      layout
                      key="dream_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="pl-3 tracking-wide">
                              Priority
                            </FormLabel>
                            <FormControl>
                              <PriorityInput
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )

                if (input === "targetDate")
                  return (
                    <motion.div
                      layout
                      key="dream_target_date"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="targetDate"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Target date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className={clsx(
                                    "bg-gray-200 placeholder:text-red-200 focus:bg-white",
                                    field.value
                                      ? "text-gray-800"
                                      : "text-gray-400",
                                  )}
                                  type="date"
                                  min={new Date().toLocaleDateString("en-CA")}
                                  onFocus={e => e.target.showPicker()}
                                  onClick={e =>
                                    (e.target as HTMLInputElement).showPicker()
                                  }
                                  value={field.value || ""}
                                  onChange={e => field.onChange(e.target.value)}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
              })}
            </AnimatePresence>
          </div>

          <AddDreamSections
            inputOrder={inputOrder}
            setInputOrder={setInputOrder}
          />

          <div className="relative mt-auto flex justify-center">
            <ButtonSubmit
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

function AddDreamSections({
  inputOrder,
  setInputOrder,
}: {
  inputOrder: InputType[]
  setInputOrder: React.Dispatch<React.SetStateAction<InputType[]>>
}) {
  const addInput = (input: InputType) => setInputOrder(prev => [...prev, input])
  const removeInput = (input: InputType) =>
    setInputOrder(prev => prev.filter(inp => inp !== input))

  const getInput = (input: InputType) => inputOrder.find(inp => inp === input)

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("priority") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
        onClick={e => {
          e.preventDefault()
          getInput("priority") ? removeInput("priority") : addInput("priority")
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {getInput("priority") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("targetDate") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
        onClick={e => {
          e.preventDefault()
          getInput("targetDate")
            ? removeInput("targetDate")
            : addInput("targetDate")
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {getInput("targetDate") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default DreamForm
