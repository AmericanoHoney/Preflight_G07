import { HomePageStyled } from '@/app/styles/home.styles';
import ProductCard from '@/app/components/ProductCard';
import { MiniData } from '@/app/utils/MiniData';
import Container from '@/app/components/Container';
import AddProduct from '@/app/components/AddProduct';

export default async function Home() {
  return (
    <HomePageStyled>
      <Container width="1200px">
        <div className="header-container">
          <div className="header-name">Product</div>
          <div className="flex-2" />
          <div className="filter-button">Filter</div>
          <div className="add-button">
            <AddProduct />
          </div>
        </div>
        <div className="product-container">
          {MiniData &&
            MiniData.map((data: any, index: number) => (
              <ProductCard data={data} key={index} />
            ))}
        </div>
      </Container>
    </HomePageStyled>
  );
}
