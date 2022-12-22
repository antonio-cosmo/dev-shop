import type { AppProps } from 'next/app';
import { Container, Header } from '../styles/pages/app';

import { globalStyles } from '../styles/global';
import Image from 'next/image';

import logoImg from '../assets/logo.svg';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <div>
          <Image src={logoImg} alt='' /> <span>Dev.Shop</span>
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>

  )
}
