import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({
        pavadinimas: '',
        autorius: '',
        nuotrauka: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            if(!resp.data) {
                navigate('/')
                return
            }

            setPost(resp.data)
        })
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [navigate])

    const handleForm = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/posts/edit/' + id, post)
        .then(resp => {
            navigate('/')
        }, [navigate])
     
        
    }

    return (
        <div className="containerr"> <h1>Redaguoti</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
               
                <div className="form-control">
                <label>Pavadinimas:</label>
                    <input type="text" name="pavadinimas" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>Autorius:</label>
                    <textarea type="text" name="autorius" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>Virselio Autorius:</label>
                    <textarea type="text" name="virselioAutorius" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>ISBN:</label>
                    <textarea type="text" name="ISBN" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>Nuotrauka:</label>
                    <input type="text" name="nuotrauka" onChange={(e) => handleForm(e)} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
                
            </form>
        </div>
    )
}

export default EditPost