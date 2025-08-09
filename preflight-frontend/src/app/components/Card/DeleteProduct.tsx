'use client';

import styled from 'styled-components';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';
import { del } from '../../lib/api'; // ⬅️ new lowercase helper
import { mutate as swrMutate } from 'swr';

const DeletePopupStyled = styled.div<{ $showPopup: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ $showPopup }) =>
    $showPopup
        ? 'translate(-50%, -50%) translateY(0)'
        : 'translate(-50%, -50%) translateY(-1000px)'};
  height: auto;
  max-width: 700px;
  width: 90%;
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

interface ProductData {
    id: string;
    title: string;
    image?: string;
    amount?: number; // may be 0
}

interface DeleteProductProps {
    product: ProductData;
    onProductDeleted?: (deletedProductId: string) => void;
}

const DeleteProduct = ({ product, onProductDeleted }: DeleteProductProps) => {
    const [isShowPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteProduct = async () => {
        setIsLoading(true);
        try {
            // Optimistic remove from SWR cache
            await swrMutate(
                '/stock',
                (current: any[] | undefined) => (current ?? []).filter((p) => p.id !== product.id),
                false
            );

            // Call backend: DELETE /stock  with { id }
            await del<{ msg: string; data: { id: string } }>('/stock', { id: product.id });

            // Confirm by revalidating
            await swrMutate('/stock');

            setShowPopup(false);
            onProductDeleted?.(product.id);
            console.log('Product deleted successfully:', product.id);
        } catch (error) {
            console.error('Error deleting product:', error);
            // rollback by revalidating
            await swrMutate('/stock');
            alert('Failed to delete product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (!isLoading) setShowPopup(false);
    };

    const handleClosePopup = () => {
        if (!isLoading) setShowPopup(false);
    };

    return (
        <>
            <div
                className="group border-2 border-red-500 py-2.5 button hover:bg-red-500 transition"
                onClick={isShowPopup ? undefined : () => setShowPopup(true)}
                style={{
                    pointerEvents: isShowPopup ? 'none' : 'auto',
                    cursor: isShowPopup ? 'not-allowed' : 'pointer',
                    opacity: isShowPopup ? 0.5 : 1,
                }}
            >
                <DeleteIcon className="text-red-500 group-hover:text-white transition-colors" />
            </div>

            <DeletePopupStyled $showPopup={isShowPopup}>
                <div className="flex flex-col gap-4 p-6 w-full bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 self-center text-center">
                        Delete Product
                    </h2>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-gray-600 text-center mb-2">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="text-center">
                            <p className="font-semibold text-gray-800">{product.title}</p>
                            <p className="text-sm text-gray-500">ID: {product.id}</p>
                            {product.amount !== undefined && (
                                <p className="text-sm text-gray-500">Amount: {product.amount}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm text-center">
                            <strong>Warning:</strong> This action cannot be undone. The product will be permanently deleted.
                        </p>
                    </div>

                    <div className="flex w-full items-center justify-center gap-2.5">
                        <button
                            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            onClick={handleDeleteProduct}
                            disabled={isLoading}
                        >
                            {isLoading && <CircularProgress size={16} color="inherit" />}
                            {isLoading ? 'Deleting...' : 'Yes, Delete Product'}
                        </button>

                        <button
                            className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </DeletePopupStyled>

            <BgPopupStyled $showPopup={isShowPopup} onClick={handleClosePopup} />
        </>
    );
};

export default DeleteProduct;
