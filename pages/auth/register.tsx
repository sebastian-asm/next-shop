import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AuthLayout } from '../../components/layouts';

export default function RegisterPage() {
  return (
    <AuthLayout title="Crear nueva cuenta">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" textAlign="center">
              Crear nueva cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre" variant="filled" fullWidth />
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
              Registrar
            </Button>
          </Grid>

          <Grid item xs={12} textAlign="end">
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">¿Ya tiene cuenta? Iniciar sesión</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
