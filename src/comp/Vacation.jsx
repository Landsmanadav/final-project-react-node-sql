import React from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Badge, Box } from '@mui/material'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export default function Vacation({ vacation, likedVacations, setUpdate }) {
    console.log(vacation)
    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const handleChange = async () => {
        if (likedVacations.map(item => item.id).includes(vacation.id)) {
            const res = await fetch(`http://https://final-project-react-node-sql.herokuapp.com/vacations/unlike/${localStorage.username}/${vacation.id}`, {
                method: "delete",
                credentials: 'include'
            })
            const data = await res.json()
            if (data.err) {
                alert(data.err)
            }
            setUpdate(up => !up)
        } else {
            const res = await fetch(`http://https://final-project-react-node-sql.herokuapp.com/vacations/like/${localStorage.username}/${vacation.id}`, {
                method: "put",
                credentials: 'include'
            })
            const data = await res.json()
            if (data.err) {
                alert(data.err)
            }
            setUpdate(up => !up)
        }
    }
    const handleChecked = () => {

        if (likedVacations.map(item => item.id).includes(vacation.id)) {
            return 'error'
        } else {
            return 'default'
        }
    }
    //mui design ===================================
    const card = (
        <Card >
            <CardHeader sx={{

            }}
                title={vacation.destionation}
                subheader={`${new Date(vacation.startDate).toLocaleDateString()} - ${new Date(vacation.endDate).toLocaleDateString()}`
                }
            />
            <Box sx={{ float: "left", pl: 2, pb: 1 }}>
                <Badge
                    badgeContent={vacation.likenumber} color="info"  >
                </Badge>
            </Box>
            <CardMedia
                component="img"
                height="240"
                image={vacation.img}
                alt={vacation.destionation}
            />


            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" color={handleChecked()} onClick={handleChange}>
                    <FavoriteIcon />
                </IconButton>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {vacation.price}$
                    </Typography>
                </CardContent>
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
    return (
        <div>
            {card}
        </div >

    )
}
