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

const DurationField = forwardRef<HTMLElement, AriaTimeFieldProps<TimeValue>>(
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
        className="focus-within:ring-ring flex rounded-2xl bg-gray-200 px-4 py-2 pr-8 transition-colors focus-within:bg-white focus-within:ring-2"
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
      className={`group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-gray-500 focus:text-white ${
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

export default DurationField
