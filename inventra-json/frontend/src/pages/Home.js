import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [inventories, setInventories] = useState([]);
  const [tags, setTags] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await api.get('/api/inventories');
        setInventories(response.data);
        
        // Build tag cloud
        const tagCount = {};
        response.data.forEach(inv => {
          inv.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        });
        setTags(tagCount);
      } catch (error) {
        console.error('Failed to fetch inventories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Latest Inventories */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Latest Inventories</h2>
          <div className="space-y-4">
            {inventories.slice(0, 5).map(inventory => (
              <Link
                key={inventory.id}
                to={`/inventory/${inventory.id}`}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold">{inventory.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {inventory.category}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {inventory.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tag Cloud */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex flex-wrap gap-3">
              {Object.entries(tags).map(([tag, count]) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded-full text-sm cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                  style={{
                    fontSize: `${Math.max(0.8, Math.min(1.5, 0.8 + count * 0.1))}rem`
                  }}
                >
                  {tag} ({count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;