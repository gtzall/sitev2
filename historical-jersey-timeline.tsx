
"use client"

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, PresentationControls, ScrollControls, useScroll, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// --- Data Definitions ---
interface HistoricalJersey {
  id: string;
  year: number;
  team: string;
  description: string;
  modelUrl: string; // Path to the GLTF model for this jersey
  significance?: string; // e.g., "World Cup Winner", "Champions League Final"
}

// Placeholder data - replace with actual historical jersey data and model paths
const historicalJerseys: HistoricalJersey[] = [
  {
    id: 'brazil-1970',
    year: 1970,
    team: 'Brasil',
    description: 'A icônica camisa amarela usada na conquista do tricampeonato mundial no México.',
    modelUrl: '/models/jerseys/brazil_1970.glb',
    significance: 'Copa do Mundo 1970'
  },
  {
    id: 'argentina-1986',
    year: 1986,
    team: 'Argentina',
    description: 'O manto Alviceleste vestido por Maradona na campanha vitoriosa da Copa do Mundo de 1986.',
    modelUrl: '/models/jerseys/argentina_1986.glb',
    significance: 'Copa do Mundo 1986'
  },
  {
    id: 'netherlands-1988',
    year: 1988,
    team: 'Holanda',
    description: 'Design geométrico marcante da camisa laranja usada na conquista da Eurocopa.',
    modelUrl: '/models/jerseys/netherlands_1988.glb',
    significance: 'Eurocopa 1988'
  },
  {
    id: 'germany-1990',
    year: 1990,
    team: 'Alemanha',
    description: 'Camisa branca com detalhes nas cores da bandeira, usada no título mundial na Itália.',
    modelUrl: '/models/jerseys/germany_1990.glb',
    significance: 'Copa do Mundo 1990'
  },
  {
    id: 'manutd-1999',
    year: 1999,
    team: 'Manchester United',
    description: 'Uniforme usado na temporada da Tríplice Coroa, incluindo a final épica da Champions League.',
    modelUrl: '/models/jerseys/manutd_1999.glb',
    significance: 'Champions League 1999'
  },
  {
    id: 'france-1998',
    year: 1998,
    team: 'França',
    description: 'A camisa azul com detalhes vermelhos e brancos da primeira conquista mundial da França, em casa.',
    modelUrl: '/models/jerseys/france_1998.glb',
    significance: 'Copa do Mundo 1998'
  },
  {
    id: 'barcelona-2009',
    year: 2009,
    team: 'Barcelona',
    description: 'Uniforme da temporada histórica do Sextuple, sob o comando de Pep Guardiola.',
    modelUrl: '/models/jerseys/barcelona_2009.glb',
    significance: 'Sextuple 2009'
  },
  {
    id: 'brazil-2002',
    year: 2002,
    team: 'Brasil',
    description: 'A camisa do pentacampeonato mundial, usada por Ronaldo, Rivaldo e Ronaldinho.',
    modelUrl: '/models/jerseys/brazil_2002.glb',
    significance: 'Copa do Mundo 2002'
  },
];

// --- 3D Components ---

function JerseyModel({ url, ...props }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.2;
          child.material.roughness = 0.7;
          child.material.envMapIntensity = 0.8;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
}

// Component to manage the timeline items and scrolling interaction
function TimelineItems() {
  const scroll = useScroll();
  const { width: viewportWidth, height: viewportHeight } = useThree((state) => state.viewport);
  const groupRef = useRef<THREE.Group>(null!)
  const [activeJersey, setActiveJersey] = useState<HistoricalJersey | null>(null);

  // Calculate spacing based on viewport width
  const itemSpacing = viewportWidth * 0.8; // Adjust spacing as needed
  const totalWidth = itemSpacing * (historicalJerseys.length - 1);

  useFrame(() => {
    if (groupRef.current) {
      // Move the group based on scroll offset
      groupRef.current.position.x = -scroll.offset * totalWidth;

      // Determine active jersey based on scroll position
      const currentIndex = Math.round(scroll.offset * (historicalJerseys.length - 1));
      if (historicalJerseys[currentIndex] !== activeJersey) {
        setActiveJersey(historicalJerseys[currentIndex]);
      }
    }
  });

  return (
    <> 
      <group ref={groupRef}>
        {historicalJerseys.map((jersey, index) => (
          <group key={jersey.id} position={[index * itemSpacing, 0, 0]}>
            {/* Jersey Model */}
            <Suspense fallback={null}> 
              <PresentationControls
                global
                config={{ mass: 1, tension: 400 }}
                snap={{ mass: 2, tension: 400 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 6, Math.PI / 6]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <group position={[0, -0.8, 0]} scale={1.8}> {/* Adjust scale and position */}
                  <JerseyModel url={jersey.modelUrl} />
                </group>
              </PresentationControls>
            </Suspense>

            {/* Year Text */}
            <Billboard position={[0, 1.5, -1]}>
                <Text
                    fontSize={0.8}
                    color="#FFD700" // Premium Gold
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Orbitron-Bold.ttf" // Use a suitable font
                >
                    {jersey.year}
                </Text>
            </Billboard>
          </group>
        ))}
      </group>

      {/* Display Info for Active Jersey */}
      <AnimatePresence>
        {activeJersey && (
          <Html center position={[0, -viewportHeight * 0.4, 0]} style={{ width: '80vw', maxWidth: '600px', pointerEvents: 'none' }}>
            <motion.div
              key={activeJersey.id} // Key ensures animation runs on change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/70 backdrop-blur-md text-white p-6 rounded-xl border border-premium-gold/40 shadow-xl text-center"
            >
              <h4 className="text-xl font-bold text-premium-gold mb-2">{activeJersey.team} {activeJersey.year}</h4>
              {activeJersey.significance && (
                 <p className="text-sm text-premium-gold mb-3 font-semibold">{activeJersey.significance}</p>
              )}
              <p className="text-sm text-premium-white-soft">{activeJersey.description}</p>
            </motion.div>
          </Html>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Main Component ---
export function HistoricalJerseyTimeline() {

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '600px', // Adjust height
    borderRadius: '1rem',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(5, 5, 10, 0.7)', // Darker, slightly transparent background
    border: '1px solid rgba(212, 175, 55, 0.25)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
  };

  return (
    <motion.div
      className="mb-12" // Add margin bottom
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
        <h3 className="text-3xl font-bold text-premium-gold mb-6 text-center tracking-wider">Linha do Tempo das Camisas</h3>
        <div style={containerStyle}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 5], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <directionalLight intensity={1.0} position={[5, 10, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <pointLight intensity={0.5} position={[-5, -5, -5]} color="#FFD700" />
                <spotLight intensity={0.6} angle={0.2} penumbra={0.6} position={[0, 10, 0]} color="#FFFFFF" />

                <Suspense fallback={<Html center><span className="text-premium-white">Carregando Linha do Tempo...</span></Html>}>
                    <Environment preset="warehouse" /> {/* Changed environment */}
                    
                    <ScrollControls pages={historicalJerseys.length} damping={0.3} horizontal>
                        <TimelineItems />
                    </ScrollControls>

                    {/* Static floor or background element */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                        <planeGeometry args={[50, 50]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
                    </mesh>

                </Suspense>

                {/* Removed OrbitControls as ScrollControls handles movement */}
            </Canvas>
             {/* Scroll Indicator */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-premium-gold text-xs opacity-70 animate-pulse">
                Arraste horizontalmente para navegar
            </div>
        </div>
    </motion.div>
  );
}

