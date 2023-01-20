import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import NoSsr from '@mui/material/NoSsr';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CartContext } from '../../context';
import { countries } from '../../utils';
import { ShopLayout } from '../../components/layouts';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    zipcode: Cookies.get('zipcode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  };
};

export default function AddressPage() {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title="Dirección" description="Confirme su dirección de envío.">
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Dirección
      </Typography>

      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName', {
                required: 'El nombre es necesario',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              type="text"
              label="Nombre"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName', {
                required: 'El apellido es necesario',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              type="text"
              label="Apellido"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address', {
                required: 'La dirección es necesaria',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              type="text"
              label="Dirección"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('zipcode', {
                required: 'El código postal es necesario',
              })}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
              type="text"
              label="Código postal"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city', {
                required: 'La ciudad es necesaria',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              type="text"
              label="Ciudad"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <NoSsr>
                <TextField
                  {...register('country', {
                    required: 'El país es necesario',
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  defaultValue={Cookies.get('country') || ''}
                  // el key soluciona el siguiente mensaje de error:
                  // MUI: A component is changing the default value state of an uncontrolled Select after being initialized. To suppress this warning opt to use a controlled Select
                  key={Cookies.get('country') || ''}
                  variant="filled"
                  select
                >
                  {countries.map(({ name, code }) => (
                    <MenuItem value={code} key={code}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </NoSsr>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone', {
                required: 'El teléfono es necesario',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              type="text"
              label="Teléfono"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
}
