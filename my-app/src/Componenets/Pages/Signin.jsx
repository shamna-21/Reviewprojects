import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Sign() {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    email: "",
    password: "",
    cnfrm_password: "",
    details: [],
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      navigate("/Login");
      const { cnfrm_password, ...newFormValues } = formValues;
      axios.post("http://localhost:3000/users", newFormValues);
    }
  }

  function validate() {
    const errors = {};
    if (!formValues.name) errors.name = "name is required";

    if (!formValues.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      errors.email = "Email is invalid";

    if (!formValues.password) errors.password = "Password is required";
    else if (formValues.password.length < 8) {
      errors.password = "Password should contain 8 characters";
    }

    if (formValues.password !== formValues.cnfrm_password)
      errors.cnfrm_password = "Password do not match";
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }
  return (
    <div className="p-3">
      <div  >
        <h2 className="text-red-700 font-bold text-2xl">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="p-3">
            <label
              for="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="border border-gray-700"
            ></input>
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          <div className="p-3">
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
              value={formValues.email}
              onChange={handleChange}
              className="border border-gray-700"
            ></input>
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="p-3">
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
              value={formValues.password}
              onChange={handleChange}
              className="border border-gray-700"
            ></input>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
          <div className="p-3">
            <labell
              for="cnfrm_password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password:
            </labell>
            <input
              type="password"
              id="cnfrm_password"
              name="cnfrm_password"
              value={formValues.cnfrm_password}
              onChange={handleChange}
              className="border border-gray-700"
            ></input>
            {formErrors.cnfrm_password && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.cnfrm_password}
              </p>
            )}
          </div>
          <button type="submit" className="bg-red-600 rounded-md text-white w-20">SignUp</button>
        </form>
        <p>
          Already have an account?
          <Link to="/Login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Sign;
