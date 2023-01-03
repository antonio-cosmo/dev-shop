import type { AppProps } from 'next/app';
import { Container, Header } from '../styles/pages/app';

import { globalStyles } from '../styles/global';
import Image from 'next/image';

import logoImg from '../assets/logo.svg';
import Link from 'next/link';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href='/'>
          <div>
              <Image src={logoImg} alt='' /> <span>Dev.Shop</span>
          </div>
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>

  )
}
