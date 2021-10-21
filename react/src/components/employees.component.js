import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


const ClientList = props => {

    const initialEmployeeState = {
        id: null,
        name: ''
    }
    
    const [employees, setEmployees] = useState([initialEmployeeState]);
    const [searchTerm, setSearchTerm] = useState("");

    const getAllEmployees = () => {
        axios.get('http://localhost:5000/employees')
        .then(response => { 
            setEmployees(response.data)
            refreshList()
        });
    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    const removeItem = (id) => {
        axios.delete('http://localhost:5000/employees/' + id)
            .then(response => {
                refreshList();
            })
            
    }

    const refreshList = () => {
        getAllEmployees();
    }

    return (
        <div>
            <h3>Employee list</h3>

            
            <div className="top-container-wrapper">
                <div className="top-container top-container-btn">
                    <Link to="/employee/create" className="btn btn-primary btn__style">Create employee<i className="fas fa-plus"></i></Link>
                </div>
                <div className="top-container top-container-search">
                    <lable>Search by name </lable>
                    <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            </div>
            
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Employee name</th>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.filter((val) => {
                            if(searchTerm == ""){
                                return val;
                            } else if(val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                return val;
                            }
                        }).map(employee => 
                            <tr key={employee.id} className="blog__style"  scope="row">
                                <td>{employee.name}</td>
                                <td>{employee.id}</td>
                                <td><Link to={{
                                    pathname: "/employees/edit/" + employee.id,
                                    state: {
                                        currentEmployee: employee
                                    }
                                }}>Edit</Link> | 
                                <a href="#" onClick={() => {removeItem(employee.id)} }>Delete</a>
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