import { Fragment, forwardRef, useRef } from "react"
import {
  useTimeFieldState,
  TimeFieldState,
  DateSegment as DateSegmentType,
} from "@react-stately/datepicker"
import {
  useTimeField,
  AriaTimeFieldProps,
  TimeValue,
  useDateSegment,
} from "@react-aria/datepicker"
import { useLocale } from "@react-aria/i18n"

import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import { ReactComponent as MinusIcon } from "../../assets/minus.svg"

export const TimeField = forwardRef<HTMLElement, AriaTimeFieldProps<TimeValue>>(
  (props, ref) => {
    let { locale } = useLocale()
    let state = useTimeFieldState({
      ...props,
      locale,
    })

    let fieldRef = useRef(null)
    let { fieldProps } = useTimeField(props, state, fieldRef)

    return (
      <div
        {...fieldProps}
        ref={fieldRef}
        className="flex bg-gray-200 rounded-2xl focus-within:bg-white transition-colors focus-within:ring-2 focus-within:ring-ring pr-8 py-2 px-4"
      >
        {state.segments.map((segment, i) => (
          <Fragment key={i}>
            {i !== 1 && <DateSegment key={i} segment={segment} state={state} />}
            {i === 0 && <span className="px-1 text-gray-400">h</span>}
            {i === 2 && <span className="px-1 text-gray-400">min</span>}
          </Fragment>
        ))}
      </div>
    )
  },
)

function DateSegment({
  segment,
  state,
}: {
  segment: DateSegmentType
  state: TimeFieldState
}) {
  let ref = useRef(null)
  let { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        ...(segment.maxValue != null && {
          minWidth: String(segment.maxValue).length + "ch",
        }),
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-gray-500 focus:text-white group ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          // @ts-ignore
          visibility: segment.isPlaceholder ? "" : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  )
}

export default function DurationInput({
  duration,
  setDuration,
}: {
  duration?: { hours?: number | null; minutes?: number | null }
  setDuration: (hours: string, minutes: string) => void
}) {
  return (
    <div className="w-full">
      <label
        htmlFor="duration_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Duration
      </label>
      <TimerInput duration={duration} setDuration={setDuration} />
    </div>
  )
}

function TimerInput({
  duration,
  setDuration,
}: {
  duration?: { hours?: number | null; minutes?: number | null }
  setDuration: (hours: string, minutes: string) => void
}) {
  return (
    <div className="w-42">
      <div className="relative mt-1 flex w-full flex-row gap-3 bg-transparent max-[420px]:flex-wrap max-[420px]:gap-2">
        <div className="flex h-9 flex-grow flex-row max-[420px]:basis-full">
          <button
            data-action="decrement"
            className="h-full cursor-pointer rounded-l-xl bg-gray-400 px-2.5 text-gray-200 outline-none drop-shadow-sm hover:bg-gray-400 hover:text-gray-100"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours && duration.hours > 0
                  ? (Number(duration.hours) - 1).toString()
                  : "0",
                duration?.minutes?.toString() ?? "",
              )
            }}
          >
            <span className="m-auto flex justify-center text-2xl font-thin">
              <MinusIcon className="h-6 w-6 stroke-[2.5]" />
            </span>
          </button>
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-200 text-center text-2xl font-semibold text-gray-700  shadow-inner outline-none hover:text-black focus:text-black  focus:outline-none"
            name="timer"
            min={0}
            max={99}
            value={duration?.hours ?? 0}
            onChange={e =>
              setDuration(e.target.value, duration?.minutes?.toString() ?? "")
            }
          ></input>
          <button
            data-action="increment"
            className="h-full cursor-pointer rounded-r-xl bg-gray-400 px-2 text-gray-200 drop-shadow-sm hover:bg-gray-400 hover:text-gray-100"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours ? (Number(duration.hours) + 1).toString() : "1",
                duration?.minutes?.toString() ?? "",
              )
            }}
          >
            <span className="m-auto flex justify-center px-0.5 text-2xl font-thin">
              <PlusIcon className="h-6 w-6 stroke-[2.5]" />
            </span>
          </button>
          <span className="my-auto ml-2.5 flex h-full items-center text-lg font-medium text-gray-500 max-[420px]:basis-4/12">
            h
          </span>
        </div>
        <div className="flex h-9 flex-grow flex-row">
          <button
            data-action="decrement"
            className="h-full cursor-pointer rounded-l-xl bg-gray-400 px-1 text-gray-200 drop-shadow-sm hover:bg-gray-400 hover:text-gray-100"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours?.toString() ?? "",
                duration?.minutes && duration.minutes > 0
                  ? Math.max(Number(duration.minutes) - 5, 0).toString()
                  : "0",
              )
            }}
          >
            <span className="m-auto flex items-center justify-center px-2 text-xl font-semibold">
              -5
            </span>
          </button>
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-200 text-center text-2xl font-semibold text-gray-700  shadow-inner outline-none hover:text-black focus:text-black  focus:outline-none"
            name="timer"
            min={0}
            max={99}
            value={duration?.minutes ?? 0}
            onChange={e =>
              setDuration(duration?.hours?.toString() ?? "", e.target.value)
            }
          ></input>
          <button
            data-action="increment"
            className="h-full cursor-pointer rounded-r-xl bg-gray-400 px-2 text-gray-200 drop-shadow-sm hover:bg-gray-400 hover:text-gray-100"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours?.toString() ?? "",
                !isNaN(Number(duration?.minutes))
                  ? Math.min(Number(duration?.minutes) + 5, 60).toString()
                  : "0",
              )
            }}
          >
            <span className="m-auto flex items-center justify-center pr-1 text-xl font-semibold">
              +5
            </span>
          </button>
          <span className="my-auto ml-2.5 flex h-full items-center text-lg font-medium text-gray-500 max-[420px]:basis-4/12">
            min
          </span>
        </div>
      </div>
    </div>
  )
}
