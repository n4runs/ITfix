
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function CreateReport(){
  const nav=useNavigate();
  const [title,setT]=useState('');
  const [description,setD]=useState('');
  const [image,setI]=useState(null);

  async function submit(){
    const fd=new FormData();
    fd.append('title',title);
    fd.append('description',description);
    if(image) fd.append('image',image);

    await axios.post('/api/reports', fd, {
      headers:{Authorization:'Bearer '+localStorage.getItem('token')}
    });
    nav('/dashboard');
  }

  return <div>
    <h1>Create Report</h1>
    <input placeholder="title" onChange={e=>setT(e.target.value)}/>
    <textarea placeholder="description" onChange={e=>setD(e.target.value)}/>
    <input type="file" onChange={e=>setI(e.target.files[0])}/>
    <button onClick={submit}>Submit</button>
  </div>
}
