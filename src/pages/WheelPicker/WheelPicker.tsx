import React, { useEffect, useMemo, useRef } from "react"
import "./styles.css"

const WheelPickerComponent = ({
  items,
  value,
  onChange: handleChange,
  containerHeight = 210,
  itemHeight = 32,
}: {
  items: {
    value: string
    label: string
  }[]
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  containerHeight: number
  itemHeight: number
}) => {
  const itemsContainerRef = useRef<HTMLUListElement>(null)
  const isScrolling = useRef<any>(false)
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const itemsMap = useMemo(
    () =>
      items.reduce((map, item, index) => map.set(item.value, index), new Map()),
    [items]
  )
  const currentValue = useRef(itemsMap.get(value) ?? 0)

  const visibleItemsCount = Math.floor(containerHeight / itemHeight)

  const offset = Math.round((visibleItemsCount + 1) / 2) + 1
  const maxScrollOffset = (containerHeight - itemHeight) / 2

  function rerenderElements(
    selectedElement: number,
    scrollTop: number | undefined,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, items.length)
  ) {
    itemRefs.current
      ?.slice(firstItemIndex, lastItemIndex)
      .forEach((item, index) => {
        const realIndex = index + firstItemIndex
        const scrollOffset = scrollTop
          ? Math.min(
              Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
              maxScrollOffset
            )
          : 0
        const sin = scrollOffset / maxScrollOffset
        const cos = Math.sqrt(1 - sin ** 2)

        const [div] = (item as any).getElementsByTagName("div")
        div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`
      })
  }

  useEffect(() => {
    let isAnimating = false

    function handleScroll(event: any) {
      if (!isAnimating) {
        isAnimating = true

        requestAnimationFrame(() => {
          const scrollTop = Math.max(event.target.scrollTop, 0)
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            items.length - 1
          )
          window.clearTimeout(isScrolling.current)
          rerenderElements(selectedElement, scrollTop)

          currentValue.current = selectedElement
          isScrolling.current = setTimeout(function () {
            handleChange(items[selectedElement].value)
          }, 20)

          isAnimating = false
        })
      }
    }

    itemsContainerRef.current?.addEventListener("scroll", handleScroll)

    itemRefs.current[currentValue.current]?.scrollIntoView({ block: "center" })
    rerenderElements(
      currentValue.current,
      itemsContainerRef.current?.scrollTop,
      0,
      items.length
    )

    return () => {
      itemsContainerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [itemsContainerRef.current])

  useEffect(() => {
    const index = itemsMap.get(value)

    if (index !== currentValue.current) {
      currentValue.current = index

      itemRefs.current[index]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      })
      rerenderElements(
        currentValue.current,
        itemsContainerRef.current?.scrollTop,
        0,
        items.length
      )
    }
  }, [value])

  return (
    <div
      className="container"
      style={{
        height: `${containerHeight}px`,
        width: `${containerHeight}px`,
      }}
    >
      <ul className="items" ref={itemsContainerRef}>
        {items.map((item, index) => (
          <li
            className="item"
            key={item.value}
            ref={node => (itemRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const WheelPicker = React.memo(WheelPickerComponent)
