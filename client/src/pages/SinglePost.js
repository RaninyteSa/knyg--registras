import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import MainContext from '../MainContext'




const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('')
    const navigate = useNavigate()

    const{ loggedIn } = useContext(MainContext)


    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            if(!resp.data) {
                //Pirmąja reikšme perduodame adresą kuriuo nukreipiamas vartotojas negaunant jokios reikšmės
                navigate('/')
                return 
            }

            setPost(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    const handleForm = (e) => {
        e.preventDefault()

        axios.post('/api/comments' , { comment, postId: id})
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

    return (
    
        <div className='single-post'>
            <div></div>
            <h1>{post.pavadinimas }</h1>
            <div className='img'><img style={{backgroundImage:`url('${post.nuotrauka}')`,  backgroundSize: 'cover' ,height: '250px', width: '250px', gap: '15px, 15px' ,justifyContent: 'center', opacity: 1}}src={post.nuotrauka} alt={post.pavadinimas}></img></div>
            <div className='contentt'><p> Autorius:   {post.autorius}    </p>
            <p> Viršelio autorius:   {post.virselioAutorius}    </p>
            <p> ISBN kodas:   {post.ISBN}    </p></div>
            { loggedIn ?
            <div className='comment-form'>
                <h2>Palikite savo komentara</h2>
                <form onSubmit={ (e) => handleForm(e) }>
                    <div>
                    <label>komentaras</label>
                    <textarea name='comment' onChange={(e) => setComment(e.target.value)}></textarea>   
                    </div>
                    <div>
                        <button>skelbti komentara</button>
                    </div>
                </form>
            </div>
            
           : <div>'Prasome prisijungti jeigu norite komentuoti'</div> } 


        </div>
    )
}

export default SinglePost