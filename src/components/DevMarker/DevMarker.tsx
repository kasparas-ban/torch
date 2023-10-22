export default function DevMarker() {
  const isDev =
    import.meta.env.MODE === "development" || import.meta.env.VITE_DEV_VERCEL

  console.log("Is dev: ", isDev, import.meta.env.VITE_DEV_VERCEL)

  return isDev ? (
    <div className="absolute right-2 top-2 rounded-md bg-rose-600 px-3 py-1 font-bold tracking-widest text-white sm:bottom-4 sm:right-4 sm:top-auto">
      DEV
    </div>
  ) : null
}
