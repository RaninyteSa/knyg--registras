import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'




const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            setPost(resp.data)
            console.log(post)
        })
    }, [])

    return (
    
        <div className='single-post'>
            <div></div>
            <h1>{post.pavadinimas }</h1>
            <div className='img'><img style={{backgroundImage:`url('${post.nuotrauka}')`,  backgroundSize: 'cover' ,height: '250px', width: '250px', gap: '15px, 15px' ,justifyContent: 'center', opacity: 1}}src={post.nuotrauka} alt={post.pavadinimas}></img></div>
            <div className='contentt'><p>    {post.autorius}    </p>
            <p>    {post.virselioAutorius}    </p>
            <p>    {post.ISBN}    </p></div>

        </div>
    )
}

export default SinglePost