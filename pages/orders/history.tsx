import NextLink from 'next/link';

import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Estado',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="Pendiente de pago" variant="outlined" />
      );
    },
  },
  {
    field: 'detail',
    headerName: 'Detalles',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Ver más</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Sebas' },
  { id: 2, paid: false, fullname: 'Belu' },
];

export default function HistoryPage() {
  return (
    <ShopLayout
      title="Historial de pedidos"
      description="Aquí estan todas sus ordenes de compras."
    >
      <Typography variant="h1" component="h1">
        Historial de pedidos
      </Typography>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
}
