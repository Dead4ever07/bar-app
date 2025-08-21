import { useState, useEffect } from "react";
import Carousel1 from "../../resources/Home/Carousel1.jpeg";
import Carousel2 from "../../resources/Home/Carousel2.jpeg";
import Carousel3 from "../../resources/Home/Carousel3.jpeg";
import Carousel4 from "../../resources/Home/Carousel4.jpeg";
import "../Layout/Layout.css";
import "../../index.css";
import "./Home.css";

const slides = [
  {
    img: Carousel1,
    title: "Ricardo e Nelson",
    desc: "",
  },
  {
    img: Carousel2,
    title: "Barbara",
    desc: "",
  },
  {
    img: Carousel3,
    title: "Inês",
    desc: "",
  },
  {
    img: Carousel4,
    title: "Bia Carvalho e Gonçalo",
    desc: "",
  },
];

function Carrossel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="mySlides w3-display-container w3-center"
          style={{ display: index === current ? "block" : "none" }}
        >
          <img
            src={slide.img}
            alt={slide.title}
            style={{
              objectFit: "cover",
              width: "100vw",
              height: "100vh",
            }}
          />
          {/* Animated Arrow */}
          <div className="w3-display-bottommiddle w3-container w3-padding-32">
            <div className="arrow bounce"></div>
          </div>

          <div
            className="w3-display-middle"
            style={{ whiteSpace: "nowrap" }}
          >
            <span
              className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity"
              style={{ display: "inline-block", whiteSpace: "normal", wordBreak: "break-word" }}
            >
              Comissão de Festas S.Sebastião '05
            </span>

          </div>
        </div>
      ))}
    </>
  );
}

export default Carrossel;
