import Container from '@/app/components/Container';
import React from 'react';

const Load = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container width="1200px">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <span className="text-lg text-gray-600 mb-2">กำลังโหลดข้อมูล...</span>
          <span className="text-sm text-gray-500">อาจใช้เวลาสูงสุด 1 นาที</span>
        </div>
      </Container>
    </div>
  );
};

export default Load;
