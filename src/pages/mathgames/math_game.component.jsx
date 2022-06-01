import {useLocation} from 'react-router-dom';
import { useEffect, useInsertionEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./dashboard.styles.scss";
import { renderAvatar } from '../../adapters/boring_avatar_adapter';
import { constructUserFromCookies } from '../../utils/user_cookies.utils';

import { userSignout } from '../../adapters/flash_game_users.adapter';
import {getChallenge, submitChallengeResult, completeChallenge} from '../../adapters/flash_game_math_game.adapter';
import studyingImage from '../../assets/studying.png';

import "./math_game.styles.scss";

const MathGame = () => {
    const defaultAvatar = `<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><title>Lucy Stone</title><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#0c8f8f"></rect><rect x="0" y="0" width="36" height="36" transform="translate(4 4) rotate(340 18 18) scale(1.1)" fill="#ffad08" rx="36"></rect><g transform="translate(-4 -3) rotate(0 18 18)"><path d="M15 20c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>`;
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(() => constructUserFromCookies());
    const [isNewGame, setIsNewGame] = useState(() => location.state && location.state.status && location.state.status == "NEW" ? true : false);
    const [isGamePaused, setIsGamePaused] = useState(true);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarElement, setAvatarElement] = useState("");
    const [gameDifficulty, setGameDifficulty] = useState(null);
    const [gamePayload, setGamePayload] = useState({firstNum: null, secondNum: null, operator: null, result: null})
    const [userResult, setUserResult] = useState("null");
    const [currentScores, setCurrentScores] = useState({totalScore: 0, totalPenalty: 0});
    const [challengeOutcome, setChallengeOutcome] = useState({totalScore: 0, correctAnswerRate: 0.0, averageAnswerTime: 0})
    const [challengeStarted, setChallengeStarted] = useState(false);
    const [challengeTimer, setChallengeTimer] = useState(60000);

    useEffect(() => {
      if(currentUser.username){
        getAvatarOrDefault(currentUser.username);
      }
    },[currentUser]);

    useEffect(() => {

      if(challengeStarted) { 
        if(challengeTimer <= 0) {
          checkAndSubmitChallengeResult();
        } else {
          const countDown = setInterval(() => {
            let currentTimer = challengeTimer;
            setChallengeTimer(currentTimer - 1000)
          }, 1000);

      
          return () => clearInterval(countDown);
        }

      }
    }, [challengeStarted, challengeTimer])

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

    const navigateToDashboard = () => {
      navigate("/dashboard");
    }
    
    const onResultFieldChange = (e) => {
      let result = e.target.value;
      setUserResult(result);
    }
    
    const chooseGameDifficulty = (e) => {
      let chosenGameDifficulty = e.target.closest(".difficulty-items").getAttribute("data-difficulty");
      setGameDifficulty(chosenGameDifficulty);
    }



    // API CALLS
    const retrieveChallenge = () => {
      let token = currentUser.accessToken;
      setIsNewGame(false)
      getChallenge(token, isNewGame, gameDifficulty)
        .then(resp => {
          let data = resp.data;
          let firstNum = data.firstNum;
          let secondNum = data.secondNum;
          let operator = data.operator;
          let result = data.result;
          let gameDifficult = data.gameDifficulty;

          setGameDifficulty(gameDifficult);
          setGamePayload({firstNum: firstNum, secondNum: secondNum, operator: operator, result: result});
          setIsGamePaused(false);
          setChallengeStarted(true);
        })
        .catch(err => {
          console.log(err);
          alert("Ooops, there seems to be some issue getting your next challenge, try again? pretty please?");
          setIsNewGame(true);
          setIsGamePaused(true);
          setChallengeStarted(false);
          setChallengeTimer(60000);
        })
    }

    const checkAndSubmitChallengeResult = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setChallengeTimer(60000);
      setIsGamePaused(true);
      setUserResult("null");
      let token = currentUser.accessToken;
      let isPassed = parseInt(userResult) == parseInt(gamePayload.result);
      let newAnswerTimeInMillis = 60000 - parseInt(challengeTimer);

      submitChallengeResult(token, isPassed, newAnswerTimeInMillis)
        .then(resp => {
          let data = resp.data;
          let totalScore = data.totalScore;
          let totalPenalty = data.totalPenalty;
          console.log("IS PASSED");
          if(isPassed) {
            alert("Congrats! You got it right");
          } else {
            alert("Ooops, don't give up yet and go try again")
          }
          setCurrentScores({totalScore: totalScore, totalPenalty: totalPenalty});
          setChallengeStarted(false);
        })
        .catch(err => {
          console.log(err);
          alert("Ooops, I'm terribly sorry I couldn't submit your result. Please try again in the next challenge");
          setIsGamePaused(true);
        });

      setIsLoading(false);
    }

    const completeChallengeAndRenderOutcome = () => {
      let token = currentUser.accessToken;
      completeChallenge(token)
        .then(resp => {
          let data = resp.data;
          console.log(data);
          let totalScore = data.totalScore;
          let correctAnswerRate = data.correctAnswerRate;
          let averageAnswerTime = data.averageAnswerTime;
          setChallengeOutcome({totalScore: totalScore, correctAnswerRate: correctAnswerRate, averageAnswerTime: averageAnswerTime});
          setIsNewGame(true);
          setIsGameComplete(true);
        })
        .catch(err => {
          console.log(err);
          alert("Ooops, there seems to be some issues getting your next challenge, try again? pretty please?");
          setIsGamePaused(true);
          navigate("/dashboard");
        })
    }

    // RENDER DIFFERENT COMPONENTS
    const renderGameDifficultyOrProceedGame = () => {
      if(isGameComplete) {
        return renderGameOutcome();
      } else if(isNewGame && !gameDifficulty) {
        return renderChooseGameDifficulty();
      } else if (isGamePaused){
        return renderPausedGame();
      } else {
        return renderGame();
      }
    }

    const renderGameOutcome = () => {
      return(
        <div className='game-outcome-container'>
          <h1>Report Card</h1>
          <div className="game-outcome-top-container">
            <div className="total-scores">
              <h2 className='report-outcome-output'>{challengeOutcome.totalScore}</h2>
              <h2 className='report-outcome-title'>Total Scores</h2>
            </div>
            <div className="percentage-correct">
              <h2 className='report-outcome-output'>{Math.round(challengeOutcome.correctAnswerRate * 100) + "%"}</h2>
              <h2 className='report-outcome-title'>Percentage of questions you got correct</h2>
            </div>
            <div className="average-answer-speed">
              <h2 className='report-outcome-output'>{Math.round(challengeOutcome.averageAnswerTime/1000)}</h2>
              <h2 className='report-outcome-title'>Average Answer Speed (Seconds)</h2>
            </div>
          </div>
          <div className="game-outcome-bottom-container">
              <button className='game-outcome-exit-button' onClick={navigateToDashboard}>I'm Done, Lets Check The Leaderboard</button>
          </div>
        </div>
      )
    }

    const renderChooseGameDifficulty = () => {
      return(
        <div className='game-difficulties-container'>
          <div className='difficulty-items' data-difficulty="EASY" onClick={chooseGameDifficulty}>
            <h1 className="difficulty-title">EASY</h1>
            <p className="difficulty-description">
              Contains Math Operations Such as '-' and '+'
            </p>
          </div>
          <div className='difficulty-items' data-difficulty="MEDIUM" onClick={chooseGameDifficulty}>
            <h1 className="difficulty-title">MEDIUM</h1>
            <p className="difficulty-description">
              Contains Math Operations Such as '-','+','/' and 'x'
            </p>

          </div>
          <div className='difficulty-items' data-difficulty="MEDIUM" onClick={chooseGameDifficulty}>
            <h1 className="difficulty-title">HARD</h1>
            <p className="difficulty-description">
              Contains Math Operations From Medium Level and '%'
            </p>

          </div>
        </div>
      )
    }

    const renderPausedGame = () => {
      console.log(currentScores);
      return(
        <div className="game-paused-container">
          <div className="paused-game-image-container">
             <img src={studyingImage} />
          </div>
          <h1>Are you ready? <br/> Click below button to get next challenge =)</h1>
          <button className='game-paused-next-challenge-button' onClick={retrieveChallenge}>Bring It On!!</button>
        </div>
      )
    }

    const renderGame = () => {
      return(
        <div className="game-challege-container">
          <div className="game-challenge-top-container">
            <div className={`challenge-timer ${challengeTimer < 11000 ? "countdown-warning" : ""}`}>You have {challengeTimer/1000} Seconds</div>
          </div>
          <div className="game-challenge-bottom-container">
            <div className="first-num">{gamePayload.firstNum}</div>
            <div className="operator">{gamePayload.operator}</div>
            <div className="second-num">{gamePayload.secondNum}</div>
            <div className="equal">=</div>
            <form onSubmit={checkAndSubmitChallengeResult} className="user-input-form submit-challenge-result-form">
              <input className="user-result-input" value={userResult == "null" ? "" : userResult} type="text" name="user result" onChange={onResultFieldChange}/>
              <button className="submit-button" type="submit">{isLoading ? "Submitting...": "OK, Submit"}</button>
            </form>
          </div>
        </div>
      )
    }

    return(
    <div>
      <div className="game-page">
        <div className="game-page-top-container">
          <div className="game-challenge-complete-button-container">
            <button className='complete-game-button' onClick={completeChallengeAndRenderOutcome }>{"<<"} I'm Done Here</button>
          </div>
          <div className='user-avatar'>
            <button className="user-logout" onClick={handleSignout}>Lougout</button>
            <p className='user-username'>Hello there, {currentUser.username}</p>     
            <div className="user-logo" dangerouslySetInnerHTML={{__html: avatarElement}} />
          </div>
        </div>
        <div className="game-page-bottom-container">
          {renderGameDifficultyOrProceedGame()}
        </div>
      </div>
    </div>
    );
}

export default MathGame;