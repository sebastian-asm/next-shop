import Typography from '@mui/material/Typography';

import { ProductList } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '../../hooks';
import { FullLoading } from '../../components/ui';

export default function MenPage() {
  const { data: products, error, isLoading } = useProducts(
    '/products?gender=men'
  );

  if (error) return <div>Error al obtener los productos</div>;
  if (isLoading) return <FullLoading />;

  return (
    <ShopLayout
      title="Next Shop | Sección Hombres"
      description="Página con todos nuestros productos para hombres."
    >
      <Typography variant="h1" component="h1">
        Next Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Productos para <strong>hombres</strong>
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
}
