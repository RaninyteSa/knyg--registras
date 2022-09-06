import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'




const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()

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

    return (
    
        <div className='single-post'>
            <div></div>
            <h1>{post.pavadinimas }</h1>
            <div className='img'><img style={{backgroundImage:`url('${post.nuotrauka}')`,  backgroundSize: 'cover' ,height: '250px', width: '250px', gap: '15px, 15px' ,justifyContent: 'center', opacity: 1}}src={post.nuotrauka} alt={post.pavadinimas}></img></div>
            <div className='contentt'><p> Autorius:   {post.autorius}    </p>
            <p> Viršelio autorius:   {post.virselioAutorius}    </p>
            <p> ISBN kodas:   {post.ISBN}    </p></div>

        </div>
    )
}

export default SinglePost