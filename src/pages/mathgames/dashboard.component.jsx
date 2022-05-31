import { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

import backgroundImage from '../../assets/flash-card-dashboard.png';

import "./dashboard.styles.scss";
import { renderAvatar } from '../../adapters/boring_avatar_adapter';
import { constructUserFromCookies } from '../../utils/user_cookies.utils';

const Dashboard = () => {
    let API_URL = "https://source.boringavatars.com/beam"; 
    const navigate = useNavigate();
    const [hasOnGoingGame, setHasOnGoingGame] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => constructUserFromCookies());
    const [avatarElement, setAvatarElement] = useState("");

    useEffect(() => {
      if(currentUser.username){
        getAvatarOrDefault(currentUser.username);
      }
    },[currentUser]);

    const getAvatarOrDefault = (username) => {
      renderAvatar(username).then(resp => {
        if(resp.data != null) {
          setAvatarElement(resp.data);
        } else {
          setAvatarElement("default");
        }
      }) 

    } 


    return(
    <div>
      <div className="dashboard-page">
        <div className="left-container">
          <h3>Check Out How Your Friends Are Doing</h3>
          <div className="leaderboard-hard"></div>
          <div className="leaderboder-medium"></div>
          <div className="leaderboard-easy"></div>
          <img className='dashboard-background' src={backgroundImage} />
        </div>
        <div className="right-container">
            <div>
              <div dangerouslySetInnerHTML={{__html: avatarElement}} />
            </div>
            <div className="start-new-game-button">
              <h3>Start New Game</h3>
            </div>
            {hasOnGoingGame ? <div className="continue-game-button">Continue The Game</div> : ""}
        </div>
      </div>
    </div>
    );
}

export default Dashboard;