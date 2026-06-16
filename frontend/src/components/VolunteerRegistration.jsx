import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VolunteerRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        skills: '',
        availability: '',
        address: '',
        preferredRole: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const ageNum = parseInt(formData.age, 10);
            const dataToSend = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
                age: isNaN(ageNum) ? 0 : ageNum,
            };

            const response = await api.post('/volunteers', dataToSend);
            toast.success(response.data.message || 'Registration successful!');
            setFormData({ name: '', email: '', phone: '', age: '', skills: '', availability: '', address: '', preferredRole: '' });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Registration Error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Skills (comma-separated)</label>
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                            placeholder="e.g. Teaching, Coding, Event Planning"
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Availability</label>
                        <input type="text" name="availability" value={formData.availability} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-gray-700 font-bold mb-1">Preferred Role</label>
                        <select name="preferredRole" value={formData.preferredRole} onChange={handleChange}
                            className="w-full p-2 border rounded" required>
                            <option value="">Select a role</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="General Support">General Support</option>
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded font-bold hover:bg-blue-600 disabled:bg-blue-300">
                    {loading ? 'Registering...' : 'Register Volunteer'}
                </button>
            </form>
        </div>
    );
};

export default VolunteerRegistration;