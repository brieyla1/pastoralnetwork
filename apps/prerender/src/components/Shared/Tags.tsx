import Head from 'next/head';
import type { FC } from 'react';

interface Props {
  title: string;
  description: string;
  image: string;
  cardType?: 'summary' | 'summary_large_image';
  schema?: any;
}

const Tags: FC<Props> = ({ title, description, image, cardType = 'summary', schema }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="UTF-8" />
      <meta property="og:url" content="https://lenster.xyz" />
      <meta property="og:site_name" content="Pastoral" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta property="twitter:card" content={cardType} />
      <meta property="twitter:site" content="Pastoral" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image:src" content={image} />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta property="twitter:creator" content="Pastoralxyz" />
      {schema ? schema : null}
    </Head>
  );
};

export default Tags;
