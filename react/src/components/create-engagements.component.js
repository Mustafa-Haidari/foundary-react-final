import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from "axios";


export default function CreateEngagement() {

    let dateT = new Date()
    let display 

    const initialEngagementState = {
        id: '',
        name: '',
        description: '',
        started: Date,
        ended: Date,
        client: '',
        employee: ''
    }
    
  const history = useHistory()
    
    const [engagement, setEngagements] = useState(initialEngagementState);
    const {register, handleSubmit} = useForm();
    const [clients, setClients] = useState([]);
    const [employees, setEmployee] = useState([]);


    

    useEffect(() => {
        axios.get('http://localhost:5000/clients')
        .then(response => {
            setClients(response.data)
        });
        axios.get('http://localhost:5000/employees')
        .then(response => {
            setEmployee(response.data)
        });
        
    }, []);

    const onSubmit = (data) => {

        axios.post('http://localhost:5000/engagements', data)
        .then(response => {
            setEngagements(response.data);
            console.log(data)
              history.push('/engagements')
        })
        .catch(e => {
          console.log(e);
        })
    }



  

  return (
    <div>
        <h3>Add Engagement</h3>
        <div className="submit-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                    <label>Name:</label><br/>
                    <input size="20" type="text" name="name" {...register("name")} placeholder=""/>
                </div>

                <div className="form-group mb-3">
                    <label>Description</label><br/>
                    <input size="20" type="text"name="description" {...register("description")} placeholder=""/>
                </div>

                <div className="form-group mb-3">
                    <label>Started</label><br/>
                    <input type="date" format="dd-mm-yyyy" min="01-01-1997" max="12-31-2030" name="started" {...register("started")} placeholder=""/>
                </div>

                <div className="form-group mb-3">
                    <label>Ended</label><br/>
                    <input type="date" format="dd-mm-yyyy" min="01-01-1997" max="12-31-2030" name="ended" {...register("ended")} placeholder=""/>
                </div>

                <div className="form-group mb-3">
                    <label>Employee</label><br/>
                    <select name="employee" {...register("employee")}>
                        {
                            employees.map(employee => {
                                return <option key={employee.id} value={employee.name}>{employee.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group mb-3">

                    <label>Client</label><br/>
                    <select name="client" {...register("client")}>
                        {
                            clients.map(client => {
                                return <option key={client.id} value={client.name}>{client.name}</option>
                            })
                        }
                    </select>

                </div>
                <button type="submit" className="btn btn-primary btn__style" value="Submit">Submit</button>
            </form>
            
            
        </div>

    </div>
  )
}
