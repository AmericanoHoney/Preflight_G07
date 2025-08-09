'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, TextField } from '@mui/material';
import { patch } from '../../lib/api';
import {StockItem} from "../../../types/stock"; // ⬅️ new helper (lowercase)

const EditPopupStyled = styled.div<{ $showPopup: boolean }>`
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

interface EditProductProps {
    data: StockItem;
    onProductUpdated?: (updatedProduct: StockItem) => void;
}

const EditProduct = ({ data, onProductUpdated }: EditProductProps) => {
    const [isShowPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<StockItem>({
        id: '',
        imageUrl: '',
        title: '',
        productid: '',
        category: '',
        amount: 0,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof StockItem, string>>>({});
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id,
                imageUrl: data.imageUrl || '',
                title: data.title || '',
                productid: data.productid || '',
                category: data.category || '',
                amount: Number.isFinite(data.amount) ? data.amount : 0,
            });
            setHasChanges(false);
        }
    }, [data, isShowPopup]);

    const handleInputChange = (field: keyof StockItem, value: string | number) => {
        const safeValue =
            field === 'amount'
                ? Number.isFinite(Number(value)) ? Number(value) : 0
                : (value as string);

        const newFormData = { ...formData, [field]: safeValue } as StockItem;
        setFormData(newFormData);

        setHasChanges(
            newFormData.title !== data.title ||
            newFormData.imageUrl !== data.imageUrl ||
            newFormData.category !== data.category ||
            newFormData.productid !== data.productid ||
            newFormData.amount !== data.amount
        );

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof StockItem, string>> = {};

        if (!formData.title.trim()) newErrors.title = 'Product title is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (formData.amount < 0) newErrors.amount = 'Amount must be 0 or greater';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Calls your backend PATCH /stock
    async function updateProductInStock(productData: StockItem) {
        // backend returns: { msg: string; data: ProductData }
        return patch<{ msg: string; data: StockItem }>('/stock', productData);
    }

    const handleUpdateProduct = async () => {
        if (!validateForm()) return;
        if (!hasChanges) {
            setShowPopup(false);
            return;
        }

        setIsLoading(true);
        try {
            const result = await updateProductInStock(formData);

            setShowPopup(false);
            setHasChanges(false);

            onProductUpdated?.(result.data);

            // If you use SWR for /stock elsewhere, uncomment to refresh list:
            // import { mutate as swrMutate } from 'swr';
            // await swrMutate('/stock');

            console.log('Product updated successfully:', result);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
            alert(error instanceof Error ? `Failed to update product: ${error.message}` : 'Failed to update product.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (hasChanges) {
            const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
            if (!confirmCancel) return;
        }
        setFormData({
            id: data.id,
            imageUrl: data.imageUrl || '',
            title: data.title || '',
            productid: data.productid || '',
            category: data.category || '',
            amount: Number.isFinite(data.amount) ? data.amount : 0,
        });
        setErrors({});
        setHasChanges(false);
        setShowPopup(false);
    };

    const handleClosePopup = () => {
        if (!isLoading) handleCancel();
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Product Details</h2>

                    <TextField
                        size="small"
                        label="Product Image URL"
                        variant="outlined"
                        fullWidth
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
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
                        value={formData.productid}
                        onChange={(e) => handleInputChange('productid', e.target.value)}
                        error={!!errors.productid}
                        helperText={errors.productid}
                        disabled={isLoading}
                    />

                    <TextField
                        size="small"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        error={!!errors.category}
                        helperText={errors.category}
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
                        onChange={(e) => handleInputChange('amount', e.target.value)}
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
                                hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'
                            }`}
                            onClick={handleUpdateProduct}
                            disabled={isLoading}
                        >
                            {isLoading && <CircularProgress size={16} color="inherit" />}
                            {isLoading ? 'Updating...' : hasChanges ? 'Save Changes' : 'No Changes'}
                        </button>
                    </div>
                </div>
            </EditPopupStyled>

            <BgPopupStyled $showPopup={isShowPopup} onClick={handleClosePopup} />
        </>
    );
};

export default EditProduct;
