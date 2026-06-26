import React, { useEffect, useRef } from 'react';

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.5; // 1.5 to 3.5px
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        // Higher visibility organic colors for light background
        const r = Math.random();
        if (r < 0.6) {
          this.color = 'rgba(16, 185, 129, 0.55)'; // Emerald
        } else if (r < 0.85) {
          this.color = 'rgba(20, 184, 166, 0.5)'; // Teal
        } else {
          this.color = 'rgba(217, 119, 6, 0.4)'; // Amber (darker gold)
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles array
    const particles = [];
    const particleCount = Math.min(65, Math.floor((canvas.width * canvas.height) / 22000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    // Track mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render each particle
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw linking lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 125) {
            const alpha = (1 - distance / 125) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Mouse link line
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const alpha = (1 - distance / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
