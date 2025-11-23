
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){
  const nav=useNavigate();
  const [email,setE]=useState('');
  const [password,setP]=useState('');
  async function submit(){
    const res=await axios.post('/api/auth/login',{email,password});
    localStorage.setItem('token',res.data.token);
    nav('/dashboard');
  }
  return <div>
    <h1>Login</h1>
    <input placeholder="email" onChange={e=>setE(e.target.value)}/>
    <input placeholder="password" type="password" onChange={e=>setP(e.target.value)}/>
    <button onClick={submit}>Login</button>
  </div>
}
