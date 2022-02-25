import { Paper, styled, Grid, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Vacation from './Vacation'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}))
export default function Vacations({ setUpdate, update, allVacations }) {
    const [likedVacations, setLikedVacations] = useState([])
    const [likedVactionsNumber, setLikedVactionsNumber] = useState([])
    const username = localStorage.username

    useEffect(() => {
        (async () => {
            const res = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations/${username}`, {
                headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" }
            })
            const data = await res.json()
            setLikedVacations(data)
        })()
    }, [update])

    // FETCH All LIKED VACATIONS ===================================================
    useEffect(() => {
        (async () => {
            const res2 = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations//likes/likes`, {
                headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" }
            })
            const data2 = await res2.json()
            setLikedVactionsNumber(data2)
        })()
    }, [update])

    const userVacationsArr = []
    userVacationsArr.push(...likedVacations)
    userVacationsArr.push(...allVacations.filter(item => !likedVacations.map(item => item.id).includes(item.id)))
    for (const vac of userVacationsArr) {
        const numberOfLikes = likedVactionsNumber.filter(item => item.destination_id == vac.id)
        vac.likenumber = numberOfLikes.length
    }
    return (
        <div style={{ width: "100%", marginTop: 5, }}>
            <Box sx={{ flexGrow: 5 }}>
                <Grid container spacing={1} >
                    {userVacationsArr.map(vacation => <Grid item xs={12} md={4}><Item>  <Vacation vacation={vacation} likedVacations={likedVacations} allVacations={allVacations} setUpdate={setUpdate} update={update} likedVactionsNumber={likedVactionsNumber} /> </Item></Grid>)}
                </Grid>
            </Box>
        </div >
    )
}
