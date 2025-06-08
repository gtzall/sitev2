
"use client"

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Html, ContactShadows, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Placeholder for loading GLTF model - replace with actual jersey model path
function JerseyModel({ url = '/models/jersey_placeholder.glb', ...props }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null!)

  // Optional: Adjust material properties if needed
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        // Example: Enhance material appearance
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.3
          child.material.roughness = 0.6
          // You might need to load and apply specific textures here
        }
      }
    })
  }, [scene])

  // Optional: Add subtle animation
  useFrame((state) => {
    if (modelRef.current) {
      // Example: Gentle hover effect
      // modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  })

  return <primitive ref={modelRef} object={scene} {...props} />
}

interface JerseyViewer3DProps {
  jerseyModelUrl: string; // URL of the specific jersey model
  initialRotation?: [number, number, number];
  backgroundColor?: string;
}

export function JerseyViewer3D({ 
  jerseyModelUrl = '/models/jersey_placeholder.glb', 
  initialRotation = [0, 0.5, 0],
  backgroundColor = 'transparent' // Default to transparent background
}: JerseyViewer3DProps) {
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px', // Adjust height as needed
    borderRadius: '1rem', // Match site style
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: backgroundColor, // Use prop for background
    border: '1px solid rgba(212, 175, 55, 0.2)', // Premium gold border
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <spotLight intensity={0.8} angle={0.15} penumbra={0.8} position={[10, 15, 10]} castShadow />
        <pointLight intensity={0.4} position={[-10, -10, -10]} />
        
        <Suspense fallback={<Html center><span className="text-premium-white">Carregando Camisa...</span></Html>}>
          <Environment preset="city" />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={initialRotation}
            polar={[-Math.PI / 4, Math.PI / 4]} // Vertical rotation limits
            azimuth={[-Math.PI / 3, Math.PI / 3]} // Horizontal rotation limits
          >
            <group position={[0, -0.7, 0]}> {/* Adjust position to center the jersey */}
              <JerseyModel url={jerseyModelUrl} scale={1.5} /> {/* Adjust scale as needed */}
            </group>
          </PresentationControls>
          
          {/* Ground Plane / Shadows */}
          <ContactShadows 
            position={[0, -0.9, 0]} 
            opacity={0.7} 
            scale={10} 
            blur={2} 
            far={1.5} 
          />
        </Suspense>
        
        {/* Replaced OrbitControls with PresentationControls for better interaction */}
        {/* <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.8} /> */}
      </Canvas>
      
      {/* Optional UI Elements (e.g., color swatches, customization options) */}
      {/* <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></button>
        <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></button>
      </div> */}      
    </motion.div>
  );
}

