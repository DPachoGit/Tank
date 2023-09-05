import { Canvas } from '@react-three/fiber'
import { Stats, useProgress, Html } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen'; 
import ResultScreen from './ResultScreen'
import EnterScreen from './EnterScreen';

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function App() {

  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [failedClicks, setFailedClicks] = useState(0);
  const [screen, setScreen] = useState('enter');
  const [username, setUsername] = useState('');


  const handleEnter = () => {
    setScreen('start');
  };

  const handleStart = (name) => {
    setUsername(name);
    setScreen('game');
  };

  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (screen === 'game') {
    
      const timer = setTimeout(() => {
        setScreen('result');
      }, 22000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [screen]);
  

  return (
    <>
      {screen === 'enter' && <EnterScreen onEnter={handleEnter} />}

      {screen === 'start' && (
        <StartScreen onStart={handleStart} username={username} setUsername={setUsername} />
      )}

      {screen === 'game' && (
        <>
          <div id="crosshair">
            <div className="crosshair-horizontal"></div>
            <div className="crosshair-vertical"></div>
          </div>
          <Canvas
            shadows
            onPointerDown={(e) => {
              e.target.requestPointerLock();
            }}
          >
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={1} />
              <spotLight
                position={[10, 5, 600]}
                angle={Math.PI / 3}
                penumbra={0.1}
                castShadow
                shadow-mapSize-height={1000}
                shadow-mapSize-width={1000}
              />
              <spotLight
                position={[-10, 5, 600]}
                angle={Math.PI / 3}
                penumbra={0.1}
                castShadow
                shadow-mapSize-height={1000}
                shadow-mapSize-width={1000}
              />
              <Physics>
                <Game
                  successfulClicks={successfulClicks}
                  failedClicks={failedClicks}
                  setSuccessfulClicks={setSuccessfulClicks}
                  setFailedClicks={setFailedClicks}
                />
              </Physics>
              <Stats />
            </Suspense>
          </Canvas>
        </>
      )}

      {screen === 'result' && (
        <ResultScreen
          username={username}
          successfulClicks={successfulClicks}
          failedClicks={failedClicks - 1}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}