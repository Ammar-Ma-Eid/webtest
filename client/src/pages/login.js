import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function Login(){
    const navigate=useNavigate();
    const [data,setData]=useState({
        Email:'',
        Password:''
    });
    const loginUser= async(e)=>{
        e.preventDefault();
        const {Email,Password}=data;
        try {
            const {data}=await axios.post('/login',{
                Email,
                Password
            })
            if(data.error){
                alert(data.error);
            }
            else{
                setData({});
                navigate('/');
                alert("Successful Login");
            }
        } catch (error) {
            alert("Error: " + error.response.data.error);
        }
    }
    return (
        <div>
           <form onSubmit={loginUser}>
            <label>Email</label> <br/>
            <input type='email' value={data.Email} onChange={(e)=>setData({...data,Email:e.target.value})}/><br/>
            <label>Password</label><br/>
            <input type='password'  value={data.Password} onChange={(e)=>setData({...data,Password:e.target.value})}/><br/><br/>
            <button> Submit</button>
           </form>
        </div>
    )
}

export default Login;