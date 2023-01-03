import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from 'stripe'
import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import {priceFormated} from '../util/price'
import { useKeenSlider } from 'keen-slider/react' 
import 'keen-slider/keen-slider.min.css'

interface HomeProps{
  products: {
    id: string,
    name: string,
    imageURL: string,
    price: number
  }[]
}
export default function Home({products}:HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map(product =>{
          return (
            <Link href={`/product/${product.id}`} prefetch={false} key={product.id}>
              <Product  className="keen-slider__slide">
                <Image src={product.imageURL} width={520} height={480} alt="" />
              
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price }</span>
                </footer>
              </Product>
            </Link>
          )
        })
      }
    </HomeContainer>
  )
}

export const getStaticProps:GetStaticProps = async ()=>{
  const response = await stripe.products.list({
    expand:['data.default_price']
  });
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const priceAmount = price.unit_amount as number;

    return {
      id: product.id,
      name:product.name,
      imageURL: product.images[0],
      price: priceFormated(priceAmount / 100),
    }
  });

  return {
    props:{ 
      products
    },
    revalidate: 60 * 60 * 24 // validade de 24h
  }
}