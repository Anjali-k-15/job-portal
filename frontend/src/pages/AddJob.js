import { useState } from "react";

function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const addJob = () => {
    fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        company,
        location,
        description,
      }),
    })
      .then((res) => res.text())
      .then(() => {
        alert("Job Posted Successfully ✅");

        setTitle("");
        setCompany("");
        setLocation("");
        setDescription("");
      });
  };

  return (
    <div className="auth-card">
      <h2>Recruiter - Post Job</h2>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addJob}>
        Post Job
      </button>
    </div>
  );
}

export default AddJob;