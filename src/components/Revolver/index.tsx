import React, { useRef, useEffect } from "react"

import Cylinder from "./Cylinder"
import useRevolverAnimation from "./useRevolverAnimation"

export interface CylinderData {
  backgroundColor: string
  img: string
  desc: string
}

interface RevolverProps {
  cylinderWidth: number
  cylinderHeight: number
  cylinderData: CylinderData[]
  radius: number
  style?: React.CSSProperties
}
const Revolver = ({ cylinderWidth, cylinderHeight, cylinderData, radius, style }: RevolverProps) => {
  const cylinderRefs = useRef<Array<HTMLDivElement | null>>([])
  const containerWidth = (radius + (cylinderWidth / 2)) * 2
  const containerHeight = (radius + (cylinderHeight / 2)) * 2

  useRevolverAnimation(cylinderRefs, radius, [containerWidth, containerHeight])

  useEffect(() => {
    cylinderRefs.current = cylinderRefs.current.slice(0, cylinderData.length)
 }, [cylinderData])

  return (
    <div style={{...style}}>
      <div style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, position: "relative" }} >
        { 
          cylinderData.map((obj, index) => {
            return <Cylinder
                     key={index}
                     ref={el => cylinderRefs.current[index] = el}
                     backgroundColor={obj.backgroundColor}
                     width={cylinderWidth} height={cylinderHeight}
                   />
          })
        }
      </div>
    </div>
  )
}

export default Revolver