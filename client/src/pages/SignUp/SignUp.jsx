import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);

        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);

      setError(error);
    }
  };
  return (
    <>
      <div className={`p-4 max-w-xl mx-auto`}>
        <h1 className={`text-3xl text-center font-bold my-10`}>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col justify-evenly gap-4`}
        >
          
          <input
            type="email"
            placeholder="email"
            className={`border p-4 rounded-lg`}
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className={`border p-4 rounded-lg`}
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className={`bg-blue-700 text-white uppercase p-4 rounded-lg hover:opacity-95 disabled:opacity-75`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className={`flex flex-row my-4 py-2 gap-2`}>
          <p>Have an account?</p>
          <Link to="/">
            <span className={`text-blue-700`}>Sign In</span>
          </Link>
        </div>
        {error && <p className={`text-red-600 mt-5`}>{error}</p>}
      </div>
    </>
  );
};

export default SignUp;
