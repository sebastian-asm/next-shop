import { FC } from 'react';
import Head from 'next/head';

import Box from '@mui/material/Box';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 160px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
