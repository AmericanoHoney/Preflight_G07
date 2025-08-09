'use client';

import { useEffect, useState } from "react";
import { get } from "../lib/api";
import HomePage from "./HomePage";

type StockItem = {
  id: string;
  imageUrl?: string | null;
  title: string;
  productid?: string | null;
  category: string;
  amount: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await get<StockItem[]>("/stock");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return <HomePage allProduct={products} />;
}
