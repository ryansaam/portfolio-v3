import React, { useEffect, useRef } from "react"

const useRevolverAnimation = (
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  radius: number, containerDimensions: number[]
) => {
  const animationId = useRef<number>(0)

  const cylinderXYPos = (deg: number, radius: number) => {
    let radians = 0
    let temp = deg
    if (temp > 180) {
      temp -= 180
      radians = Math.PI
    }
    radians += (temp / 180) * Math.PI

    const dX = Math.cos(radians)
    const dY = Math.sin(radians)

    return [dX * radius, dY * radius]
  }

  function animation() {
    const cylinderWidth = refs.current[0]!.offsetWidth
    const cylinderHeight = refs.current[0]!.offsetHeight
    let degOffsetsFromZero:number[] = []
    const multiplyer = 360 / refs.current.length
    refs.current.forEach((el, index) => {
      const deg = index * multiplyer
      degOffsetsFromZero.push(deg)
      el!.style.transform = `
        translateX(${cylinderXYPos(deg, radius)[0] - cylinderWidth/2 + (containerDimensions[0]/2)}px)
        translateY(${cylinderXYPos(deg, radius)[1] - cylinderHeight/2 + (containerDimensions[1]/2)}px)
      `
      el!.style.zIndex = refs.current.length - index+""
    })

    const thing = () => {
      refs.current.forEach((el, index) => {
        let offset = degOffsetsFromZero[index]
        offset = offset === 359 ? 0 : offset + 1
        degOffsetsFromZero[index] = offset
        el!.style.transform = `
          translateX(${cylinderXYPos(offset, radius)[0] - cylinderWidth/2 + (containerDimensions[0]/2)}px)
          translateY(${cylinderXYPos(offset, radius)[1] - cylinderHeight/2 + (containerDimensions[1]/2)}px)
        `
      })

      animationId.current = window.requestAnimationFrame(thing)
    }
    
    animationId.current = window.requestAnimationFrame(thing)
  }


  useEffect(() => {
    animation()
    return () => {
      window.cancelAnimationFrame(animationId.current)
    }
  }, [animation])
}

export default useRevolverAnimation