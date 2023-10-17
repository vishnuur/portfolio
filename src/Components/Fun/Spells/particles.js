import React, { useEffect, useState } from "react";

const Particle = ({ canvas }) => {
  const [x, setX] = useState(
    window.innerWidth / 2 + (Math.random() * 20 - Math.random() * 20)
  );
  const [y, setY] = useState(window.innerHeight);
  const [direction, setDirection] = useState(Math.random() > 0.5 ? -1 : 1);
  const [radius, setRadius] = useState(1 + 3 * Math.random());
  const [microparticles, setMicroparticles] = useState([]); // Define microparticles as a state variable
  const color = "#ff417d";
  const life = 1000 + Math.random() * 3000;
  const s = 2 + Math.random();
  const w = window.innerWidth;
  const h = window.innerHeight;
  let progress = 0;
  let microparticleID;

  useEffect(() => {
    const particleID = setInterval(() => {
      microparticles.push(new MicroParticle(canvas, { x, y }));
    }, Math.random() * 20);

    microparticleID = setTimeout(() => {
      clearInterval(particleID);
    }, life);

    return () => {
      clearInterval(particleID);
      clearTimeout(microparticleID);
    };
  }, []);

  useEffect(() => {
    const move = () => {
      setX(x - direction * Math.sin(progress / (Math.random() * 430)) * s);
      setY(y - Math.cos(progress / h) * s);

      if (x < 0 || x > w - radius) {
        clearInterval(microparticleID);
        return false;
      }

      if (y < 0) {
        clearInterval(microparticleID);
        return false;
      }

      progress++;
      return true;
    };

    const render = () => {
      canvas.beginPath();
      canvas.arc(x, y, radius, 0, 2 * Math.PI);
      canvas.shadowOffsetX = 0;
      canvas.shadowOffsetY = 0;
      canvas.shadowColor = "#000000";
      canvas.fillStyle = color;
      canvas.fill();
      canvas.closePath();
    };

    render();
    move();
  }, [x, y, direction, radius, color, life, s, w, h]);

  return null;
};

class MicroParticle {
  constructor(canvas, options) {
    this.random = Math.random();
    this.random1 = Math.random();
    this.random2 = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.x = options.x;
    this.y = options.y;
    this.s = 2 + Math.random() * 3;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.radius = 1 + this.random * 0.5;
    this.color = "#4EFCFE";
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    this.x -=
      Math.sin(this.progress / (100 / (this.random1 - this.random2 * 10))) *
      this.s;
    this.y += Math.cos(this.progress / this.h) * this.s;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y > this.h) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

const Index = () => {
  const [particles, setParticles] = useState([]);
  const [microparticles, setMicroparticles] = useState([]);
  const canvasRef = React.createRef();

  useEffect(() => {
    const canvas = canvasRef.current.getContext("2d");
    const randomLife = 1000;

    const clear = () => {
      const grd = canvas.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth
      );
      grd.addColorStop(0, "rgba(82,42,114,1)");
      grd.addColorStop(1, "rgba(26,14,4,0)");
      canvas.globalAlpha = 0.16;
      canvas.fillStyle = grd;
      canvas.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const blur = (ctx, canvas, amt) => {
      // ctx.filter = `blur(${amt}px)`
      // ctx.drawImage(canvas, 0, 0)
      // ctx.filter = 'none'
    };

    const update = () => {
      clear();
      setParticles((prevParticles) => prevParticles.filter((p) => p.move()));
      setMicroparticles((prevMicroparticles) =>
        prevMicroparticles.filter((mp) => mp.move())
      );
      requestAnimationFrame(update);
    };

    update();

    const particleID = setInterval(() => {
      setParticles((prevParticles) => [
        ...prevParticles,
        <Particle canvas={canvas} />,
      ]);
      const randomLife = 2000 * Math.random();
    }, randomLife);

    return () => {
      clearInterval(particleID);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default Index;
