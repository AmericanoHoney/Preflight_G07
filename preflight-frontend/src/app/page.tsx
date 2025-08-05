import { HomePageStyled } from '@/app/styles/home.styles';
import ProductCard from '@/app/components/ProductCard';
import Container from '@/app/components/Container';
import AddProduct from '@/app/components/AddProduct';
// import { MiniData } from '@/app/utils/MiniData';
import React from 'react';
import { GET } from '@/app/lib/api';

export default async function Home() {
  const allCardResponse = await GET('/stock');

  return (
    <HomePageStyled>
      <Container width="1200px">
        <div className="font-extrabold text-4xl mt-10 mb-5">
          Product Storage
        </div>
        <div className="w-full border-b border-gray-300 mb-2.5"></div>
        <div className="flex flex-row w-full justify-end my-10">
          <div>
            <AddProduct />
          </div>
        </div>
        <div className="grid w-full gap-5 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
          {/* {MiniData && */}
          {/*  MiniData.map((data: any, index: number) => ( */}
          {/*    <ProductCard data={data} key={index} /> */}
          {/*  ))} */}
          {allCardResponse &&
            allCardResponse.map((data: any, index: number) => (
              <ProductCard data={data} key={index} />
            ))}
        </div>
      </Container>
    </HomePageStyled>
  );
}
