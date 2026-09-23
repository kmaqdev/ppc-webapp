import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carouselWrapper = carouselWrapperRef.current;
    if (!carouselWrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        carouselWrapper.scrollBy({
          left: e.deltaY,
          behavior: "smooth"
        })
      }
    }

    carouselWrapper.addEventListener("wheel", handleWheel, {passive: false});
    return () => {
      carouselWrapper.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const cards = []
  for (let i=1; i < 6; i++) {
    cards.push(<Card key={`card-${i}`} value={i}/>)
  }


  return (
  <div className="container">
    <div className="header">
      Digital Museum
    </div>
    <div className={`door ${isDoorOpen? "open" : ""}`} onClick={() => setIsDoorOpen(true)}>
      <div className="door-left"></div>
      <div className="door-right"></div>
    </div>
    <div className="carousel-wrapper" ref={carouselWrapperRef}>
      <div className="carousel">
        {cards}
      </div>
    </div>
  </div>
  );
}

export default App;
