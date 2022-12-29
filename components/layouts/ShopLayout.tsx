import { FC } from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  imgFullUrl?: string;
  children: JSX.Element | JSX.Element[];
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  description,
  imgFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {imgFullUrl && <meta name="og:image" content={imgFullUrl} />}
      </Head>

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px',
        }}
      >
        {children}
      </main>
    </>
  );
};
