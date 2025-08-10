'use client';

import React, { useMemo, useState } from 'react';
import useSWR, { mutate as swrMutate } from 'swr';
import ProductCard from './Card/ProductCard';
import AddProduct from './Card/AddProduct';
import DeleteAll from './Card/DeleteAll';
import SearchBar from './SearchBar';
import { get } from '../lib/api';
import { StockItem } from '../types/stock';

interface HomePageProps {
  allProduct: StockItem[];
}

const HomePage = ({ allProduct }: HomePageProps) => {
  const [q, setQ] = useState('');

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

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return products;
    return products.filter((p) => {
      const title = (p.title ?? '').toLowerCase();
      const cat = (p.category ?? '').toLowerCase();
      const id = (p.productid ?? '').toLowerCase();
      return title.includes(qq) || cat.includes(qq) || id.includes(qq);
    });
  }, [products, q]);

  return (
    <div>
      {/* Header row: Search left, actions right */}
      <div className="flex mb-4 w-full items-start gap-4">
        <div className="flex-[3/5] w-full h-full max-w-xl">
          <SearchBar
            placeholder="Search by name, category, or ID…"
            onSearch={setQ}
            debounceMs={200}
          />
          <div className="text-xs text-gray-500 mt-1">
            {q != '' ? (
              <>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                {!!q && <> for “{q}”</>}
              </>
            ) : ("")}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3 w-full">
          <AddProduct onProductAdded={() => swrMutate('/stock')} />
          {/* Revalidate '/stock' after delete-all */}
          <DeleteAll onAllDeleted={() => swrMutate('/stock')} />
        </div>
      </div>

      <div className="w-full h-full bg-gray-50 p-5">
        {error && <div className="text-red-600">Failed to load products.</div>}
        {isLoading && products.length === 0 && <div>Loading…</div>}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((item) => (
              <div key={item.id}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 py-12 text-center">
            {q ? 'No matches. Try a different keyword.' : 'No products yet.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;