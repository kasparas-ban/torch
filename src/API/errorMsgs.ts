type CustomErrorData = { title: string; description: string } | undefined | null

export class CustomError extends Error {
  data: CustomErrorData
  constructor(message?: string, data?: CustomErrorData) {
    super(message)
    this.data = data
  }
}

export const ItemLoadServerErrorMsg = {
  title: "Server error",
  description: "Failed to download your tasks. Try again later.",
}

export const ItemLoadFetchErrorMsg = {
  title: "Connection problems",
  description: "Failed to download you tasks. Using local storage instead.",
}

export const ItemLoadNotSignedInErrorMsg = {
  title: "User not signed in.",
  description: "Using local storage instead.",
}

export const PostFetchErrorMsg = {
  title: "Failed to save data online",
  description: "Saving to local storage instead.",
}
