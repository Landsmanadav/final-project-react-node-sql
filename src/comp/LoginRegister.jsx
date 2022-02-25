import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="/">  Vacation Advisor</Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}
const theme = createTheme();

export default function LoginRegister({ setAuth, setUpdate }) {
    // Login state ==============================
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // Register state ==============================

    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        setUsername(data.get('username'))
        setPassword(data.get('password'))

        setUpdate(up => !up)
        if (username && password && event.type == "submit") {
            handleClickLogin()
        }
    }

    // Login ================================================================
    const handleClickLogin = async () => {

        const res = await fetch('http://https://final-project-react-node-sql.herokuapp.com/users/login', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })
        const data = await res.json()
        console.log(data)
        setAuth(true)
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.username = data.user.userName
            if (localStorage.username === "ADMIN") {
                navigate('/admin')
            } else {
                navigate(`/vacations/${localStorage.username}`)
                render()
            }
        }
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onChange={handleSubmit} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>

                                <Grid item>

                                    <Link to="/register">  Don't have an account? Sign Up</Link>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    )
}
