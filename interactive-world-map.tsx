
"use client"

import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, PerspectiveCamera, Environment, useTexture, Sparkles, Stars } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { gsap } from 'gsap'

// --- Data Definitions ---
interface TeamData {
  name: string;
  stadium?: string; // Optional stadium name
  stadiumImage?: string; // Optional stadium image URL
}

interface CountryData {
  lat: number;
  lon: number;
  name: string;
  region: string;
  teams: TeamData[];
  population?: string; // Optional
  achievements?: string[]; // Optional
}

const flagPositions: { [key: string]: CountryData } = {
  // Americas
  brazil: {
    lat: -14.235,
    lon: -51.925,
    name: 'Brasil',
    region: 'south-america',
    teams: [
      { name: 'Flamengo', stadium: 'Maracanã', stadiumImage: '/images/stadiums/maracana.jpg' },
      { name: 'São Paulo', stadium: 'Morumbi', stadiumImage: '/images/stadiums/morumbi.jpg' },
      { name: 'Palmeiras', stadium: 'Allianz Parque', stadiumImage: '/images/stadiums/allianz_parque.jpg' },
      { name: 'Santos' },
      { name: 'Corinthians' }
    ],
    population: "214 Milhões",
    achievements: ["5x Copa do Mundo"]
  },
  argentina: {
    lat: -38.4161,
    lon: -63.6167,
    name: 'Argentina',
    region: 'south-america',
    teams: [
      { name: 'Boca Juniors', stadium: 'La Bombonera', stadiumImage: '/images/stadiums/bombonera.jpg' },
      { name: 'River Plate', stadium: 'Monumental de Núñez', stadiumImage: '/images/stadiums/monumental.jpg' },
      { name: 'Racing Club' },
      { name: 'Independiente' }
    ],
    population: "46 Milhões",
    achievements: ["3x Copa do Mundo"]
  },
  usa: {
    lat: 38.9637,
    lon: -95.7129,
    name: 'Estados Unidos',
    region: 'north-america',
    teams: [
      { name: 'LA Galaxy' },
      { name: 'Inter Miami' },
      { name: 'Seattle Sounders' },
      { name: 'Atlanta United' }
    ]
  },
  // Europe
  uk: {
    lat: 55.3781,
    lon: -3.436,
    name: 'Reino Unido',
    region: 'europe',
    teams: [
      { name: 'Manchester United', stadium: 'Old Trafford', stadiumImage: '/images/stadiums/old_trafford.jpg' },
      { name: 'Liverpool', stadium: 'Anfield', stadiumImage: '/images/stadiums/anfield.jpg' },
      { name: 'Chelsea' },
      { name: 'Arsenal' },
      { name: 'Manchester City' }
    ],
    achievements: ["1x Copa do Mundo (Inglaterra)"]
  },
  france: {
    lat: 46.6033,
    lon: 1.8883,
    name: 'França',
    region: 'europe',
    teams: [
      { name: 'PSG', stadium: 'Parc des Princes', stadiumImage: '/images/stadiums/parc_des_princes.jpg' },
      { name: 'Olympique de Marseille' },
      { name: 'Lyon' },
      { name: 'Monaco' }
    ],
    achievements: ["2x Copa do Mundo"]
  },
  germany: {
    lat: 51.1657,
    lon: 10.4515,
    name: 'Alemanha',
    region: 'europe',
    teams: [
      { name: 'Bayern Munich', stadium: 'Allianz Arena', stadiumImage: '/images/stadiums/allianz_arena.jpg' },
      { name: 'Borussia Dortmund', stadium: 'Signal Iduna Park', stadiumImage: '/images/stadiums/signal_iduna.jpg' },
      { name: 'RB Leipzig' },
      { name: 'Bayer Leverkusen' }
    ],
    achievements: ["4x Copa do Mundo"]
  },
  spain: {
    lat: 40.4637,
    lon: -3.7492,
    name: 'Espanha',
    region: 'europe',
    teams: [
      { name: 'Real Madrid', stadium: 'Santiago Bernabéu', stadiumImage: '/images/stadiums/bernabeu.jpg' },
      { name: 'Barcelona', stadium: 'Camp Nou', stadiumImage: '/images/stadiums/camp_nou.jpg' },
      { name: 'Atlético Madrid' },
      { name: 'Sevilla' }
    ],
    achievements: ["1x Copa do Mundo"]
  },
  italy: {
    lat: 41.8719,
    lon: 12.5674,
    name: 'Itália',
    region: 'europe',
    teams: [
      { name: 'Juventus', stadium: 'Allianz Stadium', stadiumImage: '/images/stadiums/juventus_stadium.jpg' },
      { name: 'Inter Milan', stadium: 'San Siro', stadiumImage: '/images/stadiums/san_siro.jpg' },
      { name: 'AC Milan', stadium: 'San Siro', stadiumImage: '/images/stadiums/san_siro.jpg' },
      { name: 'Napoli' },
      { name: 'Roma' }
    ],
    achievements: ["4x Copa do Mundo"]
  },
  portugal: {
    lat: 38.7369,
    lon: -9.1427,
    name: 'Portugal',
    region: 'europe',
    teams: [
      { name: 'Benfica', stadium: 'Estádio da Luz', stadiumImage: '/images/stadiums/estadio_da_luz.jpg' },
      { name: 'Porto', stadium: 'Estádio do Dragão', stadiumImage: '/images/stadiums/estadio_do_dragao.jpg' },
      { name: 'Sporting CP' }
    ]
  },
  // Add other countries similarly...
  saudi_arabia: {
    lat: 23.8859,
    lon: 45.0792,
    name: 'Arábia Saudita',
    region: 'asia',
    teams: [
      { name: 'Al-Nassr' },
      { name: 'Al-Hilal' },
      { name: 'Al-Ahli' },
      { name: 'Al-Ittihad' }
    ]
  },
};

// --- Utility Functions ---
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// --- 3D Components ---

// Enhanced Animated Marker
function AnimatedMarker({ position, isHovered, isSelected, onClick, onPointerOver, onPointerOut }) {
  const markerRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const pulseRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    // Kill previous animations to prevent conflicts
    gsap.killTweensOf([markerRef.current?.scale, markerRef.current?.material, glowRef.current?.scale, ringRef.current?.rotation, ringRef.current?.scale, pulseRef.current?.scale, pulseRef.current?.material]);

    // Marker Scale & Emissive Intensity
    gsap.to(markerRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 }); // Reset first
    gsap.to(markerRef.current.scale, { x: isSelected ? 1.8 : isHovered ? 1.5 : 1, y: isSelected ? 1.8 : isHovered ? 1.5 : 1, z: isSelected ? 1.8 : isHovered ? 1.5 : 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    gsap.to(markerRef.current.material, { emissiveIntensity: isSelected ? 1.2 : isHovered ? 0.9 : 0.1, duration: 0.3 });

    // Glow Effect
    gsap.to(glowRef.current, { visible: isHovered || isSelected, duration: 0 });
    gsap.to(glowRef.current.scale, { x: isSelected ? 2.8 : isHovered ? 2.2 : 0, y: isSelected ? 2.8 : isHovered ? 2.2 : 0, z: isSelected ? 2.8 : isHovered ? 2.2 : 0, duration: 0.4, ease: "power3.out" });
    gsap.to(glowRef.current.material, { opacity: isSelected ? 0.5 : 0.35, duration: 0.3 });

    // Selected Ring Effect
    gsap.to(ringRef.current, { visible: isSelected, duration: 0 });
    if (isSelected) {
      gsap.fromTo(ringRef.current.rotation, { z: 0 }, { z: Math.PI * 2, duration: 10, repeat: -1, ease: "none" });
      gsap.fromTo(ringRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 }, { x: 3.2, y: 3.2, z: 3.2, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(ringRef.current.material, { opacity: 0.8, duration: 0.3 });
    } else {
      gsap.to(ringRef.current.material, { opacity: 0, duration: 0.3 });
    }

    // Outer Pulse Effect (always visible, pulses more when selected/hovered)
    gsap.to(pulseRef.current.scale, { x: isSelected ? 10 : isHovered ? 8 : 5, y: isSelected ? 10 : isHovered ? 8 : 5, z: isSelected ? 10 : isHovered ? 8 : 5, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to(pulseRef.current.material, { opacity: isSelected ? 0.15 : isHovered ? 0.1 : 0.05, duration: 0.5 });

  }, [isHovered, isSelected]);

  return (
    <group position={position}>
      {/* Outer Pulse */}
      <mesh ref={pulseRef} scale={5}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial color="#FFD54F" transparent={true} opacity={0.05} depthWrite={false} />
      </mesh>
      {/* Animated Ring */}
      <mesh ref={ringRef} visible={false} rotation={[Math.PI / 2, 0, 0]} scale={2.5}>
        <ringGeometry args={[0.12, 0.14, 64]} />
        <meshBasicMaterial color="#FFC107" transparent={true} opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Glow Effect */}
      <mesh ref={glowRef} visible={false} scale={0}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial color={isSelected ? '#FFC107' : '#FFD54F'} transparent={true} opacity={0.35} depthWrite={false} />
      </mesh>
      {/* Main Marker */}
      <mesh ref={markerRef} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? '#FFC107' : isHovered ? '#FFD54F' : '#0D80D8'}
          emissive={isSelected ? '#FFC107' : isHovered ? '#FFD54F' : '#0D80D8'}
          emissiveIntensity={0.1} // Base intensity
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// Enhanced Country Info Panel
function CountryInfoPanel({ country, onClose }) {
  if (!country) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg border border-premium-gold/40 rounded-2xl p-6 text-white shadow-2xl shadow-premium-gold/10 z-20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-premium-gold/20 pb-3">
        <h3 className="text-2xl font-bold text-premium-gold tracking-wide">{country.name}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-premium-gold hover:bg-premium-gold/20 hover:text-white transition-all duration-300 transform hover:scale-110"
          aria-label="Fechar Painel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
        <div>
          <span className="text-premium-white-soft block mb-1">Continente:</span>
          <span className="text-premium-white font-medium">{country.region.charAt(0).toUpperCase() + country.region.slice(1).replace('-', ' ')}</span>
        </div>
        <div>
          <span className="text-premium-white-soft block mb-1">Coordenadas:</span>
          <span className="text-premium-white font-medium">{country.lat.toFixed(2)}°, {country.lon.toFixed(2)}°</span>
        </div>
        {country.population && (
          <div>
            <span className="text-premium-white-soft block mb-1">População:</span>
            <span className="text-premium-white font-medium">{country.population}</span>
          </div>
        )}
        {country.achievements && country.achievements.length > 0 && (
          <div>
            <span className="text-premium-white-soft block mb-1">Conquistas:</span>
            <span className="text-premium-white font-medium">{country.achievements.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Teams & Stadiums */}
      <div>
        <h4 className="text-lg font-semibold text-premium-gold mb-3">Times e Estádios:</h4>
        <div className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-premium-gold/50 scrollbar-track-transparent">
          {country.teams.map((team, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/5 border border-premium-gold/10 rounded-lg p-3 hover:bg-premium-gold/10 hover:border-premium-gold/30 transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="font-medium text-premium-white">{team.name}</div>
                {team.stadium && <div className="text-xs text-premium-white-soft">{team.stadium}</div>}
              </div>
              {team.stadiumImage && (
                <div className="w-16 h-10 rounded overflow-hidden ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img src={team.stadiumImage} alt={`Estádio ${team.stadium}`} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Camera Controller
function CameraController({ targetPosition, isZooming }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    gsap.killTweensOf(camera.position); // Kill previous camera tweens
    gsap.killTweensOf(controlsRef.current?.target);

    if (isZooming && targetPosition) {
      if (controlsRef.current) controlsRef.current.enabled = false;

      const startPosition = camera.position.clone();
      const endPosition = targetPosition.clone().normalize().multiplyScalar(4); // Zoom closer
      const startTarget = controlsRef.current?.target.clone() || new THREE.Vector3();
      const endTarget = targetPosition.clone().multiplyScalar(0.5); // Look slightly towards the marker

      // Cinematic Camera Animation
      gsap.to(camera.position, {
        x: endPosition.x,
        y: endPosition.y,
        z: endPosition.z,
        duration: 2.0, // Longer duration for smoother feel
        ease: "power4.inOut",
        onUpdate: () => {
          // Interpolate target during zoom for smoother lookAt
          const progress = gsap.getProperty(camera.position, "progress"); // Custom property for progress tracking
          if (controlsRef.current) {
             controlsRef.current.target.lerpVectors(startTarget, endTarget, progress);
             controlsRef.current.update();
          }
        },
        onComplete: () => {
          if (controlsRef.current) {
            controlsRef.current.target.copy(endTarget);
            controlsRef.current.enabled = true;
            controlsRef.current.update();
          }
        }
      });
       // Add progress tracking to the tween
      gsap.set(camera.position, { progress: 0 });
      gsap.to(camera.position, { progress: 1, duration: 2.0, ease: "power4.inOut" });

    } else {
      // Smooth Reset Camera Position
      const currentTarget = controlsRef.current?.target.clone() || new THREE.Vector3();
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 8, // Default position
        duration: 1.8,
        ease: "power3.inOut"
      });
      gsap.to(controlsRef.current?.target, {
        x: 0, y: 0, z: 0,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current?.update()
      });
    }
  }, [camera, targetPosition, isZooming, controlsRef]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      autoRotate={!isZooming} // Stop auto-rotate when zoomed
      autoRotateSpeed={0.3} // Slower rotation
      minDistance={3} // Allow closer zoom
      maxDistance={20}
      enableDamping={true}
      dampingFactor={0.05}
      target={[0, 0, 0]} // Initial target
      makeDefault // Ensure this is the default control
    />
  );
}

// Enhanced Earth Atmosphere
function EarthAtmosphere({ radius }) {
  const atmosphereRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    // Subtle pulsing effect
    const pulse = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 + 1;
    if (atmosphereRef.current) {
        atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }
     if (glowRef.current) {
        glowRef.current.material.opacity = Math.sin(clock.getElapsedTime() * 0.8) * 0.1 + 0.2;
    }
  });

  return (
    <group>
        {/* Inner Atmosphere Glow */}
        <mesh ref={atmosphereRef}>
            <sphereGeometry args={[radius * 1.01, 64, 64]} />
            <meshStandardMaterial
                color="#87CEEB" // Sky blue
                transparent={true}
                opacity={0.3}
                blending={THREE.AdditiveBlending} // Brighter effect
                side={THREE.BackSide}
                depthWrite={false}
            />
        </mesh>
        {/* Outer Atmospheric Haze */}
        <mesh ref={glowRef}>
            <sphereGeometry args={[radius * 1.05, 64, 64]} />
            <meshLambertMaterial
                color="#ffffff"
                transparent={true}
                opacity={0.2}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
                depthWrite={false}
            />
        </mesh>
    </group>
  );
}

// Main Earth Model Component
function EarthModel({ onRegionSelect, onCountrySelect, selectedCountryKey, activeFilter }) {
  const gltf = useLoader(GLTFLoader, '/Earth_1_12756.glb') // Ensure path is correct
  const modelRef = useRef<THREE.Group>(null!)
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null)

  const earthTexture = useTexture('/images/textures/earth_daymap_8k.jpg') // High-res texture
  const earthNormalMap = useTexture('/images/textures/earth_normal_map_8k.jpg')
  const earthSpecularMap = useTexture('/images/textures/earth_specular_map_8k.jpg')
  const earthClouds = useTexture('/images/textures/earth_clouds_4k.png')

  // Apply textures to the loaded model
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: earthTexture,
          normalMap: earthNormalMap,
          roughnessMap: earthSpecularMap, // Using specular as roughness approximation
          metalness: 0.1,
          roughness: 0.8,
          normalScale: new THREE.Vector2(1, 1),
          envMapIntensity: 0.5
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf, earthTexture, earthNormalMap, earthSpecularMap]);

  useFrame(({ clock }) => {
    if (modelRef.current && !selectedCountryKey) {
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.03; // Slower rotation
    }
    // Animate clouds
    if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  })

  const radius = 2.5;
  const flags = useMemo(() => Object.entries(flagPositions).map(([key, value]) => ({
    key,
    position: latLonToVector3(value.lat, value.lon, radius),
    name: value.name,
    region: value.region,
    country: value,
  })), []);

  const filteredFlags = useMemo(() => {
    if (!activeFilter || activeFilter === 'all') return flags;
    return flags.filter(flag => flag.region === activeFilter);
  }, [flags, activeFilter]);

  const handleFlagClick = (flag) => {
    if (selectedCountryKey === flag.key) {
      onCountrySelect(null, null); // Deselect
    } else {
      onRegionSelect(flag.region);
      onCountrySelect(flag.key, flag.country); // Select
    }
  };

  const cloudMeshRef = useRef<THREE.Mesh>(null!)

  return (
    <group ref={modelRef}>
      {/* Enhanced Earth model - using primitive might be simpler if GLTF structure is complex */}
      <primitive
        object={gltf.scene}
        scale={0.01}
        position={[0, -0.2, 0]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Atmosphere */}
      <EarthAtmosphere radius={radius} />

      {/* Animated Clouds */}
      <mesh ref={cloudMeshRef}>
        <sphereGeometry args={[radius * 1.015, 64, 64]} />
        <meshStandardMaterial
          map={earthClouds}
          transparent={true}
          opacity={0.3}
          blending={THREE.NormalBlending}
          depthWrite={false}
          alphaTest={0.1}
        />
      </mesh>

      {/* Flag Markers - Use filteredFlags */}
      <AnimatePresence>
        {filteredFlags.map((flag) => (
          <motion.group
            key={flag.key}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <AnimatedMarker
              position={flag.position}
              isHovered={hoveredFlag === flag.key}
              isSelected={selectedCountryKey === flag.key}
              onClick={(e) => { e.stopPropagation(); handleFlagClick(flag); }}
              onPointerOver={(e) => { e.stopPropagation(); setHoveredFlag(flag.key); document.body.style.cursor = 'pointer'; }}
              onPointerOut={(e) => { e.stopPropagation(); setHoveredFlag(null); document.body.style.cursor = 'auto'; }}
            />
          </motion.group>
        ))}
      </AnimatePresence>

       {/* Add subtle stars */}
       <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

    </group>
  )
}

// --- Main Component & UI ---

interface InteractiveWorldMapProps {
  // Removed props, managed internally now or passed differently
}

// Filter Button Component
function FilterButton({ label, value, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out border
        ${isActive
          ? 'bg-premium-gold text-premium-black border-premium-gold shadow-md shadow-premium-gold/30'
          : 'bg-white/10 text-premium-white-soft border-white/20 hover:bg-white/20 hover:border-white/40'}`}
    >
      {label}
    </button>
  );
}

export function InteractiveWorldMap({ }: InteractiveWorldMapProps) {
  const [selectedCountryData, setSelectedCountryData] = useState<CountryData | null>(null);
  const [selectedCountryKey, setSelectedCountryKey] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all'); // State for filtering

  const handleCountrySelect = (key: string | null, countryData: CountryData | null) => {
    setSelectedCountryKey(key);
    setSelectedCountryData(countryData);

    if (countryData) {
      const radius = 2.5;
      const position = latLonToVector3(countryData.lat, countryData.lon, radius);
      setTargetPosition(position);
      setIsZooming(true);
    } else {
      setTargetPosition(null);
      setIsZooming(false);
    }
  };

  const handleClosePanel = () => {
    handleCountrySelect(null, null); // Use the handler to reset state
  };

  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
    handleClosePanel(); // Close panel when filter changes
  };

  const regions = useMemo(() => [
    { label: 'Todos', value: 'all' },
    { label: 'América do Sul', value: 'south-america' },
    { label: 'América do Norte', value: 'north-america' },
    { label: 'Europa', value: 'europe' },
    { label: 'Ásia', value: 'asia' },
    { label: 'África', value: 'africa' },
    { label: 'Oceania', value: 'oceania' },
  ], []);

  return (
    <motion.div
      className="w-full h-[600px] md:h-[800px] cursor-grab active:cursor-grabbing bg-gradient-to-b from-black via-indigo-900/30 to-black rounded-xl shadow-2xl shadow-indigo-500/10 border border-premium-gold/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
    >
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        {regions.map(region => (
          <FilterButton
            key={region.value}
            label={region.label}
            value={region.value}
            isActive={activeFilter === region.value}
            onClick={handleFilterChange}
          />
        ))}
      </div>

      <Canvas shadows dpr={[1, 2]} className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <ambientLight intensity={0.4} />
        <directionalLight
            position={[5, 10, 7]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={<Html center><span className="text-white">Carregando Mapa...</span></Html>}>
          <Environment preset="city" /> {/* Use a preset environment for reflections */}
          <EarthModel
            onRegionSelect={() => {}} // Simplified, region selection handled by filter
            onCountrySelect={handleCountrySelect}
            selectedCountryKey={selectedCountryKey}
            activeFilter={activeFilter} // Pass filter state
          />
          <CameraController targetPosition={targetPosition} isZooming={isZooming} />
        </Suspense>

         {/* Add subtle sparkles for premium feel */}
         <Sparkles count={100} scale={8} size={6} speed={0.4} color="#FFD700" />
      </Canvas>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedCountryData && (
          <CountryInfoPanel country={selectedCountryData} onClose={handleClosePanel} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

