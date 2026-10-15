
"use client";

import { useEffect, useRef } from "react";

type PlasmaBackgroundProps = {
  reducedMotion?: boolean;
};

export default function PlasmaBackground({
  reducedMotion = false,
}: PlasmaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#050817";
      ctx.fillRect(0, 0, width, height);

      const t = time;

      // Luz violeta principal
      const purple = ctx.createRadialGradient(
        width * (0.48 + Math.sin(t * 0.35) * 0.08),
        height * (0.43 + Math.cos(t * 0.3) * 0.06),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );

      purple.addColorStop(0, "rgba(91, 85, 255, 0.22)");
      purple.addColorStop(0.45, "rgba(70, 55, 190, 0.10)");
      purple.addColorStop(1, "rgba(5, 8, 23, 0)");

      ctx.fillStyle = purple;
      ctx.fillRect(0, 0, width, height);

      // Luz azul lateral
      const blue = ctx.createRadialGradient(
        width * (0.82 + Math.sin(t * 0.25) * 0.08),
        height * 0.65,
        0,
        width * 0.82,
        height * 0.65,
        width * 0.6
      );

      blue.addColorStop(0, "rgba(0, 170, 255, 0.13)");
      blue.addColorStop(1, "rgba(0, 170, 255, 0)");

      ctx.fillStyle = blue;
      ctx.fillRect(0, 0, width, height);

      // Ondas de plasma
      ctx.globalCompositeOperation = "screen";

      for (let line = 0; line < 9; line++) {
        ctx.beginPath();

        const baseY = height * (0.25 + line * 0.075);

        for (let x = 0; x <= width; x += 8) {
          const normalizedX = x / width;

          const wave =
            Math.sin(normalizedX * 7 + t * 0.7 + line * 0.48) *
              height *
              0.035 +
            Math.sin(normalizedX * 13 - t * 0.45 + line * 0.3) *
              height *
              0.012;

          const y = baseY + wave;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const alpha = 0.035 + (line % 3) * 0.012;

        ctx.strokeStyle =
          line % 3 === 0
            ? `rgba(105, 95, 255, ${alpha})`
            : `rgba(40, 175, 255, ${alpha})`;

        ctx.lineWidth = line % 3 === 0 ? 1.4 : 0.8;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      // Vinheta para manter o texto legível
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        Math.min(width, height) * 0.15,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );

      vignette.addColorStop(0, "rgba(5, 8, 23, 0)");
      vignette.addColorStop(1, "rgba(5, 8, 23, 0.72)");

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (!reducedMotion) {
        time += 0.006;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
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
