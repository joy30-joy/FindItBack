import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaCheck, FaEye } from 'react-icons/fa';
import moment from 'moment';

const ItemCard = ({ item, onResolve, onDelete, onView }) => {
  // Fix image path for all environments
  const getImageUrl = () => {
    if (!item.image) return null;
    if (item.image.startsWith('http')) return item.image;
    return `http://localhost:5000/${item.image}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {imageUrl && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => onView(item)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            <FaEye />
          </button>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              item.type === 'Lost' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {item.type}
            </span>
            <h3 className="mt-2 text-xl font-bold text-gray-900">{item.title}</h3>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.status === 'Active' 
              ? 'bg-blue-100 text-blue-800' 
              : item.status === 'Resolved'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-2">{item.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {item.category}
          </span>
        </div>
        
        <div className="mt-4 flex items-center text-gray-500 text-sm">
          <FaMapMarkerAlt className="mr-1" />
          <span>{item.location}</span>
        </div>
        
        <div className="mt-2 flex items-center text-gray-500 text-sm">
          <FaCalendarAlt className="mr-1" />
          <span>{moment(item.date).format('MMM D, YYYY')}</span>
        </div>
        
        <div className="mt-4 flex justify-between">
          {item.status === 'Active' && (
            <>
              <button 
                onClick={() => onResolve(item._id)}
                className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <FaCheck className="mr-1" />
                Mark Resolved
              </button>
              <button 
                onClick={() => onDelete(item._id)}
                className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;