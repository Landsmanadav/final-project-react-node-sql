import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.username) {
            navigate("/")
        } else if (localStorage.username == "ADMIN") {
            navigate('/admin')
        } else {
            navigate('/vacations')
        }
    }, [])



    return (
        <div>
            MAINPAGE
            FOR UNREGISTERD USERS
        </div>
    )
}
