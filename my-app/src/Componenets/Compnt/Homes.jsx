import axios from "axios";
import React, { useEffect, useState } from "react";

function Homes() {
  const [data, setData] = useState([]);
  const [showBlocked, setShowBlocked] = useState(false);
  const userid = localStorage.getItem("id");

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:3000/users/${userid}`);
        const fetchedData = await resp.data.details;
        
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (userid) {
      fetchData();
    }
  }, [userid]);

  const filteredData = data.filter((user) =>
    showBlocked ? user.blocked : true
  );

  async function handleBlock(useremail, currentStatus) {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`http://localhost:3000/users/${userid}`, {
        details: data.map((user) =>
          user.email === useremail ? { ...user, blocked: newStatus } : user
        ),
      });

      setData(
        data.map((user) =>
          user.email === useremail ? { ...user, blocked: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  }

  async function handleDelete(detailemail) {
    try {
      const resp = await axios.get(`http://localhost:3000/users/${userid}`);
      const user = resp.data;

      const updatedDetails = user.details.filter(
        (detail) => detail.email !== detailemail
      );

      await axios.put(`http://localhost:3000/users/${userid}`, {
        ...user,
        details: updatedDetails,
      });

      setData(updatedDetails);
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">All Users</h1>

      <div className="mb-4 text-center">
        <button
          onClick={() => setShowBlocked(!showBlocked)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showBlocked ? "Show All" : "Show Blocked"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Number</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.email}>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.number}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleBlock(user.email, user.blocked)}
                      className={`px-4 py-1 rounded text-white ${
                        user.blocked
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="px-4 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homes;
