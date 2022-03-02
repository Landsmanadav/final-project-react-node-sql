import { Box, Chip, Container, Grid, Paper, styled, } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminVacation from './AdminVacation';
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'


import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Admin({ setUpdate, update, allVacations, setAllVacations }) {
    // IF NOT ADMIN 
    useEffect(() => {
        if (!localStorage.username === "ADMIN" || localStorage.username == undefined) {
            return navigate('/')
        }
    })


    const [openNewVacation, setOpenNewVacation] = useState(false)

    const newDestination = useRef("")
    const newStartDate = useRef("")
    const newEndDate = useRef("")
    const newImageUrl = useRef("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80")
    const newPrice = useRef("")
    const newAbout = useRef("")

    const navigate = useNavigate()

    const handleAdd = async () => {
        const res = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations/admin/add`, {
            method: "put",
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                destination: newDestination.current,
                startDate: newStartDate.current,
                endDate: newEndDate.current,
                img: newImageUrl.current,
                price: newPrice.current,
                description: newAbout.current
            })
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        }
        setUpdate(up => !up)
    }



    const handleDelete = async (v) => {
        const res = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations/admin/likes/${v.id}`, {
            method: "delete",
            credentials: 'include',
            headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" }
        })
        const data = await res.json()
        console.log(data)
        setUpdate(up => !up)
        const res1 = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations/admin/${v.id}`, {
            method: "delete",
            credentials: 'include',
            headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" }
        })
        const data1 = await res1.json()
        console.log(data1)
        console.log("done")
        setUpdate(up => !up)
    }

    const newVacationDialog =
        <Dialog
            open={openNewVacation}
            onClose={() => setOpenNewVacation(up => !up)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Add New Vacation
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    Validate
                    autoComplete="off"
                >
                    <FormControl variant="standard" sx={{ width: " 50%" }}>
                        <InputLabel required={true} htmlFor="component-helper">Destination</InputLabel>
                        <Input
                            // ref={newDestination}
                            fullWidth="true"
                            margin="normal"
                            onChange={e => newDestination.current = e.target.value}
                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new destination
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard"
                        sx={{ width: " 45%" }}>
                        <InputLabel htmlFor="component-helper"></InputLabel>
                        <Input
                            // ref={newStartDate}
                            type="date"
                            margin="normal"
                            onChange={e => newStartDate.current = e.target.value}

                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new start date
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: " 45%" }}>
                        <InputLabel htmlFor="component-helper" ></InputLabel>
                        <Input
                            // ref={newEndDate}
                            type="date"
                            margin="normal"
                            onChange={e => newEndDate.current = e.target.value}
                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new end date
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: " 45%" }}>
                        <InputLabel htmlFor="component-helper">Image</InputLabel>
                        <Input
                            // ref={newImageUrl}
                            type="text"
                            margin="normal"
                            onChange={e => newImageUrl.current = e.target.value}
                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new Image url
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: " 45%" }}>
                        <InputLabel htmlFor="component-helper">Price</InputLabel>
                        <Input

                            type="number"
                            margin="normal"
                            onChange={e => newPrice.current = e.target.value}
                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new Price
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" fullWidth="true">
                        <InputLabel htmlFor="component-helper">About</InputLabel>
                        <Input
                            // ref={newAbout}
                            type="Text"
                            margin="normal"

                            onChange={e => newAbout.current = e.target.value}
                        />
                        <FormHelperText id="component-helper-text">
                            Please enter new About
                        </FormHelperText>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenNewVacation(up => !up)}>Cancel</Button>
                <Button onClick={() => {
                    setOpenNewVacation(up => !up)
                    handleAdd()
                }}
                    autoFocus>
                    ADD NEW VACATION
                </Button>
            </DialogActions>
        </Dialog>

    return (
        <div style={{ width: "100%", marginTop: 5 }}>
            <Container maxWidth="xxl">
                <Box sx={{ flexGrow: 5 }}>
                    <Grid container spacing={1} >
                        {allVacations.map(vacation => <Grid item xs={12} md={4}><Item>  <AdminVacation vacation={vacation} allVacations={allVacations} setUpdate={setUpdate} update={update} handleDelete={handleDelete} /> </Item></Grid>)}
                    </Grid>
                </Box>
            </Container>
            <Chip label="Add New Vacation" color="info" onClick={() => setOpenNewVacation(up => !up)}
                sx={{
                    position: 'fixed', margin: 0,
                    top: "auto",
                    right: 80,
                    bottom: 25,
                    left: 'auto',

                }}>
                <AddIcon fontSize="large" />
            </Chip>
            {newVacationDialog}
        </div >
    )
}
