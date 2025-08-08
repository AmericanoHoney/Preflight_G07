'use client';

import React, { useState } from 'react';
import Container from '@/app/components/Container';
import ProductCard from '@/app/components/Card/ProductCard';
import AddProduct from '@/app/components/Card/AddProduct';

const HomePage = ({ allProduct }: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter products based on search term
  const filterProducts = (products: any[]) => {
    if (!searchTerm.trim()) {
      return products;
    }

    return products.filter(
      (product: any) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProducts = filterProducts(allProduct || []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container width="1200px">
        {/* Search Bar */}
        <div className="flex flex-row mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <AddProduct />
          </div>
        </div>

        {/* Results Info */}
        {searchTerm && (
          <div className="mb-4 text-center text-gray-600">
            พบสินค้า {filteredProducts.length} รายการ สำหรับ `"{searchTerm}"
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {filteredProducts.map((data: any, index: number) => (
              <div key={index}>
                <ProductCard data={data} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {searchTerm ? 'ไม่พบสินค้าที่ค้นหา' : 'ไม่มีสินค้าในคลัง'}
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                ล้างการค้นหา
              </button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
