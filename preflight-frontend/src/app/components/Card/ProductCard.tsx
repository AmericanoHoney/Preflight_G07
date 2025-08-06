'use client';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditProduct from '@/app/components/Card/EditProduct';
import DeleteProduct from '@/app/components/Card/DeleteProduct';
import Image from 'next/image';

const ProductCard = ({ data }: any) => {
  dayjs.extend(relativeTime);
  return (
    <div className="product-card">
      <div className="relative aspect-[5/3] overflow-hidden rounded-tr-md rounded-tl-md z-0">
        {data.imageUrl ? (
          <img src={data.imageUrl} alt={data.title} />
        ) : (
          <Image
            src={
              'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            }
            alt={data.title}
            fill
          />
        )}
      </div>
      <div className="p-3">
        {data.title ? (
          <div className="text-[22px] font-extrabold py-2.5">{data.title}</div>
        ) : null}
        {data.amount ? (
          <div>
            <div className="text-[14px] font-extralight">Product ID</div>
            <div className="text-[14px] font-medium">{data.id}</div>
          </div>
        ) : null}
        <div className="flex flex-row justify-between pr-6 py-2.5">
          {data.amount ? (
            <div>
              <div className="text-[14px] font-extralight">Amount</div>
              <div className="text-[14px] font-medium">{data.amount}</div>
            </div>
          ) : null}
          {data.updateDate ? (
            <div>
              <div className="text-[14px] font-extralight">Lastest Update</div>
              <div className="text-[14px] font-medium">{data.updateDate}</div>
            </div>
          ) : null}
        </div>
        <div className="w-full border-b border-gray-300 my-2.5"></div>
        <div className="flex flex-row w-full gap-2.5">
          <EditProduct data={data} />
          <DeleteProduct product={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
