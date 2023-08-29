import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import clsx from "clsx"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GenderOption, Profile } from "../../../types"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { accountFormSchema } from "../ModalItemForms/schemas"
import { Input } from "@/components/ui/input"
import SelectField from "@/components/Inputs/SelectField"
import { getAllCountries } from "@/helpers"

const genderOptions: GenderOption[] = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
]

const countryOptions = getAllCountries()

const profileData: Profile = {
  username: "kaspis245",
  email: "kasparas@gmail.com",
  birthday: new Date("1997-02-04"),
  gender: { label: "Male", value: "MALE" },
  joinedSince: new Date(),
  country: { label: "Lithuania", value: "LT" },
}

function AccountDetailsForm() {
  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: profileData,
  })

  const onSubmit = (data: z.infer<typeof accountFormSchema>) => {
    console.log("onSubmit", data)
  }

  return (
    <div className="px-0 pb-2 sm:px-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Username</FormLabel>
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

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Birthday</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={clsx(
                        "bg-gray-200 placeholder:text-red-200 focus:bg-white",
                        field.value ? "text-gray-800" : "text-gray-400",
                      )}
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      onFocus={e => e.target.showPicker()}
                      onClick={e => (e.target as HTMLInputElement).showPicker()}
                      value={
                        field.value
                          ? new Date(field.value)?.toLocaleDateString("en-CA")
                          : ""
                      }
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">Gender</FormLabel>
                    <FormControl>
                      <SelectField
                        name="gender"
                        value={field.value}
                        onChange={field.onChange}
                        options={genderOptions}
                        isClearable
                        menuPosition="fixed"
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">
                      Country
                    </FormLabel>
                    <FormControl>
                      <SelectField
                        name="location.country"
                        value={field.value}
                        onChange={field.onChange}
                        options={countryOptions}
                        isClearable
                        menuPosition="fixed"
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>

          <div className="relative flex justify-center">
            <motion.button
              layout
              className="mt-8 px-3 py-1 text-xl font-medium"
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

export default AccountDetailsForm
