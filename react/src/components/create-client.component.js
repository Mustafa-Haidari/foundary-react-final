import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const CreateClient = props => {

  const initialClientState = {
    id: '',
    name: ''
}

  const [client, setClient] = useState(initialClientState);
  const {register, handleSubmit} = useForm();
  const history = useHistory()

  const onChange = e => {
    setClient(e.target.value);
  };


    const onSubmit = (data) => {

      axios.post('http://localhost:5000/clients', data)
        .then(response => {
          setClient(response.data);
            console.log(data)
              history.push('/clients')
        })
        .catch(e => {
          console.log(e);
        })
    }

  

  return (
    <div>
      <h3>Add Client</h3>
      <div className="submit-form">
            <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group">
              <label for="name">Client Name</label><br/>
                    <input type="text" id="name" name="name" 
                    {...register("name")} placeholder=""/><br/><br/>
            </div>
                <button type="submit" className="btn btn-primary btn__style" value="Submit">Submit</button>
          </div>
          </form>
      </div>

    </div>
  );
};


export default CreateClient;