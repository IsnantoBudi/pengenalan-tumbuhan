// Lightweight Canvas Confetti Engine (Zero Dependencies)

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  tilt: number;
  tiltAngle: number;
  tiltSpeed: number;
}

export function launchConfetti(canvas: HTMLCanvasElement, durationMs = 3000) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = [
    "#f59e0b",
    "#ef4444",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#fde047",
    "#22c55e",
  ];

  const particleCount = 120;
  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * -height * 0.5,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2.5,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltSpeed: Math.random() * 0.07 + 0.05,
    });
  }

  let animationFrameId: number;
  const startTime = Date.now();

  const render = () => {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.tiltAngle += p.tiltSpeed;
      p.y += p.vy;
      p.x += Math.sin(p.tiltAngle) * 2 + p.vx;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      ctx.beginPath();
      ctx.lineWidth = p.h;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.w / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.h / 2);
      ctx.stroke();

      // Recycle if still within duration
      if (p.y > height && elapsed < durationMs) {
        p.x = Math.random() * width;
        p.y = -10;
      }
    });

    if (elapsed < durationMs + 1000) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  };

  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, width, height);
  };
}
