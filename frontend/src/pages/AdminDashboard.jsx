import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchVolunteers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch stats');
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await api.get('/admin/volunteers');
      setVolunteers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch volunteers');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.info('Logged out successfully');
    navigate('/admin/login');
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await api.get(`/admin/volunteers/${id}`);
      setSelectedVolunteer(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch volunteer details');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/volunteers/${id}/status`, { status: newStatus });
      toast.success('Volunteer status updated successfully');
      fetchVolunteers(); // Refresh list
      setSelectedVolunteer(prev => prev && prev._id === id ? { ...prev, status: newStatus } : prev); // Update selected volunteer if open
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await api.delete(`/admin/volunteers/${id}`);
        toast.success('Volunteer deleted successfully');
        fetchVolunteers(); // Refresh list
        setSelectedVolunteer(null); // Close details if deleted
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete volunteer');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div>
          <Link to="/volunteers/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Register New Volunteer
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Volunteers</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer List</h2>
        {volunteers.length === 0 ? (
          <p className="text-gray-600">No volunteers registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{volunteer.name}</td>
                    <td className="py-2 px-4 border-b">{volunteer.email}</td>
                    <td className="py-2 px-4 border-b">{volunteer.phone}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        volunteer.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        volunteer.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleViewDetails(volunteer._id)} className="text-blue-600 hover:underline mr-2">View</button>
                      <select
                        value={volunteer.status}
                        onChange={(e) => handleUpdateStatus(volunteer._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button onClick={() => handleDeleteVolunteer(volunteer._id)} className="text-red-600 hover:underline ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedVolunteer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Volunteer Details</h3>
            <p><strong>Name:</strong> {selectedVolunteer.name}</p>
            <p><strong>Email:</strong> {selectedVolunteer.email}</p>
            <p><strong>Phone:</strong> {selectedVolunteer.phone}</p>
            <p><strong>Age:</strong> {selectedVolunteer.age}</p>
            <p><strong>Skills:</strong> {selectedVolunteer.skills?.join(', ') || 'N/A'}</p>
            <p><strong>Availability:</strong> {selectedVolunteer.availability || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedVolunteer.address || 'N/A'}</p>
            <p><strong>Preferred Role:</strong> {selectedVolunteer.preferredRole || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedVolunteer.status}</p>
            <button onClick={() => setSelectedVolunteer(null)} className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;