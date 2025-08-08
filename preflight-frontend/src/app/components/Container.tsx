'use client';

import styled from 'styled-components';

const ContainerStyled = styled.div<{
  $width: string | null;
}>`
  position: relative;
  ${({ $width }) => $width && `width: ${$width || '100%'}`};
  max-width: 100%;
  padding: 0 20px;
`;

type ContainerProps = {
  width?: string;
  children: React.ReactNode;
};

export default function Container({ width, children }: ContainerProps) {
  return <ContainerStyled $width={width || null}>{children}</ContainerStyled>;
}
