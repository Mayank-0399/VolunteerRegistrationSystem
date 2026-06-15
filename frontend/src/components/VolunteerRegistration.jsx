import React, { useState } from 'react';
import api from '../api';

const VolunteerRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        role: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/volunteers', formData);
            setMessage('Registration successful! Your application is pending approval.');
            setFormData({ name: '', email: '', phone: '', skills: '', role: '' });
        } catch (error) {
            console.error('Registration Error:', error);
            const errorMsg = error.response?.data?.message || 'Registration failed. Please check your connection or try a different email.';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Volunteer Registration</h2>
            {message && <p className="mb-4 text-blue-600">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input 
                        type="text" name="name" value={formData.name} onChange={handleChange}
                        className="w-full p-2 border rounded" required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full p-2 border rounded" required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input 
                        type="text" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full p-2 border rounded" required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Skills</label>
                    <input 
                        type="text" name="skills" value={formData.skills} onChange={handleChange}
                        placeholder="e.g. Teaching, Coding, Event Planning"
                        className="w-full p-2 border rounded" required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Preferred Role</label>
                    <select 
                        name="role" value={formData.role} onChange={handleChange}
                        className="w-full p-2 border rounded" required
                    >
                        <option value="">Select a role</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="General Support">General Support</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
};

export default VolunteerRegistration;