import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout
      title="Página no encontrada"
      description="Lamentamos no haber encontrados o no tener disponible la página que solicitada."
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 160px)"
      >
        <Typography variant="h1" sx={{ textAlign: 'center' }}>
          404 | Página no contrada
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
