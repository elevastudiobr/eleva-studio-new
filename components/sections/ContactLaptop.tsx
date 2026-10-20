
"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

type ContactLaptopModelProps = {
  progressRef: React.MutableRefObject<number>;
};

function ContactLaptopModel({
  progressRef,
}: ContactLaptopModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/desktop.glb");
  const screenTexture = useTexture("/images/contact/faq-screen.png");

  const { model, materials } = useMemo(() => {
    const clonedModel = scene.clone(true);
    const clonedMaterials: THREE.Material[] = [];

    clonedModel.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const cloneMaterial = (material: THREE.Material) => {
        const clonedMaterial = material.clone();

        clonedMaterial.transparent = false;
        clonedMaterial.opacity = 1;

        clonedMaterials.push(clonedMaterial);

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
      materials: clonedMaterials,
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
    const clonedTexture = screenTexture.clone();

    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.minFilter = THREE.LinearMipmapLinearFilter;
    clonedTexture.magFilter = THREE.LinearFilter;
    clonedTexture.generateMipmaps = true;
    clonedTexture.anisotropy = 16;
    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [screenTexture]);

  const imageAspect = useMemo(() => {
    const image = screenTexture.image as
      | { width?: number; height?: number }
      | undefined;

    if (!image?.width || !image?.height) return 16 / 9;

    return image.width / image.height;
  }, [screenTexture]);

  const screenWidth = size.x * 0.92;
  const screenHeight = screenWidth / imageAspect;

  const screenPosition = useMemo<[number, number, number]>(
    () => [
      0,
      size.y * 1.0 - center.y,
      size.z * -0.48 - center.z,
    ],
    [center, size]
  );

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const progress = THREE.MathUtils.clamp(
      progressRef.current,
      0,
      1
    );

    const easedProgress = THREE.MathUtils.smoothstep(
      progress,
      0,
      1
    );

    // Sem fade: laptop e tela aparecem totalmente visíveis.
    group.visible = true;

    /*
      Zoom inicial aumentado.
      O laptop começa grande e diminui com a rolagem.
    */
    const initialScale = baseScale * 2.0;
    const finalScale = baseScale * 0.72;

    const currentScale = THREE.MathUtils.lerp(
      initialScale,
      finalScale,
      easedProgress
    );

    group.scale.setScalar(currentScale);

    group.position.x = -center.x * currentScale;

    group.position.y =
      -center.y * currentScale +
      THREE.MathUtils.lerp(0.08, 0, easedProgress);

    group.position.z = THREE.MathUtils.lerp(
      0,
      -0.2,
      easedProgress
    );

    group.rotation.x = THREE.MathUtils.lerp(
      -0.06,
      0,
      easedProgress
    );

    group.rotation.y = THREE.MathUtils.lerp(
      -0.1,
      0,
      easedProgress
    );

    group.rotation.z = 0;

    materials.forEach((material) => {
      material.transparent = false;
      material.opacity = 1;
      material.depthWrite = true;
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />

      <mesh position={screenPosition} renderOrder={10}>
        <planeGeometry args={[screenWidth, screenHeight]} />

        <meshBasicMaterial
          map={texture}
          transparent={false}
          opacity={1}
          side={THREE.DoubleSide}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

type ContactLaptopProps = {
  progressRef: React.MutableRefObject<number>;
};

export default function ContactLaptop({
  progressRef,
}: ContactLaptopProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{
          position: [0, 0.15, 4.5],
          fov: 35,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        style={{
          background: "transparent",
          display: "block",
        }}
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
          <ContactLaptopModel progressRef={progressRef} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/desktop.glb");
