import { useState, useEffect } from "react";

import { supabase } from "../../supabaseClient";
import "../../index.css";


function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [])


  return (
    <h1>Home Page Test</h1>
  )
}

export default Home;