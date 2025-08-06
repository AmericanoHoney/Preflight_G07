'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, TextField } from '@mui/material';
import { PUT } from '@/app/lib/api';

const EditPopupStyled = styled.div<{
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

interface ProductData {
  id: string;
  title: string;
  image: string;
  amount: number;
  imageUrl?: string;
}

interface EditProductProps {
  data: ProductData;
  onProductUpdated?: (updatedProduct: ProductData) => void;
}

const EditProduct = ({ data, onProductUpdated }: EditProductProps) => {
  const [isShowPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductData>({
    id: '',
    title: '',
    image: '',
    amount: 0,
  });
  const [errors, setErrors] = useState<Partial<ProductData>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || '',
        title: data.title || '',
        image: data.image || '',
        amount: data.amount || 0,
        imageUrl: data.imageUrl,
      });
      setHasChanges(false);
    }
  }, [data, isShowPopup]);

  const handleInputChange = (
    field: keyof ProductData,
    value: string | number
  ) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(newFormData);

    // Check if there are changes compared to original data
    setHasChanges(
      newFormData.title !== data.title ||
        newFormData.image !== data.image ||
        newFormData.amount !== data.amount ||
        newFormData.id !== data.id
    );

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<any> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    }

    if (!formData.id.trim()) {
      newErrors.id = 'Product ID is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProduct = async () => {
    if (!validateForm()) return;
    if (!hasChanges) {
      setShowPopup(false);
      return;
    }

    setIsLoading(true);
    try {
      // Call your PUT API - typically uses the product ID in the URL
      const response = await PUT(`/products/${data.id}`, {
        id: formData.id,
        title: formData.title,
        image: formData.image,
        amount: formData.amount,
      });

      // Success - close popup and notify parent
      setShowPopup(false);
      setHasChanges(false);

      // Call callback to update parent component
      onProductUpdated?.(response);

      console.log('Product updated successfully:', response);
    } catch (error) {
      console.error('Error updating product:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      );
      if (!confirmCancel) return;
    }

    // Reset form to original data
    setFormData({
      id: data.id || '',
      title: data.title || '',
      image: data.image || '',
      amount: data.amount || 0,
      imageUrl: data.imageUrl,
    });
    setErrors({});
    setHasChanges(false);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    if (!isLoading) {
      handleCancel();
    }
  };

  return (
    <>
      <div
        className="group bg-blue-500 py-2.5 button hover:bg-white transition"
        onClick={isShowPopup ? undefined : () => setShowPopup(true)}
        style={{
          pointerEvents: isShowPopup ? 'none' : 'auto',
          cursor: isShowPopup ? 'not-allowed' : 'pointer',
          opacity: isShowPopup ? 0.5 : 1,
        }}
      >
        <EditIcon className="text-white group-hover:text-blue-500 transition-colors" />
      </div>
      <EditPopupStyled $showPopup={isShowPopup}>
        <div className="flex flex-col gap-4 p-6 w-full bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Edit Product Details
          </h2>
          <TextField
            size="small"
            label="Product Image"
            variant={data.imageUrl ? 'filled' : 'outlined'}
            fullWidth
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="Enter image URL"
            disabled={isLoading}
          />
          <TextField
            size="small"
            label="Product Title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            disabled={isLoading}
            required
          />
          <TextField
            size="small"
            label="Product ID"
            variant="outlined"
            fullWidth
            value={formData.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
            error={!!errors.id}
            helperText={errors.id}
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
            required
          />
          <div className="flex w-full items-center justify-center gap-2.5">
            <button
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              className={`w-full mt-4 px-4 py-2 text-white rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                hasChanges
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
              onClick={handleUpdateProduct}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress size={16} color="inherit" />}
              {isLoading
                ? 'Updating...'
                : hasChanges
                ? 'Save Changes'
                : 'No Changes'}
            </button>
          </div>
        </div>
      </EditPopupStyled>
      <BgPopupStyled $showPopup={isShowPopup} onClick={handleClosePopup} />
    </>
  );
};

export default EditProduct;
