import React from 'react';

function EnterScreen({ onEnter }) {
  return (
    <div className="enter-screen">
      <h1>MAZORCA PRODUCTIONS</h1>
      <button onClick={onEnter}>ENTRAR AL JUEGO</button>
    </div>
  );
}

export default EnterScreen;