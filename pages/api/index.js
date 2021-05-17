// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function getTeams() {
  return fetch('/data/teams.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
   }).then(function(response){ 
      return response.json();
  }).catch(error => console.error('Error:', error));
};

export function getPlayers()  {
  return fetch('./data/players.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
   }).then(function(response) {
    return response.json();
  }).catch(error => console.error('Error:', error));

}