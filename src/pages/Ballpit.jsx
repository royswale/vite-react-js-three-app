// https://docs.pmnd.rs/react-three-fiber/getting-started/examples

// Ballpit
// https://codesandbox.io/s/ballpit-mvkqs?file=/src/App.js

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing"
import { ResizeObserver } from "@juggle/resize-observer";

// import globalThis from 'globalthis';
// globalThis();

export default function Ballpit() {
  return (
    <Canvas resize={{ polyfill: ResizeObserver }} shadows gl={{ stencil: false, depth: false, alpha: false, antialias: false }} camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>
      <fog attach="fog" args={["red", 25, 40]} />
      <color attach="background" args={["#ffdd41"]} />
      <ambientLight intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <directionalLight
        castShadow
        intensity={2}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics gravity={[0, -50, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
        <group position={[0, 0, -10]}>
          <Mouse />
          <Borders />
          <InstancedSpheres />
        </group>
      </Physics>
      <EffectComposer multisampling={0}>
        <SSAO samples={11} radius={30} intensity={20} luminanceInfluence={0.6} color="red" />
        <SSAO samples={21} radius={7} intensity={20} luminanceInfluence={0.6} color="red" />
        <Bloom intensity={1.25} kernelSize={2} luminanceThreshold={0.8} luminanceSmoothing={0.0} />
      </EffectComposer>
    </Canvas>
  )
}

function InstancedSpheres({ count = 200 }) {
  const { viewport } = useThree()
  const [ref] = useSphere((index) => ({ mass: 100, position: [4 - Math.random() * 8, viewport.height, 0, 0], args: [1.1] }))
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
      <sphereBufferGeometry args={[1.1, 32, 32]} />
      <meshLambertMaterial color="#ff7b00" />
    </instancedMesh>
  )
}

function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [6] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7))
}
