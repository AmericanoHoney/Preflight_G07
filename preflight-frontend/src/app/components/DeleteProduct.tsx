'use client';

import styled, { css } from 'styled-components';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePopupStyled = styled.div<{
  $showPopup: boolean;
}>`
  position: fixed;
  top: calc(50vh - 300px);
  right: calc(50vw - 250px);
  width: 500px;
  height: 600px;
  background: white;
  border-radius: 16px;
  border: solid 1px black;
  transition: 0.3s;
  ${({ $showPopup }) =>
    $showPopup
      ? css`
          z-index: 1000;
          transform: translateY(0);
        `
      : css`
          z-index: -1;
          transform: translateY(-1000px);
        `}
  .input-box {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px;
    .box {
      position: relative;
      display: flex;
      border: solid 1px #ccc;
      padding: 5px;
      align-items: center;
      border-radius: 16px;
      flex: 1;
      height: 1rem;
    }
  }
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
          z-index: -1;
          transform: scale(0);
        `}
`;

const DeleteProduct = () => {
  const [isShowPopup, setShowPopup] = useState(false);
  return (
    <>
      <div
        className="bg-red-500 py-2.5 button"
        onClick={isShowPopup ? undefined : () => setShowPopup(true)}
        style={{
          pointerEvents: isShowPopup ? 'none' : 'auto',
          cursor: isShowPopup ? 'not-allowed' : 'pointer',
          opacity: isShowPopup ? 0.5 : 1,
        }}
      >
        <DeleteIcon
          style={{
            color: 'white',
          }}
        />
      </div>
      <DeletePopupStyled $showPopup={isShowPopup}>
        <p className="font-bold text-5xl">Add product</p>
        <div className="input-box">
          <Box className="box">
            <Input
              className="inputField"
              disableUnderline={true}
              placeholder="กรอกชื่อสินค้า"
            />
          </Box>
          <Box className="box">
            <Input
              className="inputField"
              disableUnderline={true}
              placeholder="กรอกประดภทสินค้า"
            />
          </Box>
          <Box className="box">
            <Input
              className="inputField"
              disableUnderline={true}
              placeholder="กรอกรหสสินค้า"
            />
          </Box>
        </div>
      </DeletePopupStyled>
      <BgPopupStyled
        $showPopup={isShowPopup}
        onClick={() => setShowPopup(!isShowPopup)}
      />
    </>
  );
};

export default DeleteProduct;
