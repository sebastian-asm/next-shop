import { useState } from 'react';
import NextLink from 'next/link';

import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ErrorOutline from '@mui/icons-material/ErrorOutline';

import { AuthLayout } from '../../components/layouts';
import { shopApi } from '../../api';
import { validations } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await shopApi.post('/user/login', { email, password });
      // const { token, user } = data;
      console.log({ data });
    } catch (error) {
      console.log(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Iniciar sesión
              </Typography>
              <Chip
                label="Los datos de acceso no son válidos"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{
                  mt: 1,
                  width: '100%',
                  display: showError ? 'flex' : 'none',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'El email es necesario',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email"
                label="Email"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'La contraseña es necesaria',
                  minLength: {
                    value: 4,
                    message: 'Mínimo 4 carácteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
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
                <Link underline="always">
                  ¿No tiene cuenta? Crear una nueva
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}
