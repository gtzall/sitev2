
"use client"

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

type JerseySize = 'P' | 'M' | 'G' | 'GG';
type MannequinPose = 'default' | 'action' | 'side';

function MannequinModel({ url, poseRotation = [0, 0, 0], ...props }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.1;
          child.material.roughness = 0.8;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        x: poseRotation[0],
        y: poseRotation[1],
        z: poseRotation[2],
        duration: 0.7,
        ease: 'power3.out'
      });
    }
  }, [poseRotation]);

  return <primitive ref={groupRef} object={scene} {...props} />;
}

function JerseyModel({ url, sizeScale = 1.0, ...props }) {
  const { scene } = useGLTF(url);
  const jerseyRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.2;
          child.material.roughness = 0.7;
          child.material.transparent = true;
          child.material.depthWrite = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (jerseyRef.current) {
      gsap.to(jerseyRef.current.scale, {
        x: sizeScale,
        y: sizeScale,
        z: sizeScale,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [sizeScale]);

  return <primitive ref={jerseyRef} object={scene} {...props} />;
}

interface VirtualFittingRoomProps {
  jerseyModelUrl: string;
}

export function VirtualFittingRoom({ jerseyModelUrl = '/models/jersey_placeholder.glb' }: VirtualFittingRoomProps) {
  const [mannequinGender, setMannequinGender] = useState<'male' | 'female'>('male');
  const [selectedSize, setSelectedSize] = useState<JerseySize>('M');
  const [selectedPose, setSelectedPose] = useState<MannequinPose>('default');
  const mannequinRef = useRef<THREE.Group>(null!)

  const mannequinUrls = {
    male: '/models/mannequin_male_placeholder.glb',
    female: '/models/mannequin_female_placeholder.glb',
  };

  const sizeScaleFactors: Record<JerseySize, number> = {
    'P': 0.95,
    'M': 1.0,
    'G': 1.05,
    'GG': 1.1,
  };

  const poseRotations: Record<MannequinPose, [number, number, number]> = {
    'default': [0, 0, 0],
    'action': [0, -Math.PI / 6, -Math.PI / 18],
    'side': [0, Math.PI / 2.5, 0],
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '550px',
    borderRadius: '1rem',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(10, 10, 20, 0.6)',
    border: '1px solid rgba(212, 175, 55, 0.25)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)'
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold text-premium-gold mb-4 text-center tracking-wide">Provador Virtual</h3>
      <div style={containerStyle}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 4.5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight intensity={0.9} position={[5, 10, 8]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <pointLight intensity={0.4} position={[-5, -5, -5]} />

          <Suspense fallback={<Html center><span className="text-premium-white">Carregando Modelo...</span></Html>}>
            <Environment preset="studio" />

            <PresentationControls
              global
              config={{ mass: 1, tension: 400 }}
              snap={{ mass: 2, tension: 400 }}
              rotation={[0, 0.2, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Math.PI / 3, Math.PI / 3]}
            >
              <group ref={mannequinRef} position={[0, -1.5, 0]}> 
                <MannequinModel 
                  key={mannequinGender}
                  url={mannequinUrls[mannequinGender]} 
                  scale={1.0} 
                  poseRotation={poseRotations[selectedPose]}
                />
                
                <JerseyModel 
                  url={jerseyModelUrl} 
                  scale={1.0}
                  sizeScale={sizeScaleFactors[selectedSize]}
                  position={[0, 1.0, 0.05]}
                  rotation={[0,0,0]}
                />
              </group>
            </PresentationControls>

            <ContactShadows position={[0, -1.55, 0]} opacity={0.8} scale={10} blur={2.5} far={1.6} />
          </Suspense>

        </Canvas>

        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full flex gap-2 border border-premium-gold/30">
            <button
              onClick={() => setMannequinGender('male')}
              className={`px-3 py-1 rounded-full text-xs transition-colors duration-300 ${mannequinGender === 'male' ? 'bg-premium-gold text-black font-semibold' : 'bg-white/10 text-premium-white-soft hover:bg-white/20'}`}
            >
              Masculino
            </button>
            <button
              onClick={() => setMannequinGender('female')}
              className={`px-3 py-1 rounded-full text-xs transition-colors duration-300 ${mannequinGender === 'female' ? 'bg-premium-gold text-black font-semibold' : 'bg-white/10 text-premium-white-soft hover:bg-white/20'}`}
            >
              Feminino
            </button>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full flex gap-2 border border-premium-gold/30">
            {(['default', 'action', 'side'] as MannequinPose[]).map(pose => (
              <button
                key={pose}
                onClick={() => setSelectedPose(pose)}
                className={`px-3 py-1 rounded-full text-xs capitalize transition-colors duration-300 ${selectedPose === pose ? 'bg-premium-gold text-black font-semibold' : 'bg-white/10 text-premium-white-soft hover:bg-white/20'}`}
              >
                {pose === 'default' ? 'Padrão' : pose === 'action' ? 'Ação' : 'Lado'}
              </button>
            ))}
          </div>

          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full flex gap-2 border border-premium-gold/30">
            {(['P', 'M', 'G', 'GG'] as JerseySize[]).map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors duration-300 ${selectedSize === size ? 'bg-premium-gold text-black font-semibold' : 'bg-white/10 text-premium-white-soft hover:bg-white/20'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

