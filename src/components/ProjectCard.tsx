import React from "react"

import aloomThumbnail from "../assets/aloom_thumbnail.mp4"
import calendarWidget from "../assets/calendar_widget.jpeg"
import minilatheThumbnail from "../assets/minilathe_thumbnail.mp4"
import litphumThumbnail from "../assets/litphum_thumbnail.mp4"
import atomarThumbnail from "../assets/atomar_thumbnail.jpeg"
import bbookThumbnail from "../assets/bbook_thumbnail.png"
import aloomPoster from "../assets/aloom_poster.jpeg"
import litphumPoster from "../assets/litphum_poster.jpeg"
import minilathePoster from "../assets/minilathe_poster.jpeg"

export interface ProjectData {
  media: string
  poster: string
  name: string
}
interface ProjectProps {
  data: ProjectData
  children: React.ReactNode
  onClick: () => void
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectProps>(({ data, children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        background: "radial-gradient(circle at top right, rgba(218,218,218,0.8) 0%, rgba(0,0,0,0) 100%)",
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
        { children }
      </div>
      <h1 style={{fontSize: "42px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gridRow: "1 / 3", gridColumn: "2 / 3"}}>▶︎</h1>
      <h1 style={{fontSize: "18px", paddingLeft: "30px", display: "flex", justifyContent: "center", flexDirection: "column"}}>{data.name}</h1>
    </div>
  )
})

export const projectData: ProjectData[] = [
  {
    media: aloomThumbnail,
    poster: aloomPoster,
    name: "aloom"
  },
  {
    media: bbookThumbnail,
    poster: bbookThumbnail,
    name: "BBOOK"
  },
  {
    media: atomarThumbnail,
    poster: atomarThumbnail,
    name: "Atomar"
  },
  {
    media: litphumThumbnail,
    poster: litphumPoster,
    name: "litphum"
  },
  {
    media: minilatheThumbnail,
    poster: minilathePoster,
    name: "MINI-LATHE"
  },
  {
    media: calendarWidget,
    poster: calendarWidget,
    name: "Calendar Widgets"
  }
]

export default ProjectCard