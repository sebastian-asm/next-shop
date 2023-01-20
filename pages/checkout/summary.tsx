import { useContext } from 'react';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { countries } from '../../utils';
import { ShopLayout } from '../../components/layouts';

export default function SummaryPage() {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  if (!shippingAddress) return;

  const {
    firstName,
    lastName,
    address,
    zipcode,
    city,
    country,
    phone,
  } = shippingAddress;

  return (
    <ShopLayout
      title="Resumen de compra"
      description="Resumen de la orden de compra."
    >
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Resumen de compra
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5">
                Resumen ({numberOfItems} {numberOfItems > 1 ? 'items' : 'item'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box textAlign="end" sx={{ my: 1 }}>
                <NextLink href="/checkout/address" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>{address}</Typography>
              <Typography>{zipcode}</Typography>
              <Typography>
                {city}, {countries.find(({ code }) => code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />
              <Box textAlign="end" sx={{ my: 1 }}>
                <NextLink href="/cart" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}
