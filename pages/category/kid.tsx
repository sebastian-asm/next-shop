import Typography from '@mui/material/Typography';

import { ProductList } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '../../hooks';
import { FullLoading } from '../../components/ui';

export default function KidPage() {
  const { products, error, isLoading } = useProducts('/products?gender=kid');

  if (error) return <div>Error al obtener los productos</div>;
  if (isLoading) return <FullLoading />;

  return (
    <ShopLayout
      title="Next Shop | Sección Niños"
      description="Página con todos nuestros productos para niños."
    >
      <Typography variant="h1" component="h1">
        Next Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Productos para <strong>niños</strong>
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
}
