import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Eve() {
  const ref = useRef()
  const canon = useRef()
  const lows = useRef()
  const turret = useRef()

  const {nodes} = useGLTF('./models/player.glb')

  const tankCanonNode = nodes['T_TankCanon']
  const tankLowsNode = nodes['T_TankLows']
  const tanqueTurretNode = nodes['T_TanqueTurret']

  useEffect(() => {

    if (ref.current) {
      ref.current.rotation.y = Math.PI / 1;
    }
  }, []);

  return (
    <group ref={ref} name="Armature" rotation={[Math.PI / 100000, 0, 0]}>
      <primitive ref={canon} object={tankCanonNode} />
      <primitive ref={lows} object={tankLowsNode} />
      <primitive ref={turret} object={tanqueTurretNode} />
    </group>
  )
}

useGLTF.preload(['./models/player.glb'])