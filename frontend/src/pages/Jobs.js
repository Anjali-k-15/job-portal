import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const apply = (jobId) => {
    fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        job_id: jobId,
        resume: "resume.pdf",
      }),
    })
      .then((res) => res.text())
      .then(() => {
        alert("Application Submitted Successfully ✅");

        setAppliedJobs((prev) => [...prev, jobId]);
      });
  };

  return (
    <div>
      <h1 className="jobs-title">Available Jobs</h1>

      <h3 style={{ textAlign: "center" }}>
        Total Jobs Available: {jobs.length}
      </h3>

      <h3
        style={{
          textAlign: "center",
          color: "green",
        }}
      >
        Applications Submitted: {appliedJobs.length}
      </h3>

      <input
        type="text"
        placeholder="Search jobs..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="jobs-container">
        {jobs
          .filter((job) =>
            job.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>

              <p>🏢 {job.company}</p>

              <p>📍 {job.location}</p>

              <p>{job.description}</p>

              <button
                className="apply-btn"
                disabled={appliedJobs.includes(job.id)}
                onClick={() => apply(job.id)}
              >
                {appliedJobs.includes(job.id)
                  ? "Applied ✓"
                  : "Apply Now"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Jobs;