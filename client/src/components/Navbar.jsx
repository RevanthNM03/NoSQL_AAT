import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import logo from '../images/logo1.png';

const Navbar = () =>{
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <NavLink className="navbar-brand " style={{marginLeft:"100px"}} to="/ "><img  src={logo} alt="logo"/> </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav " style={{marginLeft:"auto",marginRight:"40px"}}>
                    <li className="nav-item active" style={{marginLeft:"20px"}}>
                        <NavLink className="nav-link" to="/"><i className="zmdi zmdi-home"></i></NavLink>
                    </li>
                    <li className="nav-item active" style={{marginLeft:"20px"}}>
                        <NavLink className="nav-link" to="/graph"><i className="zmdi zmdi-view-carousel"></i></NavLink>
                    </li>
                </ul>
            </div>
            </nav>
        </>
    );
}

export default Navbar;