import { useState, useEffect } from "react";
import Carrossel from "../components/Home/Carousel";
import "../index.css";


function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [])


  return (
    <Carrossel/>
  )
}

export default Home;