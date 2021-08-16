import React, { useRef, useEffect, useState } from "react"

import useRevolverAnimation from "./useRevolverAnimation"

interface RevolverProps {
  radius: number
  style?: React.CSSProperties
  children: React.ReactElement[]
}
const Revolver = ({ radius, style, children }: RevolverProps) => {
  const [cylinderMaxWidth, setCylinderMaxWidth] = useState(0)
  const [cylinderMaxHeight, setCylinderMaxHeight] = useState(0)

  const cylinderRefs = useRef<Array<HTMLElement | null>>([])
  const containerWidth = (radius + (cylinderMaxWidth / 2)) * 2
  const containerHeight = (radius + (cylinderMaxHeight / 2)) * 2

  useRevolverAnimation(cylinderRefs, radius, [containerWidth, containerHeight])

  useEffect(() => {
    cylinderRefs.current = cylinderRefs.current.slice(0, children.length)

    cylinderRefs.current.forEach((ref) => {
      if (ref!.offsetWidth > cylinderMaxWidth) {
        setCylinderMaxWidth(ref!.offsetWidth)
      }
      if (ref!.offsetHeight > cylinderMaxHeight) {
        setCylinderMaxHeight(ref!.offsetHeight)
      }
    })
 }, [children, cylinderMaxWidth, cylinderMaxHeight])

  return (
    <div style={{...style}}>
      <div style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, position: "relative" }} >
        {
          React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              ref: (ref: HTMLElement | null) => (cylinderRefs.current[index] = ref)
            })
          )
        }
      </div>
    </div>
  )
}

export default Revolver