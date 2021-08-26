import React, { useEffect, useRef, useCallback } from "react"

const useRevolverAnimation = (
  refs: React.MutableRefObject<(HTMLElement | null)[]>,
  radius: number, containerDimensions: number[],
  cycle?: number
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

  const animation = useCallback(() => {
    let degOffsetsFromZero:number[] = []
    const multiplyer = 360 / refs.current.length

    
    
    refs.current.forEach((el, index) => {
      const deg = index * multiplyer
      degOffsetsFromZero.push(deg)

      if (cycle)
        if (degOffsetsFromZero[index] + (360*cycle) >= 360) {
          degOffsetsFromZero[index] = (degOffsetsFromZero[index] + 360*cycle) - 360
        } else {
          degOffsetsFromZero[index] += 360*cycle
        }
      
      el!.style.transform = `
        translateX(${cylinderXYPos(degOffsetsFromZero[index], radius)[0] - refs.current[index]!.offsetWidth/2 + (containerDimensions[0]/2)}px)
        translateY(${cylinderXYPos(degOffsetsFromZero[index], radius)[1] - refs.current[index]!.offsetHeight/2 + (containerDimensions[1]/2)}px)
      `
      el!.style.zIndex = refs.current.length - index+""
      el!.style.margin = "0px"
      el!.style.position = "absolute"
      el!.style.boxSizing = "border-box"
    })

    const thing = () => {
      if (cycle === undefined) {
        refs.current.forEach((el, index) => {
          let offset = degOffsetsFromZero[index]
          offset = offset === 359 ? 0 : offset + 1
          degOffsetsFromZero[index] = offset
          el!.style.transform = `
            translateX(${cylinderXYPos(offset, radius)[0] - refs.current[index]!.offsetWidth/2 + (containerDimensions[0]/2)}px)
            translateY(${cylinderXYPos(offset, radius)[1] - refs.current[index]!.offsetHeight/2 + (containerDimensions[1]/2)}px)
          `
        })

        animationId.current = window.requestAnimationFrame(thing)
      }
    }
    
    animationId.current = window.requestAnimationFrame(thing)
  }, [containerDimensions, radius, refs, cycle])

  useEffect(() => {
    animation()
    return () => {
      window.cancelAnimationFrame(animationId.current)
    }
  }, [animation])
}

export default useRevolverAnimation