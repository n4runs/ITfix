
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Register(){
  const nav=useNavigate();
  const [username,setU]=useState('');
  const [email,setE]=useState('');
  const [password,setP]=useState('');
  async function submit(){
    await axios.post('/api/auth/register',{username,email,password});
    nav('/');
  }
  return <div>
    <h1>Register</h1>
    <input placeholder="username" onChange={e=>setU(e.target.value)}/>
    <input placeholder="email" onChange={e=>setE(e.target.value)}/>
    <input placeholder="password" type="password" onChange={e=>setP(e.target.value)}/>
    <button onClick={submit}>Register</button>
  </div>
}
