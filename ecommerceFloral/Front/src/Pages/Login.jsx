import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from "yup";
import {
  Button,
  TextField,
  useMediaQuery,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "../components/footer";

import { logIn } from '../state/actions/user';

import { Link } from 'react-router-dom';
//-------------------- Assets --------------------------
import imageLogin from "../assets/12.png"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.todofloral.com/">
        TodoFloral
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const initialValuesLogin = {
  email: '',
  password: '',
}


const loginSchema = Yup.object().shape({
  email: Yup.string().email('mail inválido').required('Debes colocar un email'),
  password: Yup.string().required('Debes colocar la contraseña')
})



export function LogInForm() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const loginFont = theme.palette.primary.loginFont
  const logininput = theme.palette.background.logininput
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleFormSubmit = (values) => {
    setLoading(true)
    const data = new FormData();
    for (let value in values) {
      data.append(value, values[value])
    }
    let email = data.get('email')
    let password = data.get('password')

    dispatch(logIn({ email, password }))

    setTimeout(() => {
      setLoading(false)
    }, 2000);
  };

  return (
    <div>
      <Grid container component="main" sx={{ alignItems: "center", background: "rgb(230,230,230)", height: matches ? "" : "100%", width: "100%", pb: "1rem", minHeight:"69.4vh" }}>
        <Grid item
          md={7}
          sx={{
            display: { xs: "none", md: "flex", sm: "none" },
            justifyContent: "center",
          }}
        >
          <Grid sx={{ display: "flex", maxWidth: "568px", marginBottom: "100px", maxHeight: "700px", justifyContent: "center", display: "flex", alignItems: "center" }}>
            <img style={{ maxWidth: "400px" }} src={imageLogin}></img>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={5} elevation={6} square sx={{ justifyContent: "start", display: "flex" }}>
          <Box
            sx={{
              my: 8,
              
              display: 'flex',
              flexDirection: 'column',
              maxWidth: "500px",
              maxHeight: "497px"
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontSize: "30px", fontWeight: "600", color: loginFont, marginBottom: "18px", fontFamily: "TanPearl" }}>
              Bienvenido a Todo Floral
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesLogin}
                validationSchema={loginSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm
                }) => (
                  <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                      sx={{ marginBottom: "27px", background: logininput }}

                      required
                      fullWidth
                      id="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      autoComplete="email"
                      error={
                        Boolean(touched.email) && Boolean(errors.email)
                      }
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      sx={{ marginBottom: "22px", background: logininput }}
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"

                      type="password"
                      id="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      autoComplete="current-password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />

                    {/* <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Recuerdame"
                    /> */}
                    {/* <Grid sx={{display:"flex",justifyContent:"center", marginTop:"6px", marginBottom:"20px"}}>
                      <Link to='/login' style={{textDecoration: 'underline', color: '#00D5FA'}}>
                      ¿Olvidaste tu contraseña?
                      </Link>
                    </Grid> */}
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                      <Typography component="h1" variant="h5" sx={{ fontSize: "14px", fontWeight: "400", color: loginFont, lineHeight: "20px", marginBottom: "18px" }}>
                        ¿No tienes una cuenta? <Link to="/register" style={{ textDecoration: 'underline', color: '#00D5FA' }}>
                          Crea una cuenta.</Link>
                      </Typography>
                      <Button
                        type="submit"
                        variant='contained'
                        sx={{ color: loginFont, fontSize: "12px", fontWeight: "600", marginTop: "8px", marginBottom: "24px", background: logininput, textTransform: "none", px: 4 }}
                      >
                        Iniciar sesión
                      </Button>

                      {loading ?
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress />
                        </Box> : <></>
                      }
                    </Box>

                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                )}
              </Formik>
            </Box>

          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}