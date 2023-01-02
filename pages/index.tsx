import Typography from '@mui/material/Typography';

import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { ShopLayout } from '../components/layouts';

export default function Home() {
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

      <ProductList products={initialData.products} />
    </ShopLayout>
  );
}
