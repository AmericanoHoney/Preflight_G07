'use client';

import styled, { css } from 'styled-components';
import { useState } from 'react';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddPopupStyled = styled.div<{
  $showPopup: boolean;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${({ $showPopup }) =>
      $showPopup ? 'translateY(0)' : 'translateY(-1000px)'};
  height: auto;
  width: 90%;
  max-width: 500px;
  transition: transform 0.3s ease;
  z-index: ${({ $showPopup }) => ($showPopup ? 1000 : -1)};
`;

const BgPopupStyled = styled.div<{
  $showPopup: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(90, 90, 90, 0.43);
  ${({ $showPopup }) =>
    $showPopup
      ? css`
          z-index: 500;
          transform: scale(100);
        `
      : css`
          z-index: 0;
          transform: scale(0);
        `}
`;

const AddProduct = () => {
  const [isShowPopup, setShowPopup] = useState(false);
  return (
    <>
      <div
        className="bg-gray-300 px-5 py-2.5 button"
        onClick={isShowPopup ? undefined : () => setShowPopup(true)}
        style={{
          pointerEvents: isShowPopup ? 'none' : 'auto',
          cursor: isShowPopup ? 'not-allowed' : 'pointer',
          opacity: isShowPopup ? 0.5 : 1,
        }}
      >
        <div className="w-full flex justify-center gap-1">
          <div className="flex flex-row items-center">ADD</div>
          <AddIcon
            style={{
              fontSize: 20,
            }}
          />
        </div>
      </div>
      <AddPopupStyled $showPopup={isShowPopup}>
        <div className="flex flex-col gap-4 p-6 w-full bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Add Product
          </h2>
          <TextField
            size="small"
            label="Add Product Image"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            label="Product Title"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            label="Product ID"
            variant="outlined"
            fullWidth
          />
          <TextField
            size="small"
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
          />
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add Product
          </button>
        </div>
      </AddPopupStyled>
      <BgPopupStyled
        $showPopup={isShowPopup}
        onClick={() => setShowPopup(!isShowPopup)}
      />
    </>
  );
};

export default AddProduct;
