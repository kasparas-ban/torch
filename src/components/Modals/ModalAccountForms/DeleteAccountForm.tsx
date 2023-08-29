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
import { deleteAccountFormSchema } from "../ModalItemForms/schemas"
import { Input } from "@/components/ui/input"

function DeleteAccountForm() {
  const { openAccountDeleteModal } = useModal()
  const form = useForm<z.infer<typeof deleteAccountFormSchema>>({
    resolver: zodResolver(deleteAccountFormSchema),
  })

  const onSubmit = (data: z.infer<typeof deleteAccountFormSchema>) => {
    openAccountDeleteModal()
  }

  return (
    <motion.div layout className="px-0 pb-2 sm:px-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <p className="mb-2 text-center">
            Are you sure you want to delete your account and all the data
            related to it?
          </p>
          <p className="mb-4 text-center">
            Enter your password to confirm the deletion.
          </p>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-3">Password</FormLabel>
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

          <p className="mt-4 text-center font-bold">
            This step is irreversible!
          </p>

          <div className="relative flex justify-center">
            <motion.button
              layout
              className="mt-3 rounded-xl bg-red-400 px-8 py-1 text-xl font-medium text-gray-100 transition-colors hover:bg-red-700"
              whileTap={{ scale: 0.95 }}
            >
              Delete account
            </motion.button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

export default DeleteAccountForm
