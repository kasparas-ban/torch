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
import { passwordFormSchema } from "./schemas"
import { Input } from "@/components/ui/input"

function PasswordChangeForm() {
  const { openPasswordChangeCompleteModal } = useModal()
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    openPasswordChangeCompleteModal()
  }

  return (
    <div className="px-0 pb-2 sm:px-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">Current password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 focus:bg-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 focus:bg-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">Repeat new password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 focus:bg-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
          </div>

          <div className="relative flex justify-center">
            <motion.button
              layout
              className="px-3 py-1 mt-6 text-xl font-medium"
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

export default PasswordChangeForm
