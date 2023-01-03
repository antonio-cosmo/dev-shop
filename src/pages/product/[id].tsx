import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
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
  }
}
export default function Product({product}: ProductProps){

  return(
     <ProductContainer>

      <ImageContainer>
          <Image src={product.imageURL} width={520} height={480} alt=''/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores aliquid rerum exercitationem facere a molestiae ut sed velit non mollitia? Officiis hic velit assumenda aspernatur nihil, sint sed laboriosam tempora?</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>

    </ProductContainer>
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
    description: response.description
  };
  return{
    props:{
      product
    },
    revalidate: 60 * 60 * 24 // validade de 24h
  }
}