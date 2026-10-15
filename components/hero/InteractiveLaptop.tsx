"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

type LaptopModelProps = {
  progressRef: React.MutableRefObject<number>;
};

function LaptopModel({ progressRef }: LaptopModelProps) {
  const { scene } = useGLTF("/models/desktop.glb");
  const screenTexture = useTexture("/images/hero/portifolio.webp");
  const groupRef = useRef<THREE.Group>(null);

  const model = useMemo(() => scene.clone(true), [scene]);

  const { center, size } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);

    return {
      center: box.getCenter(new THREE.Vector3()),
      size: box.getSize(new THREE.Vector3()),
    };
  }, [model]);

  const baseScale = useMemo(() => {
    const maxDimension = Math.max(size.x, size.y, size.z, 0.001);
    return 1.45 / maxDimension;
  }, [size]);

  const texture = useMemo(() => {
    const cloned = screenTexture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.needsUpdate = true;
    return cloned;
  }, [screenTexture]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = THREE.MathUtils.clamp(
      progressRef.current,
      0,
      1
    );

    const elapsed = state.clock.elapsedTime;

    // Aumenta o desktop durante o scroll
    const targetScale = baseScale * (1 + progress * 4.5);

    group.scale.setScalar(
      THREE.MathUtils.damp(group.scale.x, targetScale, 3, delta)
    );

    // Posição horizontal
    group.position.x = -center.x * baseScale + progress * 0;

    // Posição vertical: abaixa o desktop no frame final
    group.position.y =
      -center.y * baseScale +
      Math.sin(elapsed * 0.65) * 0.045 +
      progress * -2.8;

    // Profundidade: aproxima o desktop da câmera
    group.position.z =
      -center.z * baseScale + progress * 2.8;

    // Inclinação inicial e correção progressiva
    const targetRotationX =
      -0.2 * (1 - progress) +
      Math.sin(elapsed * 0.45) * 0.025;

    const targetRotationY =
      -0.5 * (1 - progress) +
      Math.sin(elapsed * 0.3) * 0.04;

    const targetRotationZ =
      -0.16 * (1 - progress) +
      Math.sin(elapsed * 0.4) * 0.025;

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      targetRotationX,
      2,
      delta
    );

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotationY,
      2,
      delta
    );

    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      targetRotationZ,
      2,
      delta
    );
  });

  const imageAspect =
    screenTexture.image.width / screenTexture.image.height;

  const screenWidth = size.x * 0.92;
  const screenHeight = screenWidth / imageAspect;

  return (
    <group ref={groupRef}>
      <primitive object={model} />

      <mesh
        position={[
          0,
          size.y * 0.50,
          size.z * -0.48,
        ]}
        renderOrder={10}
      >
        <planeGeometry args={[screenWidth, screenHeight]} />

        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  );
}

type InteractiveLaptopProps = {
  progressRef: React.MutableRefObject<number>;
  className?: string;
};

export default function InteractiveLaptop({
  progressRef,
  className = "",
}: InteractiveLaptopProps) {
  return (
    <div
      className={className}
      style={{
        background: "transparent",
        filter: "brightness(0.72)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.15, 6], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={2.2}
        />

        <pointLight
          position={[-4, 1, -2]}
          intensity={1.5}
          color="#625bff"
        />

        <Suspense fallback={null}>
          <LaptopModel progressRef={progressRef} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/desktop.glb");