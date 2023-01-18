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
  name: string;
};

export default function RegisterPage() {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async (formData: FormData) => {
    setShowError(false);
    try {
      const { data } = await shopApi.post('/user/register', formData);
      console.log({ data });
    } catch (error) {
      console.log(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <AuthLayout title="Crear nueva cuenta">
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Crear nueva cuenta
              </Typography>
              <Chip
                label="Hubo un error al crear la cuenta"
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
                {...register('name', {
                  required: 'El nombre es necesario',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                type="text"
                label="Nombre"
                variant="filled"
                fullWidth
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
      </form>
    </AuthLayout>
  );
}
