import DefaultForm from '../components/Form'
import Button from 'react-bootstrap/Button'

function Login (){
    return<>
    <DefaultForm route='api/token/' method='login'/>
    </>
}

export default Login