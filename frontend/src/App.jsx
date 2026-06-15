import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VolunteerRegistration from './pages/VolunteerRegistration';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/AdminRegister';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center border-b">
        <Link to="/" className="text-xl font-bold text-blue-600">Volunteer Connect</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Register</Link>
          <Link to="/admin/login" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">Admin Panel</Link>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<VolunteerRegistration />} />
          <Route path="/volunteers/register" element={<VolunteerRegistration />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;