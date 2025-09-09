import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Inventory = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const [invResponse, itemsResponse] = await Promise.all([
          api.get(`/api/inventories/${id}`),
          api.get(`/api/items/inventory/${id}`)
        ]);
        setInventory(invResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !inventory) {
    return (
      <div className="text-center py-8 text-red-600">
        {error || 'Inventory not found'}
      </div>
    );
  }

  const canEdit = user && (
    user.role === 'admin' ||
    inventory.createdBy === user.id ||
    inventory.access.editors.includes(user.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{inventory.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {inventory.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
          <Tab className={({ selected }) =>
            `px-4 py-2 text-sm font-medium border-b-2 ${
              selected
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Items
          </Tab>
          <Tab className={({ selected }) =>
            `px-4 py-2 text-sm font-medium border-b-2 ${
              selected
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Description
          </Tab>
          <Tab className={({ selected }) =>
            `px-4 py-2 text-sm font-medium border-b-2 ${
              selected
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`
          }>
            Settings
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            {/* Items Tab */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {canEdit && (
                <button className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Add Item
                </button>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      {inventory.customFields.map(field => (
                        <th
                          key={field.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {field.name}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {item.customId}
                        </td>
                        {inventory.customFields.map(field => (
                          <td key={field.id} className="px-6 py-4 whitespace-nowrap text-sm">
                            {item.customFields[field.id]}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {canEdit && (
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* Description Tab */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 prose dark:prose-invert max-w-none">
              <ReactMarkdown>{inventory.description}</ReactMarkdown>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* Settings Tab */}
            {canEdit ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Custom Fields</h3>
                <div className="space-y-4">
                  {inventory.customFields.map(field => (
                    <div key={field.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{field.name}</p>
                        <p className="text-sm text-gray-500">Type: {field.type}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  Add Field
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                You don't have permission to edit this inventory.
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Inventory;