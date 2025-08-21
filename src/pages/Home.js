import { useState, useEffect } from "react";
import Carrossel from "../components/Home/Carousel";
import "../index.css";
import { TeamGrid } from "../components/Home/TeamGrid";





function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [])


  return (
    <div>
      <Carrossel />
      <TeamGrid/>
    </div>
  )
}

export default Home;