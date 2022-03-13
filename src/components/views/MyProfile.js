import BaseContainer from 'components/ui/BaseContainer'
import { Button } from 'components/ui/Button'
import { api, handleError } from 'helpers/api'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'styles/views/Login.scss'

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const MyProfile = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const doUpdate = async () => {
    try {
      const id = localStorage.getItem("id");
      const requestBody = JSON.stringify({username, birthday});
      const response = await api.put('/users/' + id, requestBody);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            type="text"
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Birthday"
            value={birthday}
            type="date"
            onChange={bd => setBirthday(bd)}
          />
          <div className="login button-container">
            <Button
              width="100%"
              onClick={doUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default MyProfile;
