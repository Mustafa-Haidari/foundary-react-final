import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const CreateClient = props => {
  let initialState = ''

  if(props.location.state && props.location.state.currClient){
    initialState = props.location.state.currClient;
  }

  const [currentName, setCurrentName] = useState(initialState.name);
  const history = useHistory();
  
  const updateClient = () => {
    axios.put('http://localhost:5000/clients/' + initialState.id, {
        name: currentName,
    })
    .then(response => {
      response.status === 200 ? history.push('/clients') : console.error(response);
    })
  };

     return (
    <div>
      <div className="submit-form">
          <div>
            <div className="form-group">
              <label htmlFor="name">Edit Client</label>
              <input type="text" name="name" value={currentName}
                onChange={(e) => setCurrentName(e.target.value)} placeholder="Enter user" className="editValue" required/>
               <button onClick={updateClient} className="btn btn-success">Submit</button>
            </div>
          </div>
      </div>

    </div>
  )

}

export default CreateClient;