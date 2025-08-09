'use client';

import React from 'react';
import Container from './Container';
import ProductCard from './Card/ProductCard';
import AddProduct from './Card/AddProduct';
import useSWR, { mutate as swrMutate } from 'swr';
import { get } from '../lib/api';
import { StockItem } from '../types/stock';

interface HomePageProps {
  allProduct: StockItem[];
}

const HomePage = ({ allProduct }: HomePageProps) => {
  const { data, isLoading, error } = useSWR<StockItem[]>(
    '/stock',
    () => get<StockItem[]>('/stock'),
    {
      refreshInterval: 2000,
      fallbackData: allProduct,
      keepPreviousData: true,
    }
  );

  const products = data ?? [];

  return (
    <div>
      <Container width="1200px">
        <div className="mb-4">
          <div>
            <AddProduct onProductAdded={() => swrMutate('/stock')} />
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 p-5">
          {error && (
            <div className="text-red-600">Failed to load products.</div>
          )}
          {isLoading && products.length === 0 && <div>Loading…</div>}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {products.map((item) => (
                <div key={item.id}>
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600 py-12 text-center">
              No products yet.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
