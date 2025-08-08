import { IBM_Plex_Sans_Thai } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import StyledComponentsRegistry from '@/app/lib/registry';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/styles/theme';
import Main from '@/app/components/Main';
import './globals.css';

// Load the font properly
const ibmThai = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={ibmThai.className}>
      <body>
        <AppRouterCacheProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              {/* <Navbar /> */}
              <Main>{children}</Main>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
