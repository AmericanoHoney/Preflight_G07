import Container from '@/app/components/Container';
import { GET } from '@/app/lib/api';
import HomePage from '@/app/components/HomePage';

export default async function Home() {
  const allProduct = await GET('/stock');

  return (
    <div className="flex justify-center">
      <Container width="1200px">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-8 mb-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">🏪 Product Storage</h1>
          <p className="text-lg opacity-90">จัดการคลังสินค้าของคุณ</p>
        </div>
        <HomePage allProduct={allProduct} />
      </Container>
    </div>
  );
}
