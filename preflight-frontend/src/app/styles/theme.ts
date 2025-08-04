'use client';

import { createTheme } from '@mui/material/styles';

const fontFamily = 'var(--font-ibm-plex-thai), sans-serif';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily,
  },
});

export default theme;
