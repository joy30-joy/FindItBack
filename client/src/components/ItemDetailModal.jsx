import React from 'react';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import moment from 'moment';

const ItemDetailModal = ({ item, onClose }) => {
  const getImageUrl = () => {
    if (!item.image) return null;
    if (item.image.startsWith('http')) return item.image;
    return `http://localhost:5000/${item.image}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              {imageUrl && (
                <div className="h-64 overflow-hidden rounded-lg mb-4">
                  <img 
                    src={imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.type === 'Lost' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.type}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    item.status === 'Active' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1 text-gray-900">{item.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-gray-900 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      {item.location}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date Reported</h3>
                    <p className="mt-1 text-gray-900 flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      {moment(item.date).format('MMM D, YYYY h:mm A')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                  <FaCheck className="mr-2" /> Contact Information
                </h3>
                <p className="text-gray-700">
                  Please contact <span className="font-medium">user@example.com</span> if you have information about this item.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;