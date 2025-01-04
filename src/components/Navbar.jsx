import React from 'react'
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const Navbar = ({ user }) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="bg-sky-600 p-4 flex justify-between items-center text-white">
            <div className="text-xl">Welcome, {user?.name}</div>
            <Button variant="submit" onClick={handleLogout} className="bg-sky-700 hover:bg-sky-800">
                Logout
            </Button>
        </nav>
    )
}

export default Navbar
