import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useModal from "../useModal"
import { emailFormSchema } from "../schemas"
import { Input } from "@/components/ui/input"

const defaultEmail = "kasparas@gmail.com"

function EmailChangeForm() {
  const { openEmailChangeCompleteModal } = useModal()
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: defaultEmail },
  })

  const onSubmit = (data: z.infer<typeof emailFormSchema>) => {
    openEmailChangeCompleteModal()
  }

  return (
    <div className="mt-4 h-full px-0 pb-2 sm:mt-0 sm:px-10">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-3">
                  Enter your new email address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@host.com"
                    className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />

          <div className="relative mt-auto flex justify-center">
            <motion.button
              layout
              className="mt-6 px-3 py-1 text-xl font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EmailChangeForm
