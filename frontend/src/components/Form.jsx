import { useState } from "react";
import api from "../api";
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function DefaultForm({route,method}){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            if (method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
                console.log('you just logged in')
            }
            else{
                console.log('you just registered')
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally{
            setLoading(false)
        }
    }

    return <>
    <Col className="page-container">
    <h1 className="title">TimeTracker</h1>    
        <form onSubmit={handleSubmit} className="form-container">
        <h1 className="name">{name}</h1>
        <InputGroup  className="mb-3">
            <Col>
                <Row>
                <Form.Control aria-label="Username"
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
                </Row>
                <Row>
                
            <Form.Control
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
                </Row>
                <Row>
                
            <Button className="form-button" type="submit" variant="dark">
                {name}
            </Button>
                </Row>
            </Col>
        </InputGroup>
        </form>
        

    
    </Col>
        
    </>
}
    /*
    return <form onSubmit={handleSubmit} className="form-conatiner">
        <h1 className="title">TimeTracker</h1>
        <h1 className="name">{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}*/

export default DefaultForm