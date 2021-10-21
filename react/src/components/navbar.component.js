import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import { GlobalProvider } from '../context/GlobalState';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar_style navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">Foundry Assessment</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                        <Link to="/clients" className="nav-link">Clients</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/employees" className="nav-link">Employees</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/engagements" className="nav-link">Engagements</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}