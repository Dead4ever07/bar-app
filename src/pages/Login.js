
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    navigate("/menu")
  }

  return (
    <div className="w3-container w3-center" style={{ marginTop: "10vh" }}>
      <div className="w3-card w3-padding w3-white w3-round-large"
        style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 className="w3-center">Login</h2>
        <form onSubmit={handleLogin} className="w3-container">
          <p>
            <input
              className="w3-input w3-border w3-round"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </p>
          <p>
            <input
              className="w3-input w3-border w3-round"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </p>
          <button
            type="submit"
            className="w3-button w3-blue w3-round w3-block"
          >
            Login
          </button>
          {error && <p className="w3-text-red w3-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}