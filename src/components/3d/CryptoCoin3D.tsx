import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { sound } from '../../utils/soundEngine';

interface CryptoCoin3DProps {
  onCoinClick?: () => void;
}

export const CryptoCoin3D: React.FC<CryptoCoin3DProps> = ({ onCoinClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    // Coin Cylinder
    const coinGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.25, 64);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf7931a,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.rotation.x = Math.PI / 2;
    coinGroup.add(coin);

    // Coin Outer Ring wireframe
    const ringGeo = new THREE.TorusGeometry(2.3, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    coinGroup.add(ring);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xec4899, 3, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse tilt & rotation
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = () => {
      sound.playCelebration();
      if (onCoinClick) onCoinClick();
    };
    renderer.domElement.addEventListener('click', handleClick);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      coinGroup.rotation.y = elapsedTime * 0.8 + mouseX * 1.2;
      coinGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2 + mouseY * 0.8;
      ring.rotation.z = elapsedTime * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [onCoinClick]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[300px] flex items-center justify-center relative cursor-pointer group"
    />
  );
};
