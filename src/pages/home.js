import { useState, useEffect } from "react";

import { supabase } from "../supabaseClient";
import "../index.css";


function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!user) {
    return <p className="p-4">Not logged in</p>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Welcome, {user.email}!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.href = "/"
        }}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

export default Home;