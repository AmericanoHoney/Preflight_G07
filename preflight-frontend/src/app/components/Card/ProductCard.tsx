'use client';

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

dayjs.extend(relativeTime);

type StockItem = {
  id: string;
  imageUrl?: string | null;
  title: string;
  productid?: string | null;
  category: string;
  amount: number; // can be 0
  updatedAt?: string | null; // optional; format/display if you have it
  createdAt?: string | null;
};

const ProductCard = ({ data }: { data: StockItem }) => {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="relative aspect-[5/3] overflow-hidden rounded-t-md">
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.title || 'product image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        {data.title && (
          <div className="text-[22px] font-extrabold py-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            {data.title}
          </div>
        )}

        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-col gap-2.5 py-2.5">
            <div className="text-[14px] font-extralight">Product ID</div>
            <div className="text-[14px] font-medium">
              {data.productid ?? '-'}
            </div>
            <div className="text-[14px] font-extralight">Amount</div>
            <div className="text-[14px] font-medium">{data.amount ?? '-'}</div>
          </div>
          <div className="flex flex-col gap-2.5 py-2.5">
            <div className="text-[14px] font-extralight">Product Category</div>
            <div className="text-[14px] font-medium">
              {data.category ?? '-'}
            </div>
            <div className="text-[14px] font-extralight">Last Update</div>
            <div className="text-[14px] font-medium">
              {data.updatedAt
                ? `${dayjs(data.updatedAt).fromNow()}`
                : data.createdAt
                  ? `${dayjs(data.createdAt).fromNow()}`
                  : '-'}
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-2.5">
          <EditProduct data={data} />
          <DeleteProduct
            product={{ id: data.id, title: data.title, amount: data.amount }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;