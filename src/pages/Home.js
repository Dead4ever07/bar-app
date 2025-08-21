import { useState, useEffect } from "react";
import Carrossel from "../components/Home/Carousel";
import "../index.css";
import { TeamGrid } from "../components/Home/TeamGrid";





function Home() {
  const [user, setUser] = useState(null)
  const names = [
    "Joana",
    "Gonçalo",
    "Margarida",
    "Beatriz Carvalho",
    "Inês Vilaça",
    "Luís",
  ]
  
  const members = names.map(([name])=>({
    name,
    photo: `../../`
  }));

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