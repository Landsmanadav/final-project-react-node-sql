import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.username) {
            navigate("/login")
        } else if (localStorage.username == "ADMIN") {
            navigate('/admin')
        } else {
            navigate('/vacations/' + localStorage.username)
        }
    }, [])

    return (
        <div>

        </div>
    )
}
