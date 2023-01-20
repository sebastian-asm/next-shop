import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

export default function CartPage() {
  const router = useRouter();
  const { isLoaded, numberOfItems } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, numberOfItems]);

  // evitar renderizar cualquier si el carrito esta vacío
  if (!isLoaded || numberOfItems === 0) return <></>;

  return (
    <ShopLayout
      title="Carrito de compra"
      description="Todos los productos que están listo para adquirir."
    >
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Carrito de compra
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5">Pedido</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  href="/checkout/address"
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                >
                  Comprar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}
