import imageProxy from '@lib/imageProxy';
import { COVER } from 'data/constants';
import type { FC } from 'react';
import getIPFSLink from 'utils/getIPFSLink';

interface Props {
  cover: string;
}

const Cover: FC<Props> = ({ cover }) => {
  return (
    <div
      className="text-brand-400 h-52 sm:h-80"
      style={{
        backgroundImage: `url(${
          cover ? imageProxy(getIPFSLink(cover), COVER) : `url("public/assets/img/default-background.svg")`
        })`,
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  );
};

export default Cover;
