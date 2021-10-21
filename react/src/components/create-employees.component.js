import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const CreateClient = props => {

  const initialClientState = {
    id: '',
    name: ''
}

  const [employee, setEmployee] = useState(initialClientState);
  const {register, handleSubmit} = useForm();
  const history = useHistory()

  const onChange = e => {
    setEmployee(e.target.value);
  };


  const onSubmit = (data) => {

    axios.post('http://localhost:5000/employees', data)
      .then(response => {
        setEmployee(response.data);
          console.log(data)
            history.push('/employees')
      })
      .catch(e => {
        console.log(e);
      })
  }

  

  return (
    <div>
      <h3>Add Employee</h3>
      <div className="submit-form">
            <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group">
              <label htmlFor="name">Employee Name</label><br/>
                    <input type="text" name="name" {...register("name")} placeholder=""/><br/><br/>
            </div>
                <button type="submit" className="btn btn-primary btn__style" value="Submit">Submit</button>
          </div>
          </form>
      </div>

    </div>
  );
};


export default CreateClient;