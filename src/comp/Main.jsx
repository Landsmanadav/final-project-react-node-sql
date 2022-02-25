import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Admin from './Admin'
import Analytics from './Analytics'
import LoginRegister from './LoginRegister'
import MainPage from './MainPage'
import Register from './Register'
import Vacations from './Vacations'

export default function Main({ update, setUpdate, auth, setAuth }) {
    const [allVacations, setAllVacations] = useState([])
    // FETCH All VACATIONS ===================================================
    useEffect(() => {
        (async () => {
            const res2 = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations`, {
                headers: { 'content-type': 'application/json' }
            })
            const data2 = await res2.json()
            setAllVacations(data2)
        })();
    }, [update])
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/analytics" element={<Analytics allVacations={allVacations} update={update} />} />
                <Route path="/login" element={<LoginRegister setUpdate={setUpdate} auth={auth} setAuth={setAuth} />} />
                <Route path="/register" element={<Register setUpdate={setUpdate} auth={auth} setAuth={setAuth} />} />
                <Route path="/vacations/:username" element={<Vacations setUpdate={setUpdate} update={update} allVacations={allVacations} />} />
                <Route path="/admin" element={<Admin setUpdate={setUpdate} update={update} allVacations={allVacations} setAllVacations={setAllVacations} />} />
            </Routes>
        </div>
    )
}
