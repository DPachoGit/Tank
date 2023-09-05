import React, { useEffect, useRef } from 'react';
import { Debug } from '@react-three/cannon';
import Level from './Level';
import Player from './Player';
import { useControls } from 'leva';
import { create } from 'zustand';
import { AnimationMixer } from 'three';
import cancion from './audio/02.mp3';

export const useStore = create(() => ({
  groundObjects: {},
  actions: {},
  mixer: new AnimationMixer(),
}));

function ToggleDebug({ children }) {
  const debugRendererVisible = useControls('Debug Renderer', { visible: false });

  return <>{debugRendererVisible.visible ? <Debug>{children}</Debug> : <>{children}</>}</>;
}

export default function Game({ successfulClicks, failedClicks, setSuccessfulClicks, setFailedClicks }) {
  const audioContext = useRef(new AudioContext());
  const gainNode = useRef(audioContext.current.createGain());
  const audioSource = useRef(null);

  const defaultVolume = 0.1;

  useEffect(() => {
    const context = audioContext.current;

    fetch(cancion)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        context.decodeAudioData(buffer, decodedBuffer => {
          audioSource.current = context.createBufferSource();
          audioSource.current.buffer = decodedBuffer;
          audioSource.current.connect(gainNode.current);
          gainNode.current.connect(context.destination);
          gainNode.current.gain.value = defaultVolume;
          audioSource.current.loop = true;
          audioSource.current.start();
        });
      });

    return () => {
      if (audioSource.current) {
        audioSource.current.stop();
        audioSource.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <ToggleDebug>
        <Level successfulClicks={successfulClicks} failedClicks={failedClicks} setSuccessfulClicks={setSuccessfulClicks} setFailedClicks={setFailedClicks} />
        <Player position={[0, 1, 0]} />
      </ToggleDebug>
    </>
  );
}
