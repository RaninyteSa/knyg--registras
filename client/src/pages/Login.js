import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = (props) => {

    const { setLoggedIn } = props

        const [form, setForm] = useState({
            email: '',
            password: '',
        })
        const [alert, setAlert] = useState({
            message: '',
            status: ''
        })
    
        const navigate = useNavigate()
    
        const handleForm = (e) => {
            setForm({...form, [e.target.name]: e.target.value})
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
    
            axios.post('/api/users/login', form)
            .then(resp => {
               localStorage.setItem('loggedIn', true)
               setLoggedIn(true)

               setAlert({
                    message: resp.data,
                    status: 'success'
                })
    
                setTimeout(() => {
                  navigate('/') 
                
                } , 1000) 
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
        }
    return (
        <div className="containerr">
            <h1>Prisijungimas</h1>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>El. pašto adresas:</label>
                    <input type="email" name="email" onChange={handleForm} required />
                </div>
                <div className="form-control">
                    <label>Slaptažodis:</label>
                    <input type="password" name="password" onChange={handleForm} />
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
        </div>
    )
}

export default Login;