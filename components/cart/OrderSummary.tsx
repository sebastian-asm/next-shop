import { useContext } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CartContext } from '../../context';
import { currency } from '../../utils';

export const OrderSummary = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);
  const valueTax = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Cantidad de productos:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">{numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({valueTax}%):</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
