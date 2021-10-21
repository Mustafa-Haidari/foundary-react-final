import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";

export default function ClientList() {

    const initialClientState = {
        id: '',
        name: ''
    }
    
    const [clients, setClients] = useState([initialClientState]);
    const [searchTerm, setSearchTerm] = useState("");
    const [q, setQ] = useState('');


    
    useEffect(() => {
        getAllclients()
    }, []);

    function getAllclients() {
        axios.get('http://localhost:5000/clients')
        .then(response => { 
            setClients(response.data)
            refreshList()
        });
    }

    const removeItem = (id) => {
        axios.delete('http://localhost:5000/clients/' + id)
            .then(response => {
                refreshList();
            })
            
    }

    const refreshList = () => {
        getAllclients();
    }

    return (
        <div>

<div className="">

<h3>Client list</h3>
            <Link to="/clients/create" className="btn btn-primary btn__style">Create client<i className="fas fa-plus"></i></Link>
            
                <lable>Search by name </lable>
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>

                
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Client name</th>
                        <th scope="col">Client ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.filter((val) => {
                            if(searchTerm == ""){
                                return val;
                            } else if(val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                return val;
                            }
                        }).map(client => 
                            
                            <tr key={client.id} className="blog__style"  scope="row">
                                <td>{client.name}</td>
                                <td>{client.id}</td>
                                <td><Link to={{
                                    pathname: "/clients/edit/" + client.id,
                                    state: {
                                        currClient: client
                                    }
                                }}>Edit</Link> | 
                                <a href="#" onClick={() => {removeItem(client.id)} }> Delete</a>
                                </td>
                            </tr>
                        )
                    }
                 </tbody>
            </table>
        </div>

        

    
        </div>
    )  
}