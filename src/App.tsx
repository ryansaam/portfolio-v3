import React, { useEffect, useRef, useState, useImperativeHandle, useCallback } from 'react';
import { Controller, Scene } from "react-scrollmagic"
import { use100vh } from "react-div-100vh"
import { PlayState, Timeline, Tween } from "react-gsap"
import './App.css';

import Revolver from "./components/Revolver/"
import ProjectCard, { projectData } from "./components/ProjectCard"

import dnaVid from "./assets/dna_vid.mp4"

interface BrandBarSpanProps {
  children: React.ReactNode,
  fontSize?: string,
  fontWeight?: number
}
const BrandBarSpan = ({ children, fontSize, fontWeight }: BrandBarSpanProps) => {
  return (
    <span
      style={{
        color: "black",
        fontSize: fontSize ? fontSize : "18px",
        fontWeight: fontWeight ? fontWeight : 600,
        letterSpacing: "5px",
        whiteSpace: "nowrap",
        display: "inline-block"
      }}
    >
      {children}
    </span>
  )
}

const BrandBar = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "40px",
        width: "100vh",
        textAlign: "center",
        position: "fixed",
        zIndex: 10,
        top: "0px",
        left: "100vw",
        transformOrigin: "top left",
        transform: "rotate(90deg)",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gap: "19px"
        }}
      >
        <BrandBarSpan fontWeight={200} >Software Engineer</BrandBarSpan>
        <BrandBarSpan>●</BrandBarSpan>
        <BrandBarSpan>Ryan Sam</BrandBarSpan>
        <BrandBarSpan>●</BrandBarSpan>
        <BrandBarSpan fontWeight={200}>{new Date().getFullYear()}</BrandBarSpan>
      </div>     
    </div>

  )
}

function App() {

  const [scrollOffset, setScrollOffset] = useState(0)
  const windowHeight = use100vh()

  useEffect(() => {
    setScrollOffset(window.innerWidth)
  },[])

  return (
    <div className="App">
      <div style={{width: "calc(100vw - 40px)", height: "100%"}}>
        <Controller>
          <Scene
            duration={windowHeight ? windowHeight*2 : scrollOffset*2}
            pin
            offset={windowHeight ? windowHeight/2 : scrollOffset/2}
          >
          {
            (progress: number) => (
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                <Timeline
                  duration={2}
                  progress={progress}
                  playState={PlayState.pause}
                  target={<TargetWithNames progress={progress} duration={2} />}
                >
                  <Tween to={{ background: "radial-gradient(circle at center bottom, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 300%)" }} target="div1" position="0%" />
                </Timeline>
              </div>
            )
          }
          </Scene>
        </Controller>
      </div>
      <BrandBar />
    </div>
  )
}

interface TargetWithNamesProps {
  progress: number
  duration: number
}
const TargetWithNames = React.forwardRef<React.ReactNode, TargetWithNamesProps>(({ progress, duration }, ref) => {
  const div1 = useRef(null)
  const spiralVideoRef = useRef<HTMLVideoElement>(null)
  const aloomThumbnailRef = useRef<HTMLVideoElement>(null)
  const litphumThumbnailRef = useRef<HTMLVideoElement>(null)
  const minilatheThumbnailRef = useRef<HTMLVideoElement>(null)
  const revolverRef = useRef<HTMLDivElement>(null)

  const [scrollOffset, setScrollOffset] = useState(0)
  const [revolverProgress, setRevolverProgress] = useState(1)

  const windowHeight = use100vh()

  const refLookUp = [
    aloomThumbnailRef,
    undefined,
    undefined,
    litphumThumbnailRef,
    minilatheThumbnailRef,
    undefined,
  ]
  
  useImperativeHandle(ref, () => ({
    div1,
    spiralVideoRef,
    revolverRef
  }))
  
  const playVideo = useCallback(() => {
    if (progress * duration > 0.14) {
      spiralVideoRef.current!.play()
    } else {
      spiralVideoRef.current!.pause()
    }
  }, [progress, duration])

  const playThumbnail = useCallback(() => {
    const circleOffsets = 360 / projectData.length
    const displacementFromZeroDeg = 360 - ((1 - progress) / 0.70 * 360)

    // posistions on circle in degress
    const aloomOffset = circleOffsets * 0 - displacementFromZeroDeg
    const litphumOffset = circleOffsets * 3 - displacementFromZeroDeg
    const minilatheOffset = circleOffsets * 4 - displacementFromZeroDeg

    const videoPlayRange = 20 // from 0deg to 20deg

    if (progress > 0.30) {
      if (
        Math.abs(aloomOffset) <= videoPlayRange
        || 360 - Math.abs(aloomOffset) <= videoPlayRange
      ) {
        aloomThumbnailRef.current!.play()
        .catch((err) => { console.log(err) })
      } else {
        aloomThumbnailRef.current!.pause()
      }

      if (Math.abs(litphumOffset) <= videoPlayRange) {
        litphumThumbnailRef.current!.play()
        .catch((err) => { console.log(err) })
      } else {
        litphumThumbnailRef.current!.pause()
      }

      if (Math.abs(minilatheOffset) <= videoPlayRange) {
        minilatheThumbnailRef.current!.play()
        .catch((err) => { console.log(err) })
      } else {
        minilatheThumbnailRef.current!.pause()
      }
    }
  }, [progress])

  const spinRevolver = useCallback(() => {
    // 0.70 is from end position (1) minus start position (0.30) (1 - 0.30 = 0.70)
    const calcProgress = (1 - progress) / 0.70
    if (progress > 0.30) {
      setRevolverProgress(calcProgress)
    }
  }, [progress])

  useEffect(() => {
    setScrollOffset(window.innerHeight)
    spiralVideoRef.current!.playbackRate = 0.6
    spiralVideoRef.current!.pause()
    playVideo()
    spinRevolver()
    playThumbnail()
  },[playVideo, spinRevolver, playThumbnail])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "400vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translateY(-150vh)"
        }}
      >
        <div
          ref={div1}
          style={{
            background: `radial-gradient(circle at center bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)`,
            width: "400vh",
            height: "400vh",
          }}
        >
          
        </div>
      </div>
      <div
          style={{
            // backgroundImage: "url(https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: `${windowHeight ? windowHeight : scrollOffset}px`,
            overflow: "hidden"
          }}
        >
        <video
          ref={spiralVideoRef}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -2
          }}
          playsInline
          muted
          loop
        >
          <source src={dnaVid} type="video/mp4" />
        </video>
        <Revolver
          ref={revolverRef}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            transform: "translateX(-60%)",
            zIndex: -1
          }}
          cycle={revolverProgress}
          radius={324}
        >
        {
          projectData.map((obj, index) => {
            return  <ProjectCard
                      key={index}
                      data={obj}
                      onClick={() => {}}
                    >
                      <video
                        ref={refLookUp[index]}
                        style={{
                          background: "linear-gradient(180deg, rgba(50,235,209,1) 0%, rgba(220,66,226,1) 100%)",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                        poster={obj.poster}
                        muted
                        loop
                        // playsInline
                      >
                        <source src={obj.media} type="video/mp4" />
                      </video>
                    </ProjectCard>
          })
        }
        </Revolver>
      </div>
    </div>
  );
});


{/* <Scene
duration={2000}
pin
indicators
offset={windowHeight ? windowHeight/2 : scrollOffset/2}
>
<div style={{
  backgroundImage: "url(https://images.pexels.com/photos/3612932/pexels-photo-3612932.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
  width: "100%",
  height: "100vh"
}}>
  <h1 style={{}}>EXPLORE My Cool Text 2109</h1>
</div>
</Scene> */}

{/* <div
style={{
  width: "100%",
  height: "300vh",
}}        
>
<div
  style={{
    backgroundColor: "magenta",
    width: "100%",
    height: "100vh",
    position: "sticky",
    top: "0px",
    //transform: "translateY(-200vh)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <h1 style={{}}>EXPLORE My Cool Text 2109</h1>
</div>

<div
  style={{
    
  }}
>
  <div
    style={{
      background: `radial-gradient(circle ${scrollOffset}px at center bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 71%)`,
      width: "calc(100% - 40px)",
      height: "200vh",
      position: "relative",
      zIndex: 5,
      transform: "translateY(-100vh)"
      // position: "sticky",
      // top: "0px",
    }}
  >

  </div>
</div>
</div> */}


// export const Thing = () => {
//   const revolverRef = useRef<HTMLDivElement>(null)
//   const spiralVideoRef = useRef<HTMLVideoElement>(null)
  
//   const [scrollOffset, setScrollOffset] = useState(0)
//   const windowHeight = use100vh()

//   useEffect(() => {
//     setScrollOffset(window.innerHeight)
//     spiralVideoRef.current!.playbackRate = 0.6
//   },[])

//   return (
//     <Scene
//       duration={2000}
//       pin
//       offset={windowHeight ? windowHeight/2 : scrollOffset/2}
//     >
//     {
//       (progress: number) => (
//         <div
//           style={{
//             // backgroundImage: "url(https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             width: "100%",
//             height: `${windowHeight ? windowHeight : scrollOffset}px`,
//             overflow: "hidden"
//           }}
//         >
//           <video
//             ref={spiralVideoRef}
//             style={{
//               objectFit: "cover",
//               width: "100%",
//               height: "100%",
//               position: "absolute",
//               top: 0,
//               left: 0
//             }}
//             playsInline
//             autoPlay
//             muted
//             loop
//           >
//             <source src={spiralVid} type="video/mp4" />
//           </video>
//           <div
//             style={{
//               width: "100%",
//               height: `${windowHeight ? windowHeight*2 : scrollOffset*2}px`,
//               transform: `translateY(-${windowHeight ? windowHeight/2 : scrollOffset/2}px)`,
//               display: "flex",
//               alignItems: "center"
//             }}
//           >
//             <Revolver
//               ref={revolverRef}
//               style={{
//                 transform: "translateX(-60%)"
//               }}
//               cycle={progress}
//               radius={324}
//             >
//             {
//               projectData.map((obj, index) => {
//                 return <ProjectCard
//                           key={index}
//                           data={obj}
//                           onClick={() => {}}
//                         />
//               })
//             }
//             </Revolver>
//           </div>
//         </div>
//       )
//     }
//     </Scene>
//   )
// }

// https://images.pexels.com/photos/158571/architecture-about-building-modern-158571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
// https://images.pexels.com/photos/3612932/pexels-photo-3612932.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
// https://images.pexels.com/photos/3779814/pexels-photo-3779814.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260

export default App;
