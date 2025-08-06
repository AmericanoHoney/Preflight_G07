'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { POST } from '@/app/lib/api';

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
  z-index: ${({ $showPopup }) => ($showPopup ? 500 : -1)};
  transform: ${({ $showPopup }) => ($showPopup ? 'scale(100)' : 'scale(0)')};
`;

interface ProductFormData {
  productImage: string;
  productTitle: string;
  productId: string;
  amount: number;
}

const AddProduct = () => {
  const [isShowPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    productImage: '',
    productTitle: '',
    productId: '',
    amount: 0,
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : value, // 🔧 แปลงเป็น number
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<any> = {};

    if (!formData.productTitle.trim()) {
      newErrors.productTitle = 'Product title is required';
    }

    if (!formData.productId.trim()) {
      newErrors.productId = 'Product ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Call your POST API
      const response = await POST('/products', {
        image: formData.productImage,
        title: formData.productTitle,
        id: formData.productId,
        amount: formData.amount,
      });

      // Success - reset form and close popup
      setFormData({
        productImage: '',
        productTitle: '',
        productId: '',
        amount: 0,
      });
      setShowPopup(false);
      console.log('Product added successfully:', response);
    } catch (error) {
      console.error('Error adding product:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    if (!isLoading) {
      setShowPopup(false);
      setErrors({});
    }
  };

  return (
    <>
      <div
        className="bg-gray-300 px-5 py-2.5 w-full h-full button"
        onClick={isShowPopup ? undefined : () => setShowPopup(true)}
        style={{
          pointerEvents: isShowPopup ? 'none' : 'auto',
          cursor: isShowPopup ? 'not-allowed' : 'pointer',
          opacity: isShowPopup ? 0.5 : 1,
        }}
      >
        <div className="w-full flex justify-center gap-1">
          <div className="flex flex-row items-center font-medium">ADD</div>
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
            label="Product Image"
            variant="outlined"
            fullWidth
            value={formData.productImage}
            onChange={(e) => handleInputChange('productImage', e.target.value)}
            placeholder="Enter image URL"
            disabled={isLoading}
          />
          <TextField
            size="small"
            label="Product Title"
            variant="outlined"
            fullWidth
            value={formData.productTitle}
            onChange={(e) => handleInputChange('productTitle', e.target.value)}
            error={!!errors.productTitle}
            helperText={errors.productTitle}
            disabled={isLoading}
            required
          />
          <TextField
            size="small"
            label="Product ID"
            variant="outlined"
            fullWidth
            value={formData.productId}
            onChange={(e) => handleInputChange('productId', e.target.value)}
            error={!!errors.productId}
            helperText={errors.productId}
            disabled={isLoading}
            required
          />
          <TextField
            size="small"
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={formData.amount}
            onChange={(e) =>
              handleInputChange('amount', parseFloat(e.target.value) || 0)
            }
            error={!!errors.amount}
            helperText={errors.amount}
            disabled={isLoading}
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
    </>
  );
};

export default AddProduct;
