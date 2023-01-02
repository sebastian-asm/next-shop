import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AuthLayout } from '../../components/layouts';

export default function LoginPage() {
  return (
    <AuthLayout title="Iniciar sesión">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" textAlign="center">
              Iniciar sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} textAlign="end">
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link underline="always">¿No tiene cuenta? Crear una nueva</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
