import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const navigate = useNavigate();
  
  const [loginValue, setLoginValue] = useState({ email: "", password: "",});
  const [loginErors, setLoginErors] = useState({ email: "", password: "" });
  

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find((use) => use.email === loginValue.email);

      if (user) {
       
         if (user.password === loginValue.password) {
          alert("login succesfully!");
          localStorage.setItem("id", user.id);
          localStorage.setItem("name", user.name);
          navigate('/')
        } else {
            errors.password = "incorrect password";
          alert("incorrect password");
        }
      } else {
        errors.email = "Email not found";
        alert("Email not found or incorrect password");
      }
    } catch (error) {
      alert("Errors:" + error);
    }
    setLoginErors(errors);
  }
  function handleChange(e) {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="m-20 p-10" >
        <h2 className="text-red-700 font-bold text-2xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="p-5">
            <label
              for="email"
             className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginValue.email}
              onChange={handleChange}
             className="border border-gray-700"
            ></input>
            {loginErors.email && (
              <span className="text-red-500 text-sm">{loginErors.email}</span>
            )}
          </div>
          <div>
            <labell
              for="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {" "}
              Password:
            </labell>
            <input
              type="password"
              id="password"
              name="password"
              value={loginValue.password}
              onChange={handleChange}
              className="border border-gray-700"
            ></input>
            {loginErors.password && (
              <span className="text-red-500 text-sm">
                {loginErors.password}
              </span>
            )}
          </div>

         <div className="p-5">
         <button
            type="submit"
           className="bg-red-600 rounded-md text-white w-20"
          >
            Login
          </button>
         </div>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <Link to="/Sign" className="text-red-600" >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
