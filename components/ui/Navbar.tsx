import { useRouter } from 'next/router';
import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

export const Navbar = () => {
  const { asPath } = useRouter();

  const selectedPath = (path: string) => (asPath === path ? 'primary' : 'info');

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" legacyBehavior passHref>
          <Link>
            <Typography variant="h6">Next Shop</Typography>
          </Link>
        </NextLink>

        <Box flex="1" />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" legacyBehavior>
            <Link>
              <Button color={selectedPath('/category/men')}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" legacyBehavior>
            <Link>
              <Button color={selectedPath('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" legacyBehavior>
            <Link>
              <Button color={selectedPath('/category/kid')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex="1" />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent="2" color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button sx={{ marginLeft: '10px' }}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
