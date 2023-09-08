import { Suspense, useRef, useState } from "react";
import * as THREE from 'three';
import { FadeIn } from "./banana-styles";
import dynamic from 'next/dynamic';
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), { ssr: false });
// const useFrame = dynamic(() => import("@react-three/fiber").then(mod => mod.useFrame), { ssr: false });
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
// import { Environment, Detailed, useGLTF } from "@react-three/drei";
const Environment = dynamic(() => import("@react-three/drei").then(mod => mod.Environment), { ssr: false });
const Detailed = dynamic(() => import("@react-three/drei").then(mod => mod.Detailed), { ssr: false });
// const useGLTF = dynamic(() => import("@react-three/drei").then(mod => mod.useGLTF), { ssr: false });
import { useGLTF } from "@react-three/drei";
const DepthOfField = dynamic(() => import("@react-three/postprocessing").then(mod => mod.DepthOfField), { ssr: false });
const EffectComposer = dynamic(() => import("@react-three/postprocessing").then(mod => mod.EffectComposer), { ssr: false });

const BananaBackground = (props) => {
    return (
        <div className="h-[100vh] w-[100vw] overflow-hidden">
            <Suspense fallback={null}>
                <Bananas />
                <FadeIn />
            </Suspense>
            { props.children }
        </div>
    )
}

function Banana({ index, z, speed }) {
    const ref = useRef();

    const { viewport, camera } = useThree();

    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

    const { nodes, materials } = useGLTF('/pencil.glb');

    const [data] = useState({
        y: THREE.MathUtils.randFloatSpread(height * 2),
        x: THREE.MathUtils.randFloatSpread(2),
        spin: THREE.MathUtils.randFloat(8, 12),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    });

    useFrame((state, dt) => {
        if (dt < 0.1) ref?.current?.position?.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)

        ref?.current?.rotation?.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))

        if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    });

    return (
        <>
            {/* @ts-expect-error */}
            <group ref={ref} distances={[0, 65, 80]} scale={5}>
                {/* Banana Mesh */}
                {/* <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials["ripe-banana_u1_v1"]}
                /> */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.defaultMaterial.geometry}
                    material={materials.Default}
                />
            </group>
        </>
    )
}

// useGLTF.preload("/banana.glb");

function Bananas({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
    return (
        // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
            <color attach="background" args={['#E5E4E2']} />
            {/* <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="white" /> */}
            {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
            {Array.from({ length: count }, (_, i) => <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}
            <Environment preset="sunset" />
            {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster) */}
            <EffectComposer>
                <DepthOfField />
            </EffectComposer>
        </Canvas>
    )
}

export default BananaBackground;

