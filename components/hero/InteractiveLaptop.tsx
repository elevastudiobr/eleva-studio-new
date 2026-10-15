
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
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const { model, fadeMaterials } = useMemo(() => {
    const clonedModel = scene.clone(true);
    const materials: THREE.Material[] = [];

    // Cria materiais independentes para controlar o fade
    // sem alterar o modelo original armazenado pelo Three.js.
    clonedModel.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const cloneMaterial = (material: THREE.Material) => {
        const clonedMaterial = material.clone();
        clonedMaterial.transparent = true;
        materials.push(clonedMaterial);
        return clonedMaterial;
      };

      if (Array.isArray(object.material)) {
        object.material = object.material.map(cloneMaterial);
      } else {
        object.material = cloneMaterial(object.material);
      }
    });

    return {
      model: clonedModel,
      fadeMaterials: materials,
    };
  }, [scene]);

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

    // O laptop desaparece junto com a revelação do portfólio.
    // 0.88 corresponde ao início da revelação da seção Projects.
    const fadeProgress = THREE.MathUtils.smoothstep(
      progress,
      0.88,
      1
    );

    const opacity = 1 - fadeProgress;

    fadeMaterials.forEach((material) => {
      material.opacity = opacity;
      material.depthWrite = opacity > 0.98;
    });

    if (screenMaterialRef.current) {
      screenMaterialRef.current.opacity = opacity;
      screenMaterialRef.current.depthWrite = opacity > 0.98;
    }

    // Mantém o movimento e a escala originais.
    const targetScale = baseScale * (1 + progress * 4.5);

    group.scale.setScalar(
      THREE.MathUtils.damp(group.scale.x, targetScale, 3, delta)
    );

    // Posição horizontal
    group.position.x = -center.x * baseScale + progress * 0;

    // Posição vertical
    group.position.y =
      -center.y * baseScale +
      Math.sin(elapsed * 0.65) * 0.045 +
      progress * -2.8;

    // Profundidade: aproxima o laptop da câmera
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
          ref={screenMaterialRef}
          map={texture}
          transparent
          opacity={1}
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
