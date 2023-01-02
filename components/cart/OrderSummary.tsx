import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Cantidad de productos:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">$123</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (19%):</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography fontWeight="bold">$321</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">$444</Typography>
      </Grid>
    </Grid>
  );
};
