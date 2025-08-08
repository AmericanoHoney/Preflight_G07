'use client';

import React from 'react';
import Container from '@/app/components/Container';
import ProductCard from '@/app/components/Card/ProductCard';

const HomePage = ({ allProduct }: any) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container width="1200px">
        {allProduct.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {allProduct.map((data: any, index: number) => (
              <div key={index}>
                <ProductCard data={data} />
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default HomePage;
