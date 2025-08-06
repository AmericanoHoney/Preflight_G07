'use client';

import Container from '@/app/components/Container';

const Navbar = () => {
  return (
    <div className="flex items-center justify-center w-full h-[70px] bg-[#000000]">
      <Container width="1200px">
        <div className="flex justify-center">
          <div className="text-4xl text-white font-extrabold">ThisIsLogo</div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
