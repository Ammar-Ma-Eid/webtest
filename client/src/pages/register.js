import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Name: '',
    Email: '',
    Password: ''
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { Name, Email, Password } = data;
    try {
      const response = await axios.post('/register', {
        Name, Email, Password
      });
      if (response.data.error) {
        alert(response.data.error);
      }
      else {
        setData({})
        alert("Registration Successful");
        navigate('/login');
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  }
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label> <br />
        <input type="text" value={data.Name} onChange={(e) => setData({ ...data, Name: e.target.value })} />
        <br />
        <label>Email</label><br />
        <input type='email' value={data.Email} onChange={(e) => setData({ ...data, Email: e.target.value })} /><br />
        <label>Password</label><br />
        <input type='password' value={data.Password} onChange={(e) => setData({ ...data, Password: e.target.value })} /><br /><br />
        <button> Submit</button>
      </form>
    </div>
  );
}

export default Register;
