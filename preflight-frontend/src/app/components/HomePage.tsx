'use client';

import React from 'react';
import Container from '@/app/components/Container';
import AddProduct from '@/app/components/Card/AddProduct';
import ProductCard from '@/app/components/Card/ProductCard';

const HomePage = ({ response }: any) => {
  // const [allProducts, setAllProducts] = useState<any[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(true);
  // const [searching, setSearching] = useState<boolean>(false);
  // const [loadingError, setLoadingError] = useState<string>('');
  // Fetch products on mount
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const controller = new AbortController();
  //     const timeoutId = setTimeout(() => controller.abort(), 1 * 60 * 1000); // 1 minutes
  //
  //     try {
  //       setLoading(true);
  //       setLoadingError('');
  //
  //       const response = await GET('/stock');
  //       clearTimeout(timeoutId);
  //
  //       setAllProducts(response || []);
  //       setFilteredProducts(response || []);
  //     } catch (error: any) {
  //       clearTimeout(timeoutId);
  //       console.error('Error fetching products:', error);
  //
  //       if (error.name === 'AbortError') {
  //         setLoadingError(
  //           'การโหลดใช้เวลานานเกินไป (1 นาที) กรุณาลองใหม่อีกครั้ง'
  //         );
  //       } else {
  //         setLoadingError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
  //       }
  //
  //       setAllProducts([]);
  //       setFilteredProducts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchProducts();
  // }, []);

  // Handle search
  // const handleSearch = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   if (!searchTerm.trim()) {
  //     setFilteredProducts(allProducts);
  //     return;
  //   }
  //
  //   const controller = new AbortController();
  //   const timeoutId = setTimeout(() => controller.abort(), 30 * 1000); // 30 seconds for search
  //
  //   try {
  //     setSearching(true);
  //     const searchResponse = await POST(
  //       '/stock/search',
  //       {
  //         searchTerm: searchTerm.trim(),
  //       },
  //       { signal: controller.signal }
  //     );
  //
  //     clearTimeout(timeoutId);
  //
  //     if (searchResponse) {
  //       setFilteredProducts(searchResponse);
  //     } else {
  //       // Client-side search fallback
  //       const filtered = allProducts.filter(
  //         (product: any) =>
  //           product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           product?.description
  //             ?.toLowerCase()
  //             .includes(searchTerm.toLowerCase())
  //       );
  //       setFilteredProducts(filtered);
  //     }
  //   } catch (error: any) {
  //     clearTimeout(timeoutId);
  //     console.error('Error searching:', error);
  //
  //     if (error.name === 'AbortError') {
  //       // eslint-disable-next-line no-alert
  //       alert('การค้นหาใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง');
  //     }
  //
  //     // Fallback to client-side search
  //     const filtered = allProducts.filter(
  //       (product: any) =>
  //         product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         product?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredProducts(filtered);
  //   } finally {
  //     setSearching(false);
  //   }
  // };

  // const clearSearch = () => {
  //   setSearchTerm('');
  //   setFilteredProducts(allProducts);
  // };
  //
  // const retryLoading = () => {
  //   window.location.reload(); // Simple retry by reloading the page
  // };
  //
  // if (loading) {
  //   return <Load />;
  // }
  //
  // // Error state with retry option
  // if (loadingError) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <Container width="1200px">
  //         <div className="flex flex-col items-center justify-center h-96">
  //           <div className="text-6xl mb-4">⚠️</div>
  //           <h2 className="text-xl font-semibold text-red-600 mb-2">
  //             เกิดข้อผิดพลาด
  //           </h2>
  //           <p className="text-gray-600 mb-6 text-center max-w-md">
  //             {loadingError}
  //           </p>
  //           <button
  //             onClick={retryLoading}
  //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
  //           >
  //             ลองใหม่อีกครั้ง
  //           </button>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }
  console.log('response', response);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container width="1200px">
        {/* Search and Add Product */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/*  /!*  /!* Search *!/ *!/ */}
          {/*  /!*  <div className="flex-1"> *!/ */}
          {/*  /!*    <form *!/ */}
          {/*  /!*      onSubmit={handleSearch} *!/ */}
          {/*  /!*      className="flex flex-col sm:flex-row gap-3" *!/ */}
          {/*  /!*    > *!/ */}
          {/*  /!*      <div className="relative flex-1"> *!/ */}
          {/*  /!*        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> *!/ */}
          {/*  /!*          <svg *!/ */}
          {/*  /!*            className="h-5 w-5 text-gray-400" *!/ */}
          {/*  /!*            fill="none" *!/ */}
          {/*  /!*            stroke="currentColor" *!/ */}
          {/*  /!*            viewBox="0 0 24 24" *!/ */}
          {/*  /!*          > *!/ */}
          {/*  /!*            <path *!/ */}
          {/*  /!*              strokeLinecap="round" *!/ */}
          {/*  /!*              strokeLinejoin="round" *!/ */}
          {/*  /!*              strokeWidth={2} *!/ */}
          {/*  /!*              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" *!/ */}
          {/*  /!*            /> *!/ */}
          {/*  /!*          </svg> *!/ */}
          {/*  /!*        </div> *!/ */}
          {/*  /!*        <input *!/ */}
          {/*  /!*          type="text" *!/ */}
          {/*  /!*          value={searchTerm} *!/ */}
          {/*  /!*          onChange={(e) => setSearchTerm(e.target.value)} *!/ */}
          {/*  /!*          placeholder="ค้นหาชื่อสินค้า..." *!/ */}
          {/*  /!*          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm" *!/ */}
          {/*  /!*        /> *!/ */}
          {/*  /!*        {searchTerm && ( *!/ */}
          {/*  /!*          <button *!/ */}
          {/*  /!*            type="button" *!/ */}
          {/*  /!*            onClick={clearSearch} *!/ */}
          {/*  /!*            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600" *!/ */}
          {/*  /!*          > *!/ */}
          {/*  /!*            <svg *!/ */}
          {/*  /!*              className="h-5 w-5 text-gray-400" *!/ */}
          {/*  /!*              fill="none" *!/ */}
          {/*  /!*              stroke="currentColor" *!/ */}
          {/*  /!*              viewBox="0 0 24 24" *!/ */}
          {/*  /!*            > *!/ */}
          {/*  /!*              <path *!/ */}
          {/*  /!*                strokeLinecap="round" *!/ */}
          {/*  /!*                strokeLinejoin="round" *!/ */}
          {/*  /!*                strokeWidth={2} *!/ */}
          {/*  /!*                d="M6 18L18 6M6 6l12 12" *!/ */}
          {/*  /!*              /> *!/ */}
          {/*  /!*            </svg> *!/ */}
          {/*  /!*          </button> *!/ */}
          {/*  /!*        )} *!/ */}
          {/*  /!*      </div> *!/ */}
          {/*  /!*      <button *!/ */}
          {/*  /!*        type="submit" *!/ */}
          {/*  /!*        disabled={searching} *!/ */}
          {/*  /!*        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm" *!/ */}
          {/*  /!*      > *!/ */}
          {/*  /!*        {searching ? ( *!/ */}
          {/*  /!*          <div className="flex items-center"> *!/ */}
          {/*  /!*            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> *!/ */}
          {/*  /!*            ค้นหา *!/ */}
          {/*  /!*          </div> *!/ */}
          {/*  /!*        ) : ( *!/ */}
          {/*  /!*          'ค้นหา' *!/ */}
          {/*  /!*        )} *!/ */}
          {/*  /!*      </button> *!/ */}
          {/*  /!*    </form> *!/ */}
          {/*  /!*  </div> *!/ */}

          {/* Add Product */}
          <div className="lg:w-auto">
            <AddProduct />
          </div>
        </div>
        {/*  /!* Results Header *!/ */}
        {/*  <div className="flex justify-between items-center mb-6"> */}
        {/*    <h2 className="text-2xl font-semibold text-gray-800"> */}
        {/*      {searchTerm ? `ผลการค้นหา "${searchTerm}"` : 'สินค้าทั้งหมด'} */}
        {/*    </h2> */}
        {/*    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full"> */}
        {/*      {filteredProducts.length} รายการ */}
        {/*    </span> */}
        {/*  </div> */}
        {/* Products Grid */}
        {response.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {response.map((data: any, index: number) => (
              <div key={index}>
                <ProductCard data={data} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            {/* <h3 className="text-xl font-semibold text-gray-700 mb-2"> */}
            {/*  {searchTerm ? 'ไม่พบสินค้าที่ค้นหา' : 'ยังไม่มีสินค้า'} */}
            {/* </h3> */}
            {/* <p className="text-gray-500 mb-4"> */}
            {/*  {searchTerm */}
            {/*    ? 'ลองค้นหาด้วยคำอื่น หรือเพิ่มสินค้าใหม่' */}
            {/*    : 'เริ่มต้นด้วยการเพิ่มสินค้าแรกของคุณ'} */}
            {/* </p> */}
            {/* {searchTerm && ( */}
            {/*  <button */}
            {/*    onClick={clearSearch} */}
            {/*    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" */}
            {/*  > */}
            {/*    แสดงสินค้าทั้งหมด */}
            {/*  </button> */}
            {/* )} */}
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
