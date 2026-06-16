import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

function VolunteerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    skills: '', // Comma-separated string
    availability: '',
    address: '',
    preferredRole: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum)) {
        throw new Error("Age must be a valid number");
      }

      const dataToSend = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s), // Convert to array
        age: ageNum,
      };

      const response = await api.post('/volunteers', dataToSend);
      toast.success(response.data.message || 'Registration successful!');
      navigate(-1); // Go back to the previous page (e.g. Dashboard)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Volunteer registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Register New Volunteer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills (comma-separated)</label>
            <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">Availability</label>
            <input type="text" id="availability" name="availability" value={formData.availability} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredRole">Preferred Role</label>
            <select id="preferredRole" name="preferredRole" value={formData.preferredRole} onChange={handleChange} required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a role</option>
              <option value="Mentor">Mentor</option>
              <option value="Coordinator">Coordinator</option>
              <option value="General Support">General Support</option>
              <option value="Event Planning">Event Planning</option>
            </select>
          </div>
          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Registering...' : 'Register Volunteer'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VolunteerRegistration;