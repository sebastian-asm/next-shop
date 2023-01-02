import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import RemoveShoppingCartOutlined from '@mui/icons-material/RemoveShoppingCartOutlined';

import { ShopLayout } from '../../components/layouts';

export default function EmptyCart() {
  return (
    <ShopLayout
      title="Carrito vacío"
      description="Aún no tiene productos agregados al carrito de compra."
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 160px)"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <RemoveShoppingCartOutlined sx={{ fontSize: 100, mb: 2 }} />
          <Typography textAlign="center">
            Su carrito de compra aún está vacío.
          </Typography>
          <NextLink href="/" legacyBehavior passHref>
            <Link color="secondary" mt={2}>
              Volver al inicio
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
}
