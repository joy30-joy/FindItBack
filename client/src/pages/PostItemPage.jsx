import React from 'react';
import ItemForm from '../components/ItemForm';

const PostItemPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Report a Lost or Found Item</h1>
          <p className="mt-2 max-w-2xl">
            Help reunite people with their belongings by reporting items you've lost or found.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 -mt-8">
        <ItemForm />
      </div>
    </div>
  );
};

export default PostItemPage;