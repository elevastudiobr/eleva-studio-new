
"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PHRASE = "Experiências digitais que elevam negócios.";

function DesktopModel() {
  const { scene } = useGLTF("/models/desktop.glb");
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = maxDimension > 0 ? 3 / maxDimension : 1;

    clone.scale.setScalar(scale);
    clone.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    return clone;
  }, [scene]);

  const startPosition = useMemo(
    () => new THREE.Vector3(0.7, 4, -5.5),
    []
  );

  const endPosition = useMemo(
    () => new THREE.Vector3(0, 0.38, 0),
    []
  );

  useFrame((_, delta) => {
    const group = groupRef.current;

    if (!group) return;

    elapsed.current += Math.min(delta, 0.05);

    const progress = Math.min(elapsed.current / 3.4, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    group.position.lerpVectors(
      startPosition,
      endPosition,
      eased
    );

    group.scale.setScalar(
      THREE.MathUtils.lerp(0.58, 1.02, eased)
    );

    group.rotation.x = THREE.MathUtils.lerp(0.32, 0, eased);
    group.rotation.y = THREE.MathUtils.lerp(-1.15, 0, eased);
    group.rotation.z = THREE.MathUtils.lerp(-0.2, 0, eased);
  });

  return (
    <group ref={groupRef} position={[0.7, 4, -5.5]}>
      <primitive object={model} />
    </group>
  );
}

function ScreenText() {
  const meshRef = useRef<THREE.Mesh>(null);

  const materialRef =
    useRef<THREE.MeshBasicMaterial>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const textureRef =
    useRef<THREE.CanvasTexture | null>(null);

  const elapsed = useRef(0);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      await document.fonts.ready;

      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;

      const texture = new THREE.CanvasTexture(canvas);

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      canvasRef.current = canvas;
      textureRef.current = texture;

      if (materialRef.current) {
        materialRef.current.map = texture;
        materialRef.current.needsUpdate = true;
      }

      setFontReady(true);
    }

    initialize().catch((error) => {
      console.error("Falha ao inicializar o texto:", error);
    });

    return () => {
      cancelled = true;
      textureRef.current?.dispose();
      textureRef.current = null;
      canvasRef.current = null;
    };
  }, []);

  useFrame((_, delta) => {
    if (!fontReady) return;

    elapsed.current += Math.min(delta, 0.05);

    const canvas = canvasRef.current;
    const texture = textureRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !texture || !context) return;

    const progress = THREE.MathUtils.clamp(
      (elapsed.current - 3.6) / 4.5,
      0,
      1
    );

    const visibleText = PHRASE.slice(
      0,
      Math.floor(progress * PHRASE.length)
    );

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fonte grande e encorpada.
    context.font = '900 58px "Arial Black", Arial, sans-serif';
    context.textAlign = "center";
    context.textBaseline = "middle";

    const maxWidth = 960;
    const words = visibleText.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    // Quebra o texto em linhas para caber na tela.
    for (const word of words) {
      const candidate = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (
        context.measureText(candidate).width > maxWidth &&
        currentLine
      ) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = candidate;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    const lineHeight = 82;

    const startY =
      canvas.height / 2 -
      ((lines.length - 1) * lineHeight) / 2;

    // Brilho sutil atrás das letras.
    context.shadowColor = "rgba(91, 85, 255, 0.55)";
    context.shadowBlur = 12;

    lines.forEach((line, index) => {
      const x = canvas.width / 2;
      const y = startY + index * lineHeight;

      // Reforça o peso da tipografia.
      context.lineJoin = "round";
      context.strokeStyle = "#ffffff";
      context.lineWidth = 1.5;
      context.strokeText(line, x, y, maxWidth);

      context.fillStyle = "#ffffff";
      context.fillText(line, x, y, maxWidth);
    });

    context.shadowBlur = 0;

    texture.needsUpdate = true;

    if (meshRef.current && materialRef.current) {
      meshRef.current.visible = elapsed.current >= 3.4;

      materialRef.current.opacity =
        THREE.MathUtils.clamp(
          (elapsed.current - 3.4) / 0.5,
          0,
          1
        );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0.42, 0.16]}
      renderOrder={10}
    >
      <planeGeometry args={[2.15, 1.08]} />

      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0}
        toneMapped={false}
        depthTest={false}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.18} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={0.65}
        color="#d8d8e8"
      />

      <directionalLight
        position={[-4, 2, 1]}
        intensity={0.9}
        color="#4540a8"
      />

      <pointLight
        position={[0, 1, -2]}
        intensity={0.25}
        color="#087dff"
      />

      <Suspense fallback={null}>
        <Environment
          preset="studio"
          environmentIntensity={0.2}
        />

        <DesktopModel />
        <ScreenText />
      </Suspense>
    </>
  );
}

export default function DesktopScene() {
  return (
    <div className="h-[500px] w-full md:h-[680px]">
      <Canvas
        camera={{
          position: [0, 0.1, 5.5],
          fov: 32,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/desktop.glb");
