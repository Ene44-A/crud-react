import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <button className="btn btn-primary">
                        <a class="navbar-brand">
                            <Link to={'/create'}
                                style={{ color:'#fff',textDecoration:'none' }}>
                                Crear libro
                            </Link>
                        </a>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
