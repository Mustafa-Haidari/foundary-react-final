import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


const ClientList = props => {

    const initialEmployeeState = {
        id: null,
        name: ''
    }
    
    const [engagements, setEngagements] = useState([initialEmployeeState]);
    const [searchTerm, setSearchTerm] = useState("");

    const getAllEngagements = () => {
        axios.get('http://localhost:5000/engagements')
        .then(response => { 
            setEngagements(response.data)
        });
    }

    useEffect(() => {
        getAllEngagements();
    }, []);

    const removeItem = (id) => {
        axios.delete('http://localhost:5000/engagements/' + id)
            .then(response => {
                refreshList();
            })
            
    }

    const refreshList = () => {
        getAllEngagements();
    }

    return (
        <div>
            <h3>Engagement list</h3>

            

            
            <div className="top-container-wrapper">
                <div className="top-container top-container-btn">
                    <Link to="/engagements/create" className="btn btn-primary btn__style">Create new engagements<i className="fas fa-plus"></i></Link>
                </div>
                <div className="top-container top-container-search">
                    <lable>Search by name </lable>
                    <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            </div>


            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Engagement name</th>
                        <th scope="col">Engagement description</th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Client</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        engagements.filter((val) => {
                            if(searchTerm == ""){
                                return val;
                            } else if(val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                return val;
                            }
                        }).map(engagement => 
                            <tr key={engagement.id}  className="blog__style" scope="row">
                                <td>{engagement.name}</td>
                                <td>{engagement.description}</td>
                                <td>{engagement.started}</td>
                                <td>{engagement.ended}</td>
                                <td>{engagement.employee}</td>
                                <td>{engagement.client}</td>
                                <td><Link to={{
                                    pathname: "/engagements/edit/" + engagement.id,
                                    state: {
                                        currentEngagement: engagement

                                    }
                                }}>Edit</Link> | 
                                <a href="#" onClick={() => {removeItem(engagement.id)} }>Delete</a>
                                </td>
                            </tr>
                        )
                    }
                 </tbody>
            </table>
        </div>
    )  
}
export default ClientList;