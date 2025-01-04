import React from 'react'
import ImageGallery from './ImageGallery'
import ImageUpload from './ImageUpload'
import Footer from './Footer'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar user={user} /> 
            <div className="flex-grow">
                <ImageUpload />
                <ImageGallery />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard
