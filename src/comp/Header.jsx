import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const pagesAdmin = ['All VACATION', 'ANALYTICS']
const pagesUser = ['All VACATION', 'LIKED VACATIONS']

export default function Header({ auth, setAuth }) {
    const navigate = useNavigate()


    const [anchorElNav, setAnchorElNav] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleChange = async (event) => {
        const res = await fetch('https://final-project-react-node-sql.herokuapp.com/users/logout', {
            method: "delete",
            credentials: 'include',
            headers: { 'content-type': 'application/json' }
        })
        const data = await res.json()
        setAuth(true)
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.removeItem('username')
            navigate('/')
            setAuth(false)
        }
    }

    const getJsx = () => {
        if (!localStorage.username) {

            return (

                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                VACATION ADVISOR
                            </Typography>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                VACATION ADVISOR
                            </Typography>


                            <Box sx={{ flexGrow: 0 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={auth}
                                                onChange={() => navigate('/login')}
                                                aria-label="login switch"
                                            />
                                        }
                                        label={auth ? 'Logout' : 'Login'}
                                    />
                                </FormGroup>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            )
        } else if (localStorage.username === "ADMIN") {
            return <>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                VACATION ADVISOR
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pagesAdmin.map((page) => (
                                        <MenuItem key={page} onClick={() =>
                                            page == pagesAdmin[0] ? navigate(`/admin`) : navigate(`${page.toLocaleLowerCase()}`)
                                        } >
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                VACATION ADVISOR
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pagesAdmin.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => page == pagesAdmin[0] ? navigate(`/admin`) : navigate(`${page.toLocaleLowerCase()}`)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                            <Tooltip >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
                                >
                                    Welcome, {localStorage.username}
                                </Typography>
                            </Tooltip>
                            <Box sx={{ flexGrow: 0 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={auth}
                                                onChange={handleChange}
                                                aria-label="login switch"
                                            />
                                        }
                                        label={auth ? 'Logout' : 'Login'}
                                    />
                                </FormGroup>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        } else {
            return <>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                VACATION ADVISOR
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pagesUser.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>


                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                VACATION ADVISOR
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pagesUser.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}

                            </Box>
                            <Tooltip >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
                                >
                                    Welcome, {localStorage.username}
                                </Typography>
                            </Tooltip>

                            <Box sx={{ flexGrow: 0 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={auth}
                                                onChange={handleChange}
                                                aria-label="login switch"
                                            />
                                        }
                                        label={auth ? 'Logout' : 'Login'}
                                    />
                                </FormGroup>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        }
    }

    return (
        <div>
            {getJsx()}
        </div>
    )
}
