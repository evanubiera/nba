import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import * as api from './api/index.js';
import { useEffect, useState } from 'react';
import Loader from './Loader.js';

function Players({ Component, pageProps }) {

  const [players, setPlayers] = useState({});
  const [teamDetails, setTeamDetails] = useState([]);
  const [loaded, setLoaded] = useState(false); //check for data loading

  const getData = async() => await api.getPlayers().then(function(res) {
      if(res) {
        setPlayers(res);
      }
    }).then(async() => await api.getTeams().then(function(res) {
        if(res) {
          let details = mapTeamDetails(res);
          setTeamDetails(details);
          setLoaded(true);
        }
      })
    ).catch(function(error){
      console.log("Could not load", error);
    });

   //create array of objects to get colors and logos by team through array keys
   //use teams as a passed in arg, not from stae, as to make things quicker and more reliable
  const mapTeamDetails = (teams) => {
    let response = [];
    
    for(var i=0; i < teams.length; i++) {
      let key = teams[i].ta;
      response[key] = {"logo": teams[i].logo, "color": teams[i].color };
    }
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  function GetPlayers() { 
    return (
      <div>
        {players.map((player, index) => (
          <div className="player-card-container" key={index } >
            <div className="player-card" >
              <div className="player flex" style={{borderBottom: `5px solid ${teamDetails[player.ta]['color']}`}}>
                <span className="portrait" style={{
                    width: 'calc(100% - 60px)',
                    backgroundImage: `url(${teamDetails[player.ta]['logo']})`, 
                    backgroundPosition: 'left', 
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat'}}>
                  <img src={player.headshot} />
                </span>
                <span className="player-name-container">
                  <div className="player-number-and-pos">#{player.num}|{player.pos}</div>
                  <div className="player-name">{player.fn} {player.ln}<span style={{color: `${teamDetails[player.ta]['color']}`}}> *</span></div>
                </span>
                <span className="logo">
                  <img src={teamDetails[player.ta]['logo']} />
                </span>
              </div>
              <div className="player-details">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="stats">
                    <div className='lbl'>PPG</div>
                    <div className='val'>{player.pts}</div>
                  </div>
                  <div className="stats mid-column">
                    <div className='lbl'>RPG</div>
                    <div className='val'>{player.reb}</div>
                  </div>
                  <div className="stats">
                  <div className='lbl'>APG</div>
                    <div className='val'>{player.ast}</div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        ))}
      </div>
    ); 
  }

  if(!loaded) {
    return <Loader />;
  } else {
    return GetPlayers();
  }
}

export default Players;