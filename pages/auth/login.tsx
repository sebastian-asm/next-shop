import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'
import { signIn, getSession, getProviders } from 'next-auth/react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ErrorOutline from '@mui/icons-material/ErrorOutline'

// import { AuthContext } from '../../context'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  // const { loginUser } = useContext(AuthContext)
  const [showError, setShowError] = useState(false)
  const [providers, setProviders] = useState<any>({})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    getProviders().then((provider) => setProviders(provider))
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    await signIn('credentials', { email, password })

    // alternativa sin OAuth
    // try {
    //   const isValidLogin = await loginUser(email, password);
    //   if (!isValidLogin) throw false;

    //   // si no viene definada la query en la url siempre envia al home
    //   const destination = router.query.page?.toString() || '/';
    //   router.replace(destination);
    // } catch {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    // }
  }

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
              <NextLink
                href={
                  router.query.page
                    ? `/auth/register?page=${router.query.page}`
                    : '/auth/register'
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">
                  ¿No tiene cuenta? Crear una nueva
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              {Object.values(providers).map(
                (provider: any) =>
                  provider.id !== 'credentials' && (
                    <Button
                      key={provider.id}
                      sx={{ mt: 1 }}
                      onClick={() => signIn(provider.id)}
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      {provider.name}
                    </Button>
                  )
              )}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req })
  const { page = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: page as string,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
