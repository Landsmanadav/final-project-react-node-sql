import React, { useState } from 'react'
// Card Imports ===============================================
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// SpeedDial Imports ==========================================
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
// Dialog Imports ==========================================
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


import AddIcon from '@mui/icons-material/Add'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function AdminVacation({ vacation, handleDelete, setUpdate }) {
    const [expanded, setExpanded] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openNewVacation, setOpenNewVacation] = useState(false)

    const [newDestination, setNewDestination] = useState(vacation.destionation)
    const [newStartDate, setNewStartDate] = useState(new Date(vacation.startDate).toLocaleDateString().split("/").reverse().join("-"))
    const [newEndDate, setNewEndDate] = useState(new Date(vacation.endDate).toLocaleDateString().split("/").reverse().join("-"))
    const [newImageUrl, setNewImageUrl] = useState(vacation.img)
    const [newPrice, setNewPrice] = useState(vacation.price)
    const [newAbout, setNewAbout] = useState(vacation.description)

    const handleClickOpen = (e) => {
        if (e.name === "Delete") {
            setOpenDelete(true);
        } else {
            setOpenEdit(true)
        }
    }
    const handleClose = () => {
        if (openDelete) {
            setOpenDelete(false)
            setUpdate(up => !up)
        } else if (openEdit) {
            setOpenEdit(false)
            setUpdate(up => !up)
        }
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    const handleEdit = async () => {
        const res = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations/admin/update`, {
            method: "put",
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: vacation.id,
                destination: newDestination,
                startDate: newStartDate,
                endDate: newEndDate,
                img: newImageUrl,
                price: newPrice,
                description: newAbout
            })
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        }
        setUpdate(up => !up)
    }

    const actions = [
        { icon: <DeleteOutlinedIcon />, name: 'Delete', onclick: handleClickOpen },
        { icon: <EditOutlinedIcon />, name: 'Edit', onclick: handleClickOpen },
    ]
    //mui design card ===================================
    const card = (
        <Card>
            <CardHeader
                title={vacation.destionation}
                subheader={`${new Date(vacation.startDate).toLocaleDateString()} - ${new Date(vacation.endDate).toLocaleDateString()}`}
            />
            <CardMedia
                component="img"
                height="240"
                image={vacation.img}
                alt={vacation.destionation}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {vacation.price}$
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" >
                    <Box sx={{}}>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: -10 }}
                            icon={<SpeedDialIcon />}
                            direction="right"
                        >

                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={() => action.onclick(action)}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
                    {/* DELETE DIALOG ========================================================================== */}
                    <Dialog
                        open={openDelete}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete this vacation?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                deleting this vacation will delete all users likes,
                                This action cannot be undone
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={() => {
                                handleClose();
                                handleDelete(vacation)
                            }}
                                autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* EDIT DIALOG ========================================================================== */}
                    <Dialog
                        open={openEdit}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Edit Vacation
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {vacation.destionation}
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

                                        fullWidth="true"
                                        margin="normal"
                                        defaultValue={vacation.destionation}
                                        onChange={e => setNewDestination(e.target.value)}
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Please enter new destination
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard"
                                    sx={{ width: " 45%" }}>
                                    <InputLabel htmlFor="component-helper"></InputLabel>
                                    <Input
                                        type="date"
                                        margin="normal"
                                        defaultValue={new Date(vacation.startDate).toLocaleDateString().split("/").reverse().join("-").split("T")[0]}
                                        onChange={(e) => setNewStartDate(e.target.value)}

                                    />
                                    <FormHelperText id="component-helper-text">
                                        Please enter new start date
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" sx={{ width: " 45%" }}>
                                    <InputLabel htmlFor="component-helper" ></InputLabel>
                                    <Input
                                        type="date"
                                        margin="normal"
                                        defaultValue={new Date(vacation.endDate).toLocaleDateString().split("/").reverse().join("-").split("T")[0]}
                                        onChange={(e) => setNewEndDate(e.target.value)}
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Please enter new end date
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" sx={{ width: " 45%" }}>
                                    <InputLabel htmlFor="component-helper">Image</InputLabel>
                                    <Input
                                        type="text"
                                        margin="normal"
                                        defaultValue={vacation.img}
                                        onChange={e => setNewImageUrl(e.target.value)}
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
                                        defaultValue={vacation.price}
                                        onChange={e => setNewPrice(e.target.value)}
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Please enter new Price
                                    </FormHelperText>
                                </FormControl>
                                <FormControl variant="standard" fullWidth="true">
                                    <InputLabel htmlFor="component-helper">About</InputLabel>
                                    <Input
                                        type="Text"
                                        margin="normal"
                                        defaultValue={vacation.description}
                                        onChange={e => setNewAbout(e.target.value)}
                                    />
                                    <FormHelperText id="component-helper-text">
                                        Please enter new About
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => {
                                handleClose()
                                handleEdit()
                            }}
                                autoFocus>
                                Save Changes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* EDIT DIALOG END ========================================================================== */}
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>About the destionation:</Typography>
                    <Typography paragraph>
                        {vacation.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card >
    )
    // mui design add new vacation ==========================
    // const newVactaionBtn =


    return (
        <div >
            {card}

        </ div>
    )
}
