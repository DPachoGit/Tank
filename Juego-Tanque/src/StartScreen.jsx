import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import cancion from './audio/01.mp3';

export default function StartScreen({ onStart, username, setUsername }) {

  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleStartClick = () => {
    onStart(username);
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.1;
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="start-screen">
      <div className="start-container1">
        <h1>20 SEGUNDOS</h1>
        <div className="user-info">
          <h2>COMO TE LLAMAS SOLDADO</h2>
          <form className="user-form">
            <label htmlFor="username-input"></label>
            <input
              type="text"
              id="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="* * *"
            />
            <button type="button" onClick={handleStartClick}>
              JUGAR
            </button>
            <audio ref={audioRef} loop>
        <source src={cancion} type="audio/mpeg" />
      </audio>

      <button type="button" onClick={handleMuteClick}>
        {isMuted ? 'Activar Sonido' : 'Silenciar'}
      </button>
          </form>
        </div>
      </div>
      <div className="start-container2">
        <div className="keybinds-container">
          <h2>CONTROLES</h2>
            <div className="keybinds">
              <h3>MOVIMIENTO</h3>
              <h3>DISPARO</h3>
            </div>
            <div className="controles">
              <div className="movimiento">
                <div className="w-movimiento">
                  <p>W</p>
                </div>
                <div className="asd-movimiento">
                  <div className="a-movimiento">
                    <p>A</p>
                    </div>
                  <div className="s-movimiento">
                    <p>S</p>
                    </div>
                  <div className="d-movimiento">
                    <p>D</p>
                    </div>
                </div>
              </div>
              <div className="disparo">
                <div className="un-rectangulo">
                  <div className="otro-rectangulo">

                  </div>
                  <div className="linea">

                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="instructions">
          <h2>INSTRUCCIONES</h2>
          <p>Soldado, escuchame con atencion. Tenemos una oportunidad critica frente a nosotros. En los proximos 20 segundos, estaras al mando de un tanque de combate. Tu mision es clara: eliminar al mayor numero de enemigos posible y cambiar el rumbo de esta batalla a nuestro favor.
          </p>
        </div>
      </div>
    </div>
  );
}