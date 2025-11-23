
import axios from 'axios';
import {useEffect,useState} from 'react';

export default function Dashboard(){
  const [list,setList]=useState([]);
  useEffect(()=>{
    axios.get('/api/reports',{headers:{Authorization:"Bearer "+localStorage.getItem('token')}})
      .then(r=>setList(r.data));
  },[]);
  return <div>
    <h1>Reports</h1>
    {list.map(r=><div key={r._id}>{r.title}</div>)}
  </div>
}
