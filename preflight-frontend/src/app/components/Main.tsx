'use client';

import React from 'react';

type MainProps = {
  children: React.ReactNode;
};
const Main = ({ children }: MainProps) => {
  return <>{children}</>;
};

export default Main;
