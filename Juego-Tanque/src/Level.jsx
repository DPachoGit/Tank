import React, { useState, useEffect, useRef } from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from './Game';
import ResultScreen from './ResultScreen';


export default function Level({ successfulClicks, failedClicks, setSuccessfulClicks, setFailedClicks }) {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [raycastLine, setRaycastLine] = useState(null);

  const { camera } = useThree();
  const raycaster = new THREE.Raycaster();

  const [showResultScreen, setShowResultScreen] = useState(false);


  const cityRef = useRef();
  const enemy1Ref = useRef();
  const enemy2Ref = useRef();
  const enemy3Ref = useRef();
  const enemy4Ref = useRef();
  const enemy5Ref = useRef();
  const enemy6Ref = useRef();
  const enemy7Ref = useRef();
  const enemy8Ref = useRef();
  const enemy9Ref = useRef();
  const enemy10Ref = useRef();
  const enemy11Ref = useRef();
  const enemy12Ref = useRef();
  const enemy13Ref = useRef();
  const enemy14Ref = useRef();
  const enemy15Ref = useRef();
  const enemy16Ref = useRef();
  const enemy17Ref = useRef();
  const enemy18Ref = useRef();
  const enemy19Ref = useRef();
  const enemy20Ref = useRef();
  const ref = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], material: 'ground' }), useRef());

  const [cubeRef1] = useBox(() => ({
    type: 'Static',
    args: [13, 2, 13], 
    position: [-8.8, 1, -23.5], 
  }));

  const [cubeRef2] = useBox(() => ({
    type: 'Static',
    args: [8.3, 2, 8.3], 
    position: [-10, 1, -7.3], 
  }));

  const [cubeRef3] = useBox(() => ({
    type: 'Static',
    args: [6, 2, 30.5], 
    position: [8.3, 1, -15], 
  }));

  const [cubeRef4] = useBox(() => ({
    type: 'Static',
    args: [7, 2, 30.5], 
    position: [-25.7, 1, -15], 
  }));

  const [cubeRef5] = useBox(() => ({
    type: 'Static',
    args: [21, 2, 7], 
    position: [-8.6, 1, 9], 
  }));

  const [cubeRef6] = useBox(() => ({
    type: 'Static',
    args: [21, 2, 7], 
    position: [-8.3, 1, -41], 
  }));

  const groundObjects = useStore((state) => state.groundObjects);
  const { nodes } = useGLTF('./models/level.glb');

  const cityNode = nodes['C_City'];
  const enemy1Node = nodes['Enemy01'];
  const enemy2Node = nodes['Enemy02'];
  const enemy3Node = nodes['Enemy03'];
  const enemy4Node = nodes['Enemy04'];
  const enemy5Node = nodes['Enemy05'];
  const enemy6Node = nodes['Enemy06'];
  const enemy7Node = nodes['Enemy07'];
  const enemy8Node = nodes['Enemy08'];
  const enemy9Node = nodes['Enemy09'];
  const enemy10Node = nodes['Enemy10'];
  const enemy11Node = nodes['Enemy11'];
  const enemy12Node = nodes['Enemy12'];
  const enemy13Node = nodes['Enemy13'];
  const enemy14Node = nodes['Enemy14'];
  const enemy15Node = nodes['Enemy15'];
  const enemy16Node = nodes['Enemy16'];
  const enemy17Node = nodes['Enemy17'];
  const enemy18Node = nodes['Enemy18'];
  const enemy19Node = nodes['Enemy19'];
  const enemy20Node = nodes['Enemy20'];


  const handleMouseClick = () => {
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects([
        enemy1Ref.current,
        enemy2Ref.current,
        enemy3Ref.current,
        enemy4Ref.current,
        enemy5Ref.current,
        enemy6Ref.current,
        enemy7Ref.current,
        enemy8Ref.current,
        enemy9Ref.current,
        enemy10Ref.current,
        enemy11Ref.current,
        enemy12Ref.current,
        enemy13Ref.current,
        enemy14Ref.current,
        enemy15Ref.current,
        enemy16Ref.current,
        enemy17Ref.current,
        enemy18Ref.current,
        enemy19Ref.current,
        enemy20Ref.current,
    ]);

    let clickedOnEnemy = false;
  
    intersects.forEach((intersection) => {
      const enemyRef = intersection.object;
      if (enemyRef.visible) {
        enemyRef.visible = false;
        setSuccessfulClicks(prevSuccessfulClicks => prevSuccessfulClicks + 1);
        clickedOnEnemy = true;
      }
    });

    if (!clickedOnEnemy) {
      setFailedClicks(prevsetFailedClicks => prevsetFailedClicks + 1);
    }
  };
  
  // Attach click event listener
  useEffect(() => {
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  useEffect(() => {
    const id = ref.current.id;
    groundObjects[id] = ref.current;
    return () => {
      delete groundObjects[id];
    };
  }, [groundObjects, ref]);

  return (
  <>
    <group>
      
      {/* */}
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[-8.5, 0, -16]} receiveShadow>
        <planeGeometry args={[42, 57]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {/* */}
      <mesh ref={cubeRef1} />
      <mesh ref={cubeRef2} />
      <mesh ref={cubeRef3} />
      <mesh ref={cubeRef4} />
      <mesh ref={cubeRef5} />
      <mesh ref={cubeRef6} />

      {/* */}
      <primitive ref={cityRef} object={cityNode} />

      {/* */}
      <primitive ref={enemy1Ref} object={enemy1Node} />
      <primitive ref={enemy2Ref} object={enemy2Node} />
      <primitive ref={enemy3Ref} object={enemy3Node} />
      <primitive ref={enemy4Ref} object={enemy4Node} />
      <primitive ref={enemy5Ref} object={enemy5Node} />
      <primitive ref={enemy6Ref} object={enemy6Node} />
      <primitive ref={enemy7Ref} object={enemy7Node} />
      <primitive ref={enemy8Ref} object={enemy8Node} />
      <primitive ref={enemy9Ref} object={enemy9Node} />
      <primitive ref={enemy10Ref} object={enemy10Node} />
      <primitive ref={enemy11Ref} object={enemy11Node} />
      <primitive ref={enemy12Ref} object={enemy12Node} />
      <primitive ref={enemy13Ref} object={enemy13Node} />
      <primitive ref={enemy14Ref} object={enemy14Node} />
      <primitive ref={enemy15Ref} object={enemy15Node} />
      <primitive ref={enemy16Ref} object={enemy16Node} />
      <primitive ref={enemy17Ref} object={enemy17Node} />
      <primitive ref={enemy18Ref} object={enemy18Node} />
      <primitive ref={enemy19Ref} object={enemy19Node} />
      <primitive ref={enemy20Ref} object={enemy20Node} />

    </group>

    {raycastLine}

  </>   
  );
}