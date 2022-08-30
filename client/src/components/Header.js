import { Link } from 'react-router-dom'


const Header = ({ loggedIn }) => {
    // const{ loggedIn }  = props
    return (
        <div className="cont">
            <header className="header">
            <Link to="/" className="new">
                <span className="fs-4">Book register ❤❤❤ </span>
            </Link>
        
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Home</Link>
                </li>

                {loggedIn ? (
                <>
                <li className="nav-item">
                    <Link to="/new-post" className="nav-link" aria-current="page">Naujas Straipsnis</Link>
                </li>
                  
                <li className="nav-item">
                    <Link to="/logout" className="nav-link" aria-current="page">atsijungti</Link>
                </li>
                </>
                ) : (
                <>
                    <li className="nav-item">
                    <Link to="/register" className="nav-link" aria-current="page">Registracija</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">Prisijungti</Link>
                    </li>
                </>
                )}
            </ul>
            </header>
        </div>
    
    )
}

export default Header