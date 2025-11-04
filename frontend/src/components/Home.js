import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Saint Mary Hospital</h1>
      <Link to="/register/patient"><button>Register Patient</button></Link>
      <Link to="/register/doctor"><button>Register Doctor</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default Home;
