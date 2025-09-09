import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await api.get('/api/inventories');
        // Filter inventories where user is creator or has edit access
        const userInventories = response.data.filter(inv => 
          inv.createdBy === user.id || inv.access.editors.includes(user.id)
        );
        setInventories(userInventories);
      } catch (error) {
        console.error('Failed to fetch inventories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Inventories</h1>
        <Link
          to="/inventory/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create New
        </Link>
      </div>

      {inventories.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-300">
            You haven't created any inventories yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventories.map(inventory => (
            <Link
              key={inventory.id}
              to={`/inventory/${inventory.id}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{inventory.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {inventory.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {inventory.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {inventory.createdBy === user.id ? 'Owner' : 'Editor'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;