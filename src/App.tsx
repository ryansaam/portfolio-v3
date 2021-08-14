import React, { ReactNode } from 'react';
import './App.css';

import Revolver, { CylinderData } from './components/Revolver/'

interface BrandBarSpanProps {
  children: ReactNode,
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
  const data: CylinderData[] = [
    { 
      backgroundColor: "red",
      img: "https://cdn.dribbble.com/users/1769954/screenshots/15098252/media/28ef416a4c53cd65b88df05d50afc37f.png?compress=1&resize=1600x1200",
      desc: "This project is too cool for your eyes!"
    },
    { 
      backgroundColor: "green",
      img: "https://cdn.dribbble.com/users/1769954/screenshots/15098252/media/28ef416a4c53cd65b88df05d50afc37f.png?compress=1&resize=1600x1200",
      desc: "This project is too cool for your eyes!"
    },
    { 
      backgroundColor: "blue",
      img: "https://cdn.dribbble.com/users/1769954/screenshots/15098252/media/28ef416a4c53cd65b88df05d50afc37f.png?compress=1&resize=1600x1200",
      desc: "This project is too cool for your eyes!"
    },
    { 
      backgroundColor: "white",
      img: "https://cdn.dribbble.com/users/1769954/screenshots/15098252/media/28ef416a4c53cd65b88df05d50afc37f.png?compress=1&resize=1600x1200",
      desc: "This project is too cool for your eyes!"
    },
    { 
      backgroundColor: "aqua",
      img: "https://cdn.dribbble.com/users/1769954/screenshots/15098252/media/28ef416a4c53cd65b88df05d50afc37f.png?compress=1&resize=1600x1200",
      desc: "This project is too cool for your eyes!"
    }
  ]

  return (
    <div className="App">
      <h1>EXPLORE My Cool Text 2109</h1>
      <BrandBar />
      <Revolver
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          // transform: "translateX(-50%)"
        }}
        radius={100}
        cylinderData={data}
        cylinderWidth={300}
        cylinderHeight={150}
      />
    </div>
  );
}

export default App;
