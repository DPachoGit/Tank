import { Suspense, useMemo, useRef } from 'react'
import { Vector3, Euler, Quaternion, Matrix4 } from 'three'
import Eve from './Eve'
import { useCompoundBody, useContactMaterial } from '@react-three/cannon'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { Vec3 } from 'cannon-es'
import useFollowCam from './useFollowCam'
import { useStore } from './Game'

export default function PlayerCollider({ position }) {
  const { pivot } = useFollowCam()
  const playerGrounded = useRef(false)
  const inJumpAction = useRef(false)
  const group = useRef()
  const velocity = useMemo(() => new Vector3(), [])
  const inputVelocity = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(), [])
  const quat = useMemo(() => new Quaternion(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const worldPosition = useMemo(() => new Vector3(), [])
  const raycasterOffset = useMemo(() => new Vector3(), [])
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), [])
  const down = useMemo(() => new Vec3(0, -1, 0), [])
  const rotationMatrix = useMemo(() => new Matrix4(), [])
  const prevActiveAction = useRef(0)
  const keyboard = useKeyboard()

  const { groundObjects, actions, mixer } = useStore((state) => state)

  useContactMaterial('ground', 'slippery', {
    friction: 0,
    restitution: 0.01,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })

  const [ref, body] = useCompoundBody(
    () => ({
      mass: 1,
      shapes: [
        { args: [0.25], position: [0, 0.25, 0], type: 'Sphere' },        
        { args: [2, 0.50, 2], position: [0, 1, 0], type: 'Box' },
      ],
      onCollide: (e) => {
        if (e.contact.bi.id !== e.body.id) {
          contactNormal.set(...e.contact.ni)
        }
        if (contactNormal.dot(down) > 0.5) {
          if (inJumpAction.current) {
            inJumpAction.current = false
          }
        }
      },
      material: 'slippery',
      linearDamping: 0,
      position: position
    }),
    useRef()
  )

  useFrame(({ raycaster }, delta) => {
    let activeAction = 0 
    body.angularFactor.set(0, 0, 0)

    ref.current.getWorldPosition(worldPosition)

    playerGrounded.current = false
    raycasterOffset.copy(worldPosition)
    raycasterOffset.y += 0.01
    raycaster.set(raycasterOffset, down)
    raycaster.intersectObjects(Object.values(groundObjects), false).forEach((i) => {
      
      if (i.distance < 0.021) {
        playerGrounded.current = true
      }
    })
    if (!playerGrounded.current) {
      body.linearDamping.set(0)
    } else {
      body.linearDamping.set(0.9999999)
    }

    const distance = worldPosition.distanceTo(group.current.position)

    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (distance > 0.0001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 20)
    }
    if (document.pointerLockElement) {
      inputVelocity.set(0, 0, 0)
      if (playerGrounded.current) {
        if (keyboard['KeyW']) {
          activeAction = 1
          inputVelocity.z = -10 * delta
        }
        if (keyboard['KeyS']) {
          activeAction = 1
          inputVelocity.z = 10 * delta
        }
        if (keyboard['KeyA']) {
          activeAction = 1
          inputVelocity.x = -10 * delta
        }
        if (keyboard['KeyD']) {
          activeAction = 1
          inputVelocity.x = 10 * delta
        }
      }
      inputVelocity.setLength(1.3) // clamps walking speed

      if (activeAction !== prevActiveAction.current) {
        if (prevActiveAction.current !== 1 && activeAction === 1) {
        }
        if (prevActiveAction.current !== 0 && activeAction === 0) {
        }
        prevActiveAction.current = activeAction
      }

      if (keyboard['Space']) {
        if (playerGrounded.current && !inJumpAction.current) {
          console.log('jump')
          activeAction = 2
          inJumpAction.current = true
          inputVelocity.y = 6
        }
      }

      euler.y = pivot.rotation.y
      euler.order = 'YZX'
      quat.setFromEuler(euler)
      inputVelocity.applyQuaternion(quat)
      velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z)

      body.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0])
    }

    if (activeAction === 1) {
      mixer.update(delta * distance * 22.5)
    } else {
      mixer.update(delta)
    }

    group.current.position.lerp(worldPosition, 0.3)

    pivot.position.lerp(worldPosition, 0.1)
  })

  return (
    <>
      <group ref={group} position={position}>
        <Suspense fallback={null}>
          <Eve />
        </Suspense>
      </group>
    </>
  )
}
