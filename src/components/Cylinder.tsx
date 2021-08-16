import React from "react"

export interface CylinderData {
  backgroundColor: string
  img: string
  desc: string
}

interface CylinderProps {
  backgroundColor: string
  width: number
  height: number
}
const Cylinder = React.forwardRef<HTMLDivElement, CylinderProps>(({ backgroundColor, width, height }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        backgroundColor,
        opacity: 0.6,
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        display: "grid",
        justifyItems: "center",
        alignItems: "center"
      }}
    >
      <div style={{backgroundColor: "black", width: "21px", height: "21px", borderRadius: "50%"}}></div>
    </div>
  )
})

export default Cylinder