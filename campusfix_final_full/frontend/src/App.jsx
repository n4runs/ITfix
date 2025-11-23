
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateReport from './pages/CreateReport';

export default function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/create" element={<CreateReport/>}/>
    </Routes>
  </BrowserRouter>
}
