// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout'; // Import your new frame
import Dashboard from './Pages/DashboardPage';
import FormInput from './Pages/FormInput';
import MasterTracker from './Pages/MasterTracker';

export default function App() {
  return (
    <Routes>
      {/* 1. The Parent Route (The Frame) */}
      <Route path="/" element={<Layout />}>
        
        {/* 2. The Nested Sub-Routes (These go inside the Outlet) */}
        {/* "index" means this is the default page that loads at "/" */}
        <Route index element={<Dashboard />} /> 
        
        <Route path="form" element={<FormInput />} />
        <Route path="tracker" element={<MasterTracker />} />
        
      </Route>
      
      {/* In the future, your friend's Login page will go OUTSIDE the layout here, 
          because the login page shouldn't have the sidebar! */}
      {/* <Route path="/login" element={<Login />} /> */}

    </Routes>
  );
}