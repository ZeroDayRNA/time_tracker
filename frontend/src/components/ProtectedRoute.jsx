import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

function ProtectedRoute({children}){
    const[isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    })

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh:refreshToken
            });
            if (res.status = 200){
                console.log('refresh successful')
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
            else {
                console.log('refresh failed')
                setIsAuthorized(false)
            }
        } catch (error) {
            setIsAuthorized(false)
            console.log(error)
        }
    }

    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return;
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        // Divided time by 1000 to get time in seconds instead of miliseconds.
        const now = Date.now()/1000

        if (tokenExpiration < now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    // If the user is not authorized, will send them to the login page.
    return isAuthorized ? children : <Navigate to='/login'/>
}

export default ProtectedRoute