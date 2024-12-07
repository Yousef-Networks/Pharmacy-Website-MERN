import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()


  const handleClick = () => {
    logout()
    
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Pharmacy</h1>
        </Link>
        <nav>
          {user && (
            <div>
            <span>{user.user}</span>
            {user.role === 'patient' && (
                <Link to={`/cart/${user.user}`}>
                  <FaShoppingCart />
                </Link>
              )}
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register/pharmacist">Signup as Pharmacist</Link>
              <Link to="/register/patient">Signup as Patient</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar