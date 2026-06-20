import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>ONLINE JOB PORTAL</h1>

      <p>
        Find Your Dream Career and explore opportunities
        from top companies.
      </p>

      <button
        className="main-btn"
        onClick={() => navigate("/register")}
      >
        Candidate Portal
      </button>

      <button
        className="main-btn recruiter-btn"
        onClick={() => navigate("/add-job")}
      >
        Recruiter Portal
      </button>
    </div>
  );
}

export default Home;