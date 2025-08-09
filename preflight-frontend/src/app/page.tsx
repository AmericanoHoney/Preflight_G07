import Container from './components/Container';
import React from 'react';
import { get } from './lib/api';
import HomePage from './components/HomePage';

type StockItem = {
  id: string;
  imageUrl?: string | null;
  title: string;
  productid?: string | null;
  category: string;
  amount: number;
};

export default async function Home() {
  const allProduct = await get<StockItem[]>('/stock');

  return (
    <div className="flex justify-center">
      <Container width="1200px">
        <div className="bg-gray-700 rounded-2xl p-8 mt-8 mb-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">🏪 Product Storage</h1>
          <p className="text-lg opacity-90">จัดการคลังสินค้าของคุณ</p>
        </div>
        <HomePage allProduct={allProduct} />
      </Container>
    </div>
  );
}
