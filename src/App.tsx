import React from 'react';
import './App.css';

import Revolver from "./components/Revolver/"

import aloomThumbnail from "./assets/aloom_thumbnail.mp4"
import calendarWidget from "./assets/calendar_widget.jpeg"
import minilatheThumbnail from "./assets/minilathe_thumbnail.mp4"
import litphumThumbnail from "./assets/litphum_thumbnail.mp4"
import atomarThumbnail from "./assets/atomar_thumbnail.jpeg"
import bbookThumbnail from "./assets/bbook_thumbnail.png"

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
  const data: ProjectData[] = [
    {
      media: aloomThumbnail,
      name: "aloom"
    },
    {
      media: bbookThumbnail,
      name: "BBOOK"
    },
    {
      media: atomarThumbnail,
      name: "Atomar"
    },
    {
      media: litphumThumbnail,
      name: "litphum"
    },
    {
      media: minilatheThumbnail,
      name: "MINI-LATHE"
    },
    {
      media: calendarWidget,
      name: "Calendar Widgets"
    }
  ]

  return (
    <div className="App">
      <h1>EXPLORE My Cool Text 2109</h1>
      <BrandBar />
      <div style={{position: "relative"}}>
        <Revolver
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            transform: "translateX(-60%)"
          }}
          radius={244}
        >
          {
            data.map((obj, index) => {
              return <ProjectCard
                        key={index}
                        data={obj}
                        onClick={() => {}}
                      />
            })
          }
        </Revolver>
      </div>
    </div>
  );
}


interface ProjectData {
  media: string
  name: string
}
interface ProjectProps {
  data: ProjectData
  onClick: () => void
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectProps>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        background: "radial-gradient(circle at top right, rgba(218,218,218,0.2) 0%, rgba(0,0,0,0) 100%)",
        width: "300px",
        height: "150px",
        borderRadius: "25px",
        display: "grid",
        gridTemplateRows: "112px auto",
        gridTemplateColumns: "225px auto",
        cursor: "pointer"
      }}
    >
      <div
        style={{
          width: "225px",
          height: "112px",
          borderRadius: "25px 0px 25px 0px",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          poster={data.media}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={data.media} type="video/mp4" />
        </video>
      </div>
      <h1 style={{fontSize: "42px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gridRow: "1 / 3", gridColumn: "2 / 3"}}>▶︎</h1>
      <h1 style={{fontSize: "18px", paddingLeft: "30px", display: "flex", justifyContent: "center", flexDirection: "column"}}>{data.name}</h1>
    </div>
  )
})

export default App;
