import React from 'react'
import ImageGallery from './ImageGallery'
import ImageUpload from './ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout} from '../redux/slices/authSlice'
import { Button } from "@/components/ui/button"

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <div>
        <Button variant="submit" onClick={handleLogout} className=" bg-sky-600 text-white hover:bg-sky-700"> Logout</Button>
        <ImageUpload />
        <ImageGallery />
    </div>
  )
}

export default Dashboard