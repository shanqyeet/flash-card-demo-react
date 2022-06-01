import { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

import backgroundImage from '../../assets/flash-card-dashboard.png';

import "./dashboard.styles.scss";
import { renderAvatar } from '../../adapters/boring_avatar_adapter';
import { constructUserFromCookies } from '../../utils/user_cookies.utils';
import { userSignout } from '../../adapters/flash_game_users.adapter';

import startGameSticker from '../../assets/let-your-ideas-flow.png';
import continueGameSticker from '../../assets/drawing.png';
import { checkOnGoingChallenge, getLeaderBoard } from '../../adapters/flash_game_math_game.adapter';

const Dashboard = () => {
    let API_URL = "https://source.boringavatars.com/beam"; 
    const defaultAvatar = `<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><title>Lucy Stone</title><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#0c8f8f"></rect><rect x="0" y="0" width="36" height="36" transform="translate(4 4) rotate(340 18 18) scale(1.1)" fill="#ffad08" rx="36"></rect><g transform="translate(-4 -3) rotate(0 18 18)"><path d="M15 20c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>`;
    const navigate = useNavigate();
    const [hasOnGoingGame, setHasOnGoingGame] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => constructUserFromCookies());
    const [avatarElement, setAvatarElement] = useState("");
    const [leaderBoard, setLeaderBoard] = useState({easy:[], medium:[], hard:[]});

    useEffect(() => {
      if(currentUser.username){
        getAvatarOrDefault(currentUser.username);
      }
    },[currentUser]);

    useEffect(() =>{
      let token = currentUser.accessToken;
      getLeaderBoard(token)
        .then(resp => {
          console.log(resp.data);
          let data = resp.data
          let easy = data.easy;
          let medium = data.medium;
          let hard = data.hard;
          setLeaderBoard({easy: easy, medium: medium, hard: hard})
        }).catch(err => {
           console.log("Error gettign leader board");
           console.log(err);
        })
    },[])

    useEffect(() => {
      let token = currentUser.accessToken;
      checkOnGoingChallenge(token)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        setHasOnGoingGame(data.hasOnGoingGame);
      })
    },[])

    const getAvatarOrDefault = (username) => {
      renderAvatar(username, 60).then(resp => {
        if(resp.data != null) {
          setAvatarElement(resp.data);
        } else {
          setAvatarElement(defaultAvatar);
        }
      }) 

    } 

    const handleSignout = () => {
      userSignout();
      navigate("/");
    }

    const navigateNewGame = () => {
      navigate("/game", {state:{status: "NEW"}});
    }

    const navigateContinueGame = () => {
      navigate("/game", {state:{status: "ON_GOING"}});
    }

    const mapScores = (scores) => {
        scores.map(score =>{
          return(
            <div className="score-cards">
              {/* <div>{score.username}</div> */}
              <div>{score.score}</div>
              <div>{score.penalty}</div>
              <div>{score.averageAnswerTimeInMillis/1000}</div>
            </div>
          )
        })
    }

    const renderLeaderboard = (leaderboard) => {
        if(leaderboard.length == 0) {
          return(
            <div className="leaderboard-empty">Looks like no one here yet, be the first! ;)</div>
          )
        } else {
          return leaderboard.map(score =>{
            return(
              <div className="score-cards">
                <div className='score-card-username'>Username: {score.username}</div>
                <div className='score-card-score'>Score: {score.score}</div>
                <div className='score-card-penalty'>Penalty: {score.penalty}</div>
                <div className='score-card-average-answer-time'>Average Answer Speed: {score.averageAnswerTimeInMillis/1000}</div>
              </div>
            )
          })
        }
    }

    return(
    <div>
      <div className="dashboard-page">
        <div className="left-container">
          <h3 className='leaderboard-title'>Check Out How Your Friends Are Doing</h3>
          <div className="leaderboard leaderboard-hard">
            <h3 className='leaderboard-subtitle'>Top Scorers on Hard Difficulty</h3>
            <div className="score-cards-container">
              {renderLeaderboard(leaderBoard.hard)}
            </div>
          </div>
          <div className="leaderboard leaderboder-medium">
            <h3 className='leaderboard-subtitle'>Top Scorers on Medium Difficulty</h3>
            <div className="score-cards-container">
              {renderLeaderboard(leaderBoard.medium)}
            </div>
          </div>
          <div className="leaderboard leaderboard-easy">
            <h3 className='leaderboard-subtitle'>Top Scorers on Easy Difficulty</h3>
            <div className="score-cards-container">
              {renderLeaderboard(leaderBoard.easy)}
            </div>
          </div>
          <img className='dashboard-background' src={backgroundImage} />
        </div>
        <div className="right-container">
            <div className='user-avatar'>
              <button className="user-logout" onClick={handleSignout}>Lougout</button>
              <p className='user-username'>Hello there, {currentUser.username}</p>     
              <div className="user-logo" dangerouslySetInnerHTML={{__html: avatarElement}} />
            </div>
            <div className="start-new-game-button" onClick={navigateNewGame}>
              <img className='start-game-sticker' src={startGameSticker}/>
              <h3>Start New Game</h3>

            </div>
            {hasOnGoingGame ? <div className="continue-game-button" onClick={navigateContinueGame}><img className='continue-game-sticker' src={continueGameSticker}/><h3>Continue Last Game</h3></div> : ""}
        </div>
      </div>
    </div>
    );
}

export default Dashboard;