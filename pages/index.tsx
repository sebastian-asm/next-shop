import Typography from '@mui/material/Typography';

import { ProductList } from '../components/products';
import { ShopLayout } from '../components/layouts';
import { useProducts } from '../hooks';
import { FullLoading } from '../components/ui';

export default function Home() {
  const { data: products, error, isLoading } = useProducts('/products');

  if (error) return <div>Error al obtener los productos</div>;
  if (isLoading) return <FullLoading />;

  return (
    <ShopLayout
      title="Next Shop | Inicio"
      description="Página de inicio con todos nuestros productos oficiales."
    >
      <Typography variant="h1" component="h1">
        Next Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Todos los productos
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
}
