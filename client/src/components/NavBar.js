import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div class="navBar">
            <Link to="/" exact="true" className="navBarLink"><h3 className="navBarLinkText">Home</h3></Link>
            <Link to="/menu" exact="true" className="navBarLink"><h3 className="navBarLinkText">Menu</h3></Link>
            <Link to="/order" exact="true" className="navBarLink"><h3 className="navBarLinkText">Place an Order</h3></Link>
            <Link to="/about-us" exact="true" className="navBarLink"><h3 className="navBarLinkText">About Us</h3></Link>
            <Link to="/login" exact="true" className="navBarLink"><h3 className="navBarLinkText">Login/Logout</h3></Link>
        </div>
    )
}

export default NavBar