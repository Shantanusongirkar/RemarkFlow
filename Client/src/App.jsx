// App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/DashboardPage';
import FormInput from './Pages/FormInput';
import MasterTracker from './Pages/MasterTracker';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} /> 
      <Route path="/form" element={<FormInput />} />
      <Route path="/tracker" element={<MasterTracker />} />
    </Routes>
  );
}