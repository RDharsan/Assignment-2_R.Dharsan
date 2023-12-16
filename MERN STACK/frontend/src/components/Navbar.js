import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <header className="fixed-navbar">
            <div className="container">
                <Link to="/">
                    <h1>TODO APP</h1>
                    
                </Link>
                
                
                
            </div>
            
        </header>
    )
}

export default Navbar