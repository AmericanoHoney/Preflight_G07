'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { put } from '../../lib/api';
import { mutate as swrMutate } from 'swr';
import LoadingOverlay from '../LoadingOverlay'; // ⬅️ add this

const AddPopupStyled = styled.div<{ $showPopup: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ $showPopup }) =>
    $showPopup
      ? 'translate(-50%, -50%) translateY(0)'
      : 'translate(-50%, -50%) translateY(-1000px)'};
  height: auto;
  width: 90%;
  max-width: 500px;
  transition: transform 0.3s ease;
  z-index: ${({ $showPopup }) => ($showPopup ? 1000 : -1)};
`;

const BgPopupStyled = styled.div<{ $showPopup: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(90, 90, 90, 0.43);
  z-index: ${({ $showPopup }) => ($showPopup ? 500 : -1)};
  transform: ${({ $showPopup }) => ($showPopup ? 'scale(100)' : 'scale(0)')};
`;

type StockFormData = {
  imageUrl: string;
  title: string;
  productid: string;
  category: string;
  amount: number;
};

interface AddProductProps {
  onProductAdded?: () => void;
}

const AddProduct = ({ onProductAdded }: AddProductProps) => {
  const [isShowPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StockFormData>({
    imageUrl: '',
    title: '',
    productid: '',
    category: '',
    amount: 0,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof StockFormData, string>>
  >({});

  const handleInputChange = (
    field: keyof StockFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : (value as string),
    }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Simple inline validator to replace validateStockData
  const validateForm = (): boolean => {
    const e: Partial<Record<keyof StockFormData, string>> = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.category.trim()) e.category = 'Category is required';
    if (!formData.productid.trim()) e.productid = 'ProductId is required';
    if (!Number.isFinite(formData.amount) || formData.amount < 0)
      e.amount = 'Amount must be 0 or greater';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Calls backend: PUT /stock  -> { msg, data }
  async function addStockItem(input: StockFormData) {
    return put<{ msg: string; data: any }>('/stock', input);
  }

  const handleAddProduct = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await addStockItem(formData);

      // Optimistic update: insert the new item into the SWR cache immediately
      await swrMutate(
        '/stock',
        (current: any[] | undefined) => [result.data, ...(current ?? [])],
        false // don't revalidate yet
      );
      // Then revalidate to confirm with server
      await swrMutate('/stock');

      // reset + close
      setFormData({
        imageUrl: '',
        title: '',
        productid: '',
        category: '',
        amount: 0,
      });
      setShowPopup(false);

      onProductAdded?.(); // optional
      // eslint-disable-next-line no-alert
      alert(
        `Product "${result.data?.title ?? formData.title}" added successfully!`
      );
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-alert
      alert(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    if (isLoading) return;
    setShowPopup(false);
    setErrors({});
    // Optionally reset form here as well
    // setFormData({ imageUrl: '', title: '', productid: '', category: '', amount: 0 });
  };

  const handleOpenPopup = () => {
    if (isShowPopup) return;
    setShowPopup(true);
    setErrors({});
  };

  return (
    <>
      <div
        className="bg-gray-300 border-2 border-gray-300 px-5 py-2.5 h-full max-w-[150px] button"
        onClick={handleOpenPopup}
        style={{
          pointerEvents: isShowPopup ? 'none' : 'auto',
          cursor: isShowPopup ? 'not-allowed' : 'pointer',
          opacity: isShowPopup ? 0.5 : 1,
        }}
      >
        <div className="flex justify-center gap-1">
          <div className="flex flex-row items-center font-medium">ADD</div>
          <AddIcon style={{ fontSize: 20 }} />
        </div>
      </div>

      <AddPopupStyled $showPopup={isShowPopup}>
        <div className="flex flex-col gap-4 p-6 w-full bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Add Product
          </h2>

          <TextField
            size="small"
            label="Product Image URL"
            variant="outlined"
            fullWidth
            value={formData.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            placeholder="Enter image URL (optional)"
            disabled={isLoading}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />

          <TextField
            size="small"
            label="Product Title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title || 'Required field'}
            disabled={isLoading}
            required
            placeholder="Enter product title"
          />

          <TextField
            size="small"
            label="Product ID"
            variant="outlined"
            fullWidth
            value={formData.productid}
            onChange={(e) => handleInputChange('productid', e.target.value)}
            disabled={isLoading}
            error={!!errors.productid}
            helperText={errors.productid || 'Required field'}
            required
            placeholder="Enter product ID (optional)"
          />

          <TextField
            size="small"
            label="Category"
            variant="outlined"
            fullWidth
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            error={!!errors.category}
            helperText={errors.category || 'Required field'}
            disabled={isLoading}
            required
            placeholder="Enter product category"
          />

          <TextField
            size="small"
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            error={!!errors.amount}
            helperText={
              errors.amount || 'Required field - must be 0 or greater'
            }
            disabled={isLoading}
            required
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min: 0,
            }}
            placeholder="Enter quantity"
          />

          <div className="flex w-full items-center justify-center gap-2.5">
            <button
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleAddProduct}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress size={16} color="inherit" />}
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>

            <button
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleClosePopup}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </AddPopupStyled>
      <BgPopupStyled $showPopup={isShowPopup} onClick={handleClosePopup} />
      <LoadingOverlay show={isLoading} message="Loading..." />
    </>
  );
};

export default AddProduct;