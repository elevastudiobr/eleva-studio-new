
"use client";

import { useEffect, useRef } from "react";

type LiquidBackgroundProps = {
  reducedMotion?: boolean;
};

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 vUv;

  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_mouseVelocity;
  uniform float u_distortion;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = p * 2.0 + 0.13;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(
      u_resolution.x / u_resolution.y,
      1.0
    );

    vec2 p = (uv - 0.5) * aspect;
    vec2 mouse = (u_mouse - 0.5) * aspect;

    // Distância entre o cursor e cada ponto do fundo.
    vec2 delta = p - mouse;
    float distanceToMouse = length(delta);

    // A velocidade influencia a intensidade da onda.
    float influence = exp(
      -distanceToMouse * distanceToMouse * 15.0
    ) * u_distortion;

    // A onda empurra o espaço na direção oposta ao cursor.
    vec2 direction = normalize(delta + vec2(0.00001));

    float wave = sin(
      distanceToMouse * 24.0 - u_time * 2.0
    );

    float waveEnvelope = exp(-distanceToMouse * 5.0);

    vec2 displacement = direction
      * wave
      * waveEnvelope
      * (0.055 + length(u_mouseVelocity) * 0.025)
      * u_distortion;

    // Deslocamento adicional conforme a direção do movimento.
    displacement -= u_mouseVelocity
      * influence
      * 0.055;

    // Distorção aplicada às coordenadas do próprio background.
    vec2 distortedUV = uv + displacement / aspect;

    vec2 warped = (distortedUV - 0.5) * aspect;

    float t = u_time;

    vec2 flow = vec2(
      fbm(warped * 2.2 + vec2(t * 0.045, -t * 0.025)),
      fbm(warped * 2.2 + vec2(-t * 0.035, t * 0.04))
    );

    warped += (flow - 0.5) * 0.16;

    float n1 = fbm(warped * 2.8 + vec2(t * 0.025, 0.0));
    float n2 = fbm(warped * 4.0 - flow * 1.4);
    float n3 = fbm(warped * 1.6 + flow * 1.8);

    float wave1 = sin(
      warped.x * 3.4
      + sin(warped.y * 3.0 + t * 0.20) * 1.2
      + n1 * 2.6
    );

    float wave2 = sin(
      warped.y * 4.2
      - warped.x * 2.0
      + n2 * 2.2
    );

    float ridges = pow(
      max(0.0, 1.0 - abs(wave1 * 0.65 + wave2 * 0.35)),
      4.0
    );

    vec3 deepBlue = vec3(0.008, 0.012, 0.035);
    vec3 violet = vec3(0.30, 0.12, 1.0);
    vec3 blue = vec3(0.025, 0.24, 1.0);
    vec3 cyan = vec3(0.02, 0.72, 1.0);

    vec3 color = deepBlue;

    color += violet
      * smoothstep(0.36, 0.78, n1)
      * 0.52;

    color += blue
      * smoothstep(0.40, 0.78, n2)
      * 0.48;

    color += cyan
      * smoothstep(0.52, 0.88, n3)
      * 0.22;

    color += mix(violet, cyan, smoothstep(-0.6, 0.8, wave1))
      * ridges
      * 0.12;

    // Ondulação luminosa sutil: sem desenhar uma linha sobre o mouse.
    float energyRing = exp(
      -abs(distanceToMouse - 0.14 - wave * 0.008) * 32.0
    );

    color += mix(blue, cyan, energyRing)
      * energyRing
      * influence
      * 0.18;

    // Vinheta para preservar a composição central da Hero.
    float vignette = smoothstep(
      1.10,
      0.12,
      length((uv - 0.5) * vec2(1.12, 1.0))
    );

    color *= 0.72 + vignette * 0.28;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Erro no shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function LiquidBackground({
  reducedMotion = false,
}: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.error("WebGL não está disponível.");
      return;
    }

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Erro ao ligar shaders:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();

    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const velocityLocation = gl.getUniformLocation(program, "u_mouseVelocity");
    const distortionLocation = gl.getUniformLocation(program, "u_distortion");

    const mouse = { x: 0.5, y: 0.5 };
    const velocity = { x: 0, y: 0 };

    let distortion = 0;
    let lastPointerTime = 0;
    let lastFrameTime = 0;
    let elapsed = 0;
    let frameId = 0;
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (
        x < 0 ||
        y < 0 ||
        x > rect.width ||
        y > rect.height
      ) {
        return;
      }

      const now = performance.now();

      const nextX = x / rect.width;
      const nextY = 1 - y / rect.height;

      const dx = nextX - mouse.x;
      const dy = nextY - mouse.y;

      const deltaTime = Math.max(1, now - lastPointerTime);

      velocity.x = Math.max(-1, Math.min(1, (dx / deltaTime) * 180));
      velocity.y = Math.max(-1, Math.min(1, (dy / deltaTime) * 180));

      mouse.x = nextX;
      mouse.y = nextY;

      distortion = Math.min(
        1,
        distortion + Math.min(0.45, Math.hypot(dx, dy) * 8 + 0.12)
      );

      lastPointerTime = now;
    };

    const onPointerLeave = () => {
      velocity.x = 0;
      velocity.y = 0;
    };

    const render = (now: number) => {
      if (disposed) return;

      if (lastFrameTime) {
        const delta = Math.min((now - lastFrameTime) / 1000, 0.05);

        if (!reducedMotion) {
          elapsed += delta;
        }
      }

      lastFrameTime = now;

      if (now - lastPointerTime > 40) {
        velocity.x *= 0.88;
        velocity.y *= 0.88;
      }

      if (now - lastPointerTime > 90) {
        distortion *= 0.965;
      }

      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(mouseLocation, mouse.x, mouse.y);
      gl.uniform2f(
        velocityLocation,
        velocity.x,
        velocity.y
      );
      gl.uniform1f(distortionLocation, distortion);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const observer = new ResizeObserver(resize);

    observer.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    window.addEventListener("pointerleave", onPointerLeave);

    resize();

    if (reducedMotion) {
      render(0);
    } else {
      frameId = window.requestAnimationFrame(render);
    }

    return () => {
      disposed = true;

      window.cancelAnimationFrame(frameId);
      observer.disconnect();

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
