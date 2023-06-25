// function Dropdown() {
//   const dropdownButtonRef = useRef<HTMLDivElement>(null)
//   const dropdownPanelRef = useRef<HTMLDivElement>(null)
//   const [value, setValue] = useState("min")
//   const [showDropdown, setShowDropDown] = useState(false)

//   useEffect(() => {
//     const onClick = (event: Event) => {
//       const clickInside = [dropdownButtonRef, dropdownPanelRef].some(
//         reference_ => reference_.current?.contains(event.target as Node)
//       )
//       if (showDropdown && !clickInside) {
//         return setShowDropDown(false)
//       }
//     }
//     if (!showDropdown) {
//       return document.removeEventListener("click", onClick)
//     }
//     document.addEventListener("click", onClick)
//     return () => document.removeEventListener("click", onClick)
//   }, [dropdownButtonRef, dropdownPanelRef, showDropdown])

//   return (
//     <div className="ml-3 h-full">
//       <div ref={dropdownButtonRef} className="h-full w-20">
//         <button
//           type="button"
//           onClick={() => setShowDropDown(prev => !prev)}
//           className="inline-flex h-full w-full items-center justify-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-lg font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//           id="menu-button"
//         >
//           <div className="flex">
//             <span className="w-10">{value}</span>
//             <span className="flex items-center">
//               <svg
//                 className="relative top-[2px] -mr-1 h-5 w-5 text-gray-400"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </div>
//         </button>
//       </div>
//       {showDropdown && (
//         <div
//           className="absolute right-0 z-50 mt-2 w-20 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//           role="menu"
//           tabIndex={-1}
//           ref={dropdownPanelRef}
//         >
//           <div className="" role="none">
//             <button
//               className="block w-full rounded-t-xl px-4 py-2 text-center text-lg font-bold text-gray-700 hover:bg-gray-200"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-0"
//               onClick={() => {
//                 setValue("min")
//                 setShowDropDown(false)
//               }}
//             >
//               min
//             </button>
//             <button
//               className="block w-full rounded-b-xl px-4 py-2 text-center text-lg font-bold text-gray-700 hover:bg-gray-200"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-1"
//               onClick={() => {
//                 setValue("h")
//                 setShowDropDown(false)
//               }}
//             >
//               h
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

export {}
