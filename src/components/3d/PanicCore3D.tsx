import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PanicCore3DProps {
  panicLevel?: number; // 0 to 100
  isPanicMode?: boolean;
}

export const PanicCore3D: React.FC<PanicCore3DProps> = ({
  panicLevel = 73,
  isPanicMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Torus Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isPanicMode ? 0xff0055 : 0x06b6d4,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    // Middle Torus Ring 2
    const ring2Geo = new THREE.TorusGeometry(1.6, 0.05, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isPanicMode ? 0xff5500 : 0xa855f7,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    // Inner Core Sphere (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.95, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isPanicMode ? 0xff0000 : 0xec4899,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(innerCore);

    // Floating Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: isPanicMode ? 0xff3366 : 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = isPanicMode ? 3.5 : 1 + panicLevel / 100;

      ring1.rotation.x = elapsedTime * 0.4 * speedMultiplier;
      ring1.rotation.y = elapsedTime * 0.6 * speedMultiplier;

      ring2.rotation.y = -elapsedTime * 0.5 * speedMultiplier;
      ring2.rotation.z = elapsedTime * 0.3 * speedMultiplier;

      innerCore.rotation.x = elapsedTime * 0.8 * speedMultiplier;
      innerCore.rotation.y = elapsedTime * 0.9 * speedMultiplier;

      // Pulse core scale
      const pulse = 1 + Math.sin(elapsedTime * (isPanicMode ? 10 : 3)) * 0.08;
      innerCore.scale.set(pulse, pulse, pulse);

      particles.rotation.y = elapsedTime * 0.15 * speedMultiplier;

      // Smooth cursor follow
      coreGroup.rotation.y += (mouseX * 0.8 - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (-mouseY * 0.8 - coreGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [panicLevel, isPanicMode]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[260px] min-w-[260px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
    />
  );
};
