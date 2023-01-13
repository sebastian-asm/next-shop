import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoad, setIsImageLoad] = useState(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `/products/${product.images[1]}`
        : `/products/${product.images[0]}`,
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
        {/* prefetch: evitar que next haga una pre-carga en memoria de los enlaces */}
        <NextLink
          href={`/product/${product.slug}`}
          legacyBehavior
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="Sin stock"
                  sx={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '10px',
                    left: '10px',
                  }}
                />
              )}
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                // cuando la imagen se carga se muestra el texto
                onLoad={() => setIsImageLoad(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoad ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight="bold">{product.title}</Typography>
        <Typography>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
