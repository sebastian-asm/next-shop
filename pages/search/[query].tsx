import { GetServerSideProps } from 'next';

import Typography from '@mui/material/Typography';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { ProductList } from '../../components/products';
import { ShopLayout } from '../../components/layouts';

interface Props {
  products: IProduct[];
  productsFound: boolean;
  query: string;
}

export default function SearchPage({ products, query, productsFound }: Props) {
  return (
    <ShopLayout
      title="Next Shop | Búsqueda"
      description="Listado de todos los producto según su búsqueda."
    >
      <Typography variant="h1" component="h1">
        Next Shop
      </Typography>

      {productsFound ? (
        <Typography variant="h2" sx={{ mb: 4 }}>
          Productos encontrados para <strong>{query}</strong>
        </Typography>
      ) : (
        <Typography variant="h2" sx={{ mb: 4 }}>
          No tenemos resultados para <strong>{query}</strong>, te recomendamos
          los siguientes productos
        </Typography>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByQuery(query);
  const productsFound = products.length > 0;

  if (!productsFound) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      query,
      productsFound,
    },
  };
};
