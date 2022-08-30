import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const Home = (props) => {

        const { loggedIn } = props
    
        const [posts, setPosts] = useState([])
        const [alert, setAlert] = useState({
          message: '',
          status: ''
        })
      
        useEffect(() => {
          axios.get('/api/posts/')
          .then(resp => { 
            setPosts(resp.data)
          })
          .catch(error => {
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
        }, [alert])
      
        const handleDelete = (id) => {
          if(isNaN(id) || !loggedIn)
            return
          
          axios.delete('/api/posts/delete/' + id, {
            method: 'DELETE'
          })
          .then(resp => resp.json())
          .then(resp => {
            setAlert({
              message: resp.message,
              status: 'success'
            })
          })
          .catch(error => {
            console.log(error)
            setAlert({
              message: 'Įvyko serverio klaida',
              status: 'danger'
            })
          })
          .finally(() => {
            setTimeout(() => setAlert({
              message: '',
              status: ''
            }), 3000)
          })
          
        }
      
        return (
          
          <div className="container">
            {alert.message && (
              <div className={'alert alert-' + alert.status}>
                {alert.message}
              </div>
            )}
            <div className="articles">
              {posts && posts.map(article => {
                return (
                  <div key={article.id} className="box">
                    <h3>{article.pavadinimas}</h3>
                    <div className="image" style={{backgroundImage:`url('${article.nuotrauka}')`, opacity: 1}}>
                      <img src={''} alt={''} />
                    </div>
                   
                    { loggedIn &&
                    <>
                    <Link to={'/post/' + article.id} className="btn">Skaityti plačiau</Link>
                    <button onClick={() => handleDelete(article.id)} className="btn">Delete</button>
                    <Link to={'/edit/' + article.id} className="btn">Edit</Link>
                    </>
                  }
                  </div>
                 
                )
              })}
            </div>
          </div>
        );
      }


export default Home;