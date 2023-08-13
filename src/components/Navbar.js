import React from 'react';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand text-decoration-none" href="#">Beer Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/")} href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/fav")} href="#">Fav's</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;