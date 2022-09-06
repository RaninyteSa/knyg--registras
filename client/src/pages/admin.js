import { useState, useEffect, useContext } from 'react'
import convertDate from '../utils/Date'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../MainContext'
import axios from 'axios'

const Admin = () => {
   
    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState({
        message: '',
        status: ''
      })
      const [refresh, setRefresh] = useState(false)
      const { loggedIn } = useContext(MainContext)
      const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts')
        .then(resp => setPosts(resp.data))
        .catch( error => console.log(error))
    }, [refresh])

    const handleDelete = (id) => {
        if(isNaN(id) || !loggedIn)
          return
        
          axios.delete('/api/posts/delete/' + id)
          .then(resp => {
            setAlert({
              message: resp.data.message,
              status: 'success'
            })
            setRefresh(!refresh)
            
            window.scrollTo(0, 0)
          })
          .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
            window.scrollTo(0, 0)
    
            if(error.response.status === 401)
              setTimeout(() => navigate('/login'), 2000)
          })
          .finally(() => {
            setTimeout(() => setAlert({
              message: '',
              status: ''
            }), 3000)
          })
          
        }

    return (
        <div className='containerrr'>
            <h2>Administratorius</h2>
            {alert.message && (
              <div className={'alert alert-' + alert.status}>
                {alert.message}
              </div>
            )}
            <table className='table'>
                <tr>
                    <th>ID</th>
                    <th>Pavadinimas</th>
                    <th>Sukurimo data</th>
                    <th>Modifikavimo data</th>
                    <th>Delete  /  Edit</th>
                </tr>
            </table>
            <tbody>
                {posts.map(post => 
                    <tr>
                        <td>{post.id}</td>
                        <td>{post.pavadinimas}</td>
                        <td>{convertDate(post.createdAt)}</td>
                        <td>{convertDate(post.updatedAt)}</td>
                        <td>
                    <button onClick={() => handleDelete(post.id)} className="btn">Delete</button>
                    <Link to={'/edit/' + post.id} className="btn">Edit</Link>
                        </td>
                    </tr>    
                )}
            </tbody>

        </div>

    )
}

export default Admin