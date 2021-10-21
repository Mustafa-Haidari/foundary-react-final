import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const CreateEmployee = props => {
  let initialState = ''

  if(props.location.state && props.location.state.currentEmployee){
    initialState = props.location.state.currentEmployee;
  }

  const [currentName, setCurrentName] = useState(initialState.name);
  const history = useHistory();
  
  const updateEmployee = () => {
    axios.put('http://localhost:5000/employees/' + initialState.id, {
        name: currentName,
    })
    .then(response => {
      response.status === 200 ? history.push('/employees') : console.error(response);
    })
  };

     return (
    <div>
      <div className="submit-form">
          <div>
            <div className="form-group">
              <label>Edit Employee</label>
              <input type="text" name="name" value={currentName}
                onChange={(e) => setCurrentName(e.target.value)} placeholder="Enter user" className="editValue" required/>
               <button onClick={updateEmployee} className="btn btn-success">Submit</button>
            </div>
          </div>
      </div>

    </div>
  )

}

export default CreateEmployee;