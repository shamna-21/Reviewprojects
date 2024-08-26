import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [value, setValue] = useState({ name: "", email: "", number: "" });
  const userid = localStorage.getItem("id");
  const navigate = useNavigate();

  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const resp = await axios.get(`http://localhost:3000/users/${userid}`);
      const user = resp.data;

      const updatedDetails = [...user.details, value];

      await axios.put(`http://localhost:3000/users/${userid}`, {
        ...user,
        details: updatedDetails,
      });

      setValue({ name: "", email: "", number: "" });

      alert("Contact added successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the contact.");
    }
  }

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <h1 className="text-red-700 font-bold text-2xl">Create Contact</h1>
        
        <div className="p-2">
          <label htmlFor="name"  className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={value.name}
            required
            onChange={handleChange}
             className="border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="email"  className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={value.email}
            required
            onChange={handleChange}
             className="border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password"  className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={value.number}
            required
            onChange={handleChange}
             className="border border-gray-700"
          />
        </div>
        <div className="p-6">
          <button type="submit" className="bg-red-600 rounded-md text-white w-20">Add</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
