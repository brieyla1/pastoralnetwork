import imageProxy from '@lib/imageProxy';
import { COVER, STATIC_IMAGES_URL } from 'data/constants';
import Image from 'next/image';
import type { FC } from 'react';
import getIPFSLink from 'utils/getIPFSLink';
import backgroundImage from 'public/assets/img/default-background.svg';

interface Props {
  cover: string;
}

const Cover: FC<Props> = ({ cover }) => {
  return cover && cover != `${STATIC_IMAGES_URL}/patterns/2.svg` ? (
    <div
      className="text-brand-400 h-52 sm:h-80"
      style={{
        backgroundImage: `url(${
          cover ? imageProxy(getIPFSLink(cover), COVER) : `${STATIC_IMAGES_URL}/patterns/2.svg`
        })`,
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  ) : (
    <div
      className="text-brand-400 h-52 sm:h-80"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  );
};

export default Cover;
