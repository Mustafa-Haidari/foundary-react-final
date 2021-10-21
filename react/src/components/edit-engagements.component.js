import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const EditEngagement = props => {

    let initialEngagementState = {
        id: '',
        name: '',
        description: '',
        started: Date,
        ended: Date,
        client: '',
        employee: ''
    }

    if (props.location.state && props.location.state.currentEngagement) {
        let started = props.location.state.currentEngagement.started;
        started = started.substr(0, started.indexOf('T'));
        initialEngagementState = props.location.state.currentEngagement;
        // set date to this format
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        initialEngagementState.started = today;
    }
    
    const [currentEngagement, setCurrentEngagement] = useState(initialEngagementState);
    const {register, handleSubmit} = useForm();
    const [clients, setClients] = useState([]);
    const [employees, setEmployee] = useState([]);
    const history = useHistory();

   
    const updateProperties = ({ target: { name, value } }) => {
        setCurrentEngagement((form) => ({ ...form, [name]: value }));
    };

    useEffect(() => {
        const getEmployee = axios.get('http://localhost:5000/employees');
        const getClient = axios.get('http://localhost:5000/clients');
        Promise.all([getEmployee, getClient]).then((data) => {
            setClients(data[1].data);
            setEmployee(data[0].data);
        });
    }, []);
    
    const updateEmployee = (e) => {
        let data = {
            name: currentEngagement.name,
            description: currentEngagement.description,
            started: currentEngagement.started,
            ended: currentEngagement.ended,
            client: currentEngagement.client,
            employee: currentEngagement.employee
        }
        console.log(data)
      axios.put('http://localhost:5000/engagements/' + initialEngagementState.id, data)
      .then(response => {
        response.status === 200 ? history.push('/engagements') : console.error(response);
      })
    };


  return (
    <div>
        <h1>This is components</h1>
        <div className="submit-form">
                <div className="form-group mb-3">
                    <label>Name:</label><br/>
                    <input type="text" name="name" value={currentEngagement.name}
                onChange={updateProperties} placeholder="name" className="editValue" required/>
                </div>

                <div className="form-group mb-3">
                    <label>Description</label><br/>
                    <input type="text" name="description" value={currentEngagement.description}
                onChange={updateProperties} placeholder="description" className="editValue" required/>
                </div>

                <div className="form-group mb-3">
                    <label>Started</label><br/>
                    <input type="Date" name="started" value={currentEngagement.started}
                onChange={updateProperties} placeholder="started" className="editValue" required/>
                </div>

                {/* <div className="form-group mb-3">
                    <label>Ended</label><br/>
                    <input type="Date" name="ended" value={currentEngagement.ended}
                onChange={updateProperties} placeholder="ended" className="editValue" required/>
                </div> */}

                <div className="form-group mb-3">
                  <label>Employee</label><br/>
                  <select name="employee" value={currentEngagement.employee} {...register("employee")} onChange={updateProperties}>
                        {
                            employees.map(employee => {
                                return  <option key={employee.id} value={employee.name} >{employee.name}</option>
                            }) 
                        }
                    </select>
                </div>

                <div className="form-group mb-4">

                    <label>Client</label><br/>
                    <select name="client" value={currentEngagement.client} {...register("client")} onChange={updateProperties}>
                        {
                            clients.map(client => {
                                    return <option key={client.id} value={client.name}>{client.name}</option>
                            })
                        }
                    </select>

                </div>
                <button onClick={updateEmployee} className="btn btn-success">Submit</button>
            
        </div>

    </div>
  )
}


export default EditEngagement;

