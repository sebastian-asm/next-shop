import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

import { UiContext } from '../../context';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const activeLink = (href: string) => (asPath === href ? 'primary' : 'info');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" legacyBehavior passHref>
          <Link>
            <Typography variant="h6">Next Shop</Typography>
          </Link>
        </NextLink>

        <Box flex="1" />

        <Box
          sx={{ display: searchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className="fadeIn"
        >
          <NextLink href="/category/men" legacyBehavior>
            <Link>
              <Button color={activeLink('/category/men')}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" legacyBehavior>
            <Link>
              <Button color={activeLink('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" legacyBehavior>
            <Link>
              <Button color={activeLink('/category/kid')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex="1" />

        {/* desktop */}
        {searchVisible ? (
          <Input
            autoFocus
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            onKeyPress={({ key }) => key === 'Enter' && onSearchTerm()}
            type="text"
            placeholder="Buscar..."
            className="fadeIn"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchVisible(false)}>
                  <Close />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* mobile */}
        <IconButton
          onClick={toggleSideMenu}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
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

        <Button onClick={toggleSideMenu} sx={{ marginLeft: '10px' }}>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
