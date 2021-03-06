import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { api, handleError } from '../../helpers/api'
import BaseContainer from '../ui/BaseContainer'
import { Spinner } from '../ui/Spinner'

const Profile = () => {
  // use react-router-dom's hook to access the history
  const { userId } = useParams();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);


  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users/' + userId);

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUser(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  let content = <Spinner/>;

  if (user) {
    content = (
      <div className="game">
        <div className="player container">
          <div className="player username">username: {user.username}</div>
        </div>
        <div className="player container">
          <div className="player name">id: {user.id}</div>
        </div>
        <div className="player container">
          <div className="player name">status: {user.status}</div>
        </div>
        <div className="player container">
          <div className="player name">birthday: {user.birthday}</div>
        </div>
        <div className="player container">
          <div className="player name">creation date: {user.creationDate}</div>
        </div>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      {content}
    </BaseContainer>
  );
}

export default Profile;