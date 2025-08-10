'use client';

import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Backdrop = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export default function LoadingOverlay({
  show,
  message,
}: {
  show: boolean;
  message?: string;
}) {
  return (
    <Backdrop $show={show}>
      <div className="flex flex-col items-center gap-3 bg-white/90 px-6 py-5 rounded-xl shadow">
        <CircularProgress />
        {message && <div className="text-sm text-gray-700">{message}</div>}
      </div>
    </Backdrop>
  );
}