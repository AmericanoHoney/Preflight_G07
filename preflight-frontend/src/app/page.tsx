import Container from "./components/Container";
import React from "react";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Container width="1200px">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-8 mb-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">🏪 Product Storage</h1>
          <p className="text-lg opacity-90">จัดการคลังสินค้าของฉัน</p>
        </div>
        <ProductList />
      </Container>
    </div>
  );
}
