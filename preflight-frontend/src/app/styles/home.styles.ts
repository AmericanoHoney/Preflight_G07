'use client';

import styled from 'styled-components';

export const HomePageStyled = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .header-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    margin: 70px 0 40px 0;
    font-weight: 500;
    font-size: 1.8em;
    .add-button {
      background: cadetblue;
      padding: 10px;
    }
  }

  .product-container {
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 40px;
  }
`;
