import axios from "axios";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";

import { ProductContainer, ImageContainer, ProductDetails } from "../../styles/pages/product"
import { priceFormated } from "../../util/price";

interface ProductProps{
  product: {
    id: string,
    name: string,
    imageURL: string,
    price: number,
    description: string
    defaultPriceId: string
  }
}
export default function Product({product}: ProductProps){
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const handleBuyProduct = async ()=>{
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;
      
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }
  return(
    <>
    <Head>
      <title> Produto | Dev.Shop</title>
    </Head>
      <ProductContainer>

        <ImageContainer>
            <Image src={product.imageURL} width={520} height={480} alt=''/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores aliquid rerum exercitationem facere a molestiae ut sed velit non mollitia? Officiis hic velit assumenda aspernatur nihil, sint sed laboriosam tempora?</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>

      </ProductContainer>
    </>

  )
}

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
} 
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
  const paramsId = params?.id as string;
  const response = await stripe.products.retrieve(paramsId,{
    expand:['default_price']
  });

  const price = response.default_price as Stripe.Price;
  const priceAmount = price.unit_amount as number;

  const product = {
    id: response.id,
    name:response.name,
    imageURL: response.images[0],
    price: priceFormated(priceAmount / 100),
    description: response.description,
    defaultPriceId: price.id
  };
  return{
    props:{
      product
    },
    revalidate: 60 * 60 * 24 // validade de 24h
  }
}