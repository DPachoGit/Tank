import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import cancion from './audio/03.mp3';

export default function ResultScreen({ onRestart, username, successfulClicks, failedClicks }) {
  const [bestScore, setBestScore] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    const registerUrl = "http://localhost:3333/register";
    const getUserUrl = "http://localhost:3333/getUser";
    const getUsersUrl = "http://localhost:3333/getUsers";

    const registerData = {
      user: username,
      hitNumber: successfulClicks,
      faultNumber: failedClicks,
    };

    fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Registro exitoso:', data);

      fetch(`${getUserUrl}?user=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(userData => {
        console.log('User data:', userData);
        setBestScore(userData);
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });

      fetch(getUsersUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(usersData => {
        const sortedUsers = usersData.sort((a, b) => (a.hitNumber - a.faultNumber) < (b.hitNumber - b.faultNumber) ? 1 : -1);
        setTopPlayers(sortedUsers.slice(0, 3)); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    })
    .catch(error => {
      console.error('Error al registrar:', error);
    });
  }, [username, successfulClicks, failedClicks]);

  return (
    <div className="result-screen">
      <audio ref={audioRef} loop>
        <source src={cancion} type="audio/mpeg" />
      </audio>
      <div className="result-1player">
        <h1>BUEN TRABAJO: {username}</h1>
        <p> + ENEMIGOS ELIMINADOS: {successfulClicks}</p>
        <p> - DISPAROS FALLADOS: {failedClicks}</p>
        <h2>MAXIMO RENDIMIENTO</h2>
        {bestScore && (
          <>
            <p> + ENEMIGOS ELIMINADOS: {bestScore.hitNumber}</p>
            <p> - DISPAROS FALLADOS: {bestScore.faultNumber}</p>
          </>
        )}
        <div className="restart">
          <button onClick={onRestart}>Reiniciar</button>        
        </div> 
      </div>
      <div className="result-best3players">
        <h1>TOP JUGADORES</h1>
        {topPlayers.map((player, index) => (
          <div key={index} className={`top-${index + 1}`}>
            <h2>Nº{index + 1}: {player.user}</h2>
            <p>ENEMIGOS ELIMINADOS: {player.hitNumber}</p>
            <p>DISPAROS FALLADOS: {player.faultNumber}</p>
          </div>
        ))}
      </div>     
    </div>
  );
}