'use client';

import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ArticleCardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 16px;
  border: 1px solid black;
  box-shadow: 2px 2px 10px 3px rgb(138 138 138 / 18%);
  overflow: hidden;
  padding: 5px 20px 20px 20px;

  .header {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    transform: translateX(15px);
    gap: 5px;
    margin-bottom: 10px;

    svg {
      cursor: pointer;
      transition: color 0.2s ease-in-out;
    }

    .EditIcon {
      color: #3b82f6; /* Tailwind's blue-500 */
    }

    .DeleteIcon {
      color: #ef4444; /* Tailwind's red-500 */
    }

    .EditIcon:hover {
      color: #1d4ed8; /* Tailwind's blue-700 */
    }

    .DeleteIcon:hover {
      color: #b91c1c; /* Tailwind's red-700 */
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 5 / 3;
    border-radius: 8px;
    border: 1px solid black;
    img {
      transition: all 0.2s ease-in-out;
      object-fit: cover;
    }
  }

  .card-info {
    position: relative;
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: flex-start;

    .title {
      display: -webkit-box;
      font-size: 1.6em;
      font-weight: 500;
      color: black;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: break-word;
      overflow: clip;
      transition: all 0.2s ease-out;
    }

    .category {
      color: #555;
      position: relative;
      font-size: 1.2em;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Limit to 2 lines */
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: break-word;
      overflow: clip;
      text-overflow: ellipsis;
    }

    .id {
      position: relative;
      font-size: 0.8em;
      font-weight: 300;
    }
  }

  .amount {
    align-self: center;
    font-size: 2.4em;
    font-weight: 700;
  }

  .update-date {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 0.8rem;
    padding: 0 10px 5px 0;
    font-weight: 400;
    justify-self: flex-end;
    align-self: flex-end;
    opacity: 0.5;
    transition: all 0.2s ease-out;
  }
`;

const AddPopupStyled = styled.div<{
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
          transform: scale(100);
        `
      : css`
          transform: scale(0);
        `}
`;

const ProductCard = ({ data }: any) => {
  dayjs.extend(relativeTime);
  const [isShowPopup, setShowPopup] = useState(false);
  return (
    <ArticleCardStyle>
      <div className="header">
        <EditIcon
          className="EditIcon"
          onClick={() => setShowPopup(!isShowPopup)}
        />
        <DeleteIcon
          className="DeleteIcon"
          onClick={() => setShowPopup(!isShowPopup)}
        />
      </div>
      <div className="img-container">
        <Image
          src={data.imageUrl || '/logo.png'}
          alt="article image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="card-info">
        <div className="title">{data.title || ''}</div>
        {data.category ? <div className="category">{data.category}</div> : null}
        {data.id ? <div className="id">{data.id}</div> : null}
      </div>
      <div className="amount">
        {data.amount ? <div>{data.amount}</div> : null}
      </div>
      <div className="update-date">{dayjs(data.updateDate).fromNow()}</div>
      <AddPopupStyled $showPopup={isShowPopup} />
      <BgPopupStyled
        $showPopup={isShowPopup}
        onClick={() => setShowPopup(!isShowPopup)}
      />
    </ArticleCardStyle>
  );
};

export default ProductCard;
