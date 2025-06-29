import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import { FaSpinner, FaInfoCircle } from 'react-icons/fa';
import ItemDetailModal from '../components/ItemDetailModal';

const ViewItemsPage = () => {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const params = {};
        if (statusFilter !== 'All') params.status = statusFilter;
        if (searchTerm) params.search = searchTerm;
        
        const response = await axios.get('http://localhost:5000/api/items', { params });
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [statusFilter, searchTerm]);

  const handleResolve = async (itemId) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${itemId}/resolve`);
      setItems(items.map(item => 
        item._id === itemId ? { ...item, status: 'Resolved' } : item
      ));
    } catch (err) {
      setError('Failed to resolve item. Please try again.');
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
    } catch (err) {
      setError('Failed to delete item. Please try again.');
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Lost & Found Items</h1>
          <p className="mt-2 max-w-2xl">
            Browse through items reported as lost or found in your community
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div>
              <StatusFilter 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter} 
              />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <FaInfoCircle className="mr-2" />
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are no items matching your search criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <ItemCard 
                key={item._id} 
                item={item} 
                onResolve={handleResolve}
                onDelete={handleDelete}
                onView={handleViewItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {showModal && selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default ViewItemsPage;