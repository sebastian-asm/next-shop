import { FC, useMemo, useState } from 'react';

// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardMedia,
//   Grid,
//   Typography,
// } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `products/${product.images[1]}`
        : `products/${product.images[0]}`,
    [isHovered, product.images]
  );

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={productImage}
            alt={product.title}
            className="fadeIn"
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight="bold">{product.title}</Typography>
        <Typography>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
