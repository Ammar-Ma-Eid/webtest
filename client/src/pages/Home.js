import React from "react";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  axios
    .get("/")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch users", err);
    });

  return (
    <div>
      <h2>All Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.Name}</strong> - {user.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
