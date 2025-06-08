
"use client"

import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Environment, useTexture, Stars, Trail, Float, Sparkles } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { gsap } from 'gsap'

// --- Data Definitions ---
interface CountryDetails {
  population?: string;
  leagues?: string[];
  championships?: string[];
  famousPlayers?: string[];
}

interface Country {
  id: string
  name: string
  teams: string[]
  position: [number, number, number] // Pre-calculated Cartesian coordinates for simplicity
  region: string
  flag: string
  color: string
  details?: CountryDetails
}

// Assume positions are pre-calculated based on lat/lon for a radius of 2
const countries: Country[] = [
  // América do Sul
  {
    id: "brasil", name: "Brasil", teams: ["Flamengo", "São Paulo"], position: [-0.8, -0.5, 1.8], region: "América do Sul", flag: "🇧🇷", color: "#009C4D",
    details: { population: "214M", championships: ["5x WC"], famousPlayers: ["Pelé", "Neymar"] }
  },
  {
    id: "argentina", name: "Argentina", teams: ["Boca Juniors", "River Plate"], position: [-0.7, -1.2, 1.5], region: "América do Sul", flag: "🇦🇷", color: "#75AADB",
    details: { population: "45M", championships: ["3x WC"], famousPlayers: ["Messi", "Maradona"] }
  },
  // Europa
  {
    id: "espanha", name: "Espanha", teams: ["Real Madrid", "Barcelona"], position: [-0.1, 1.4, 1.4], region: "Europa", flag: "🇪🇸", color: "#C60B1E",
    details: { population: "47M", championships: ["1x WC"], famousPlayers: ["Xavi", "Iniesta"] }
  },
  {
    id: "inglaterra", name: "Inglaterra", teams: ["Man United", "Liverpool"], position: [-0.1, 1.7, 0.9], region: "Europa", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#FFFFFF",
    details: { population: "56M", championships: ["1x WC"], famousPlayers: ["Beckham", "Kane"] }
  },
  {
    id: "italia", name: "Itália", teams: ["Juventus", "Milan"], position: [0.2, 1.4, 1.4], region: "Europa", flag: "🇮🇹", color: "#008C45",
    details: { population: "60M", championships: ["4x WC"], famousPlayers: ["Maldini", "Baggio"] }
  },
  {
    id: "alemanha", name: "Alemanha", teams: ["Bayern", "Dortmund"], position: [0.2, 1.6, 1.0], region: "Europa", flag: "🇩🇪", color: "#FFCC00",
    details: { population: "83M", championships: ["4x WC"], famousPlayers: ["Beckenbauer", "Müller"] }
  },
  {
    id: "franca", name: "França", teams: ["PSG", "Marseille"], position: [0.0, 1.5, 1.2], region: "Europa", flag: "🇫🇷", color: "#0055A4",
    details: { population: "67M", championships: ["2x WC"], famousPlayers: ["Zidane", "Mbappé"] }
  },
  // América do Norte
  {
    id: "eua", name: "EUA", teams: ["LA Galaxy", "Inter Miami"], position: [-1.5, 1.0, 1.0], region: "América do Norte", flag: "🇺🇸", color: "#B31942"
  },
  {
    id: "mexico", name: "México", teams: ["Club América", "Chivas"], position: [-1.6, 0.5, 0.9], region: "América do Norte", flag: "🇲🇽", color: "#006847"
  },
  // Ásia
  {
    id: "japao", name: "Japão", teams: ["Vissel Kobe", "Urawa Reds"], position: [1.8, 1.0, 0.5], region: "Ásia", flag: "🇯🇵", color: "#BC002D"
  },
  {
    id: "arabia_saudita", name: "Arábia Saudita", teams: ["Al-Hilal", "Al-Nassr"], position: [0.8, 0.6, 1.6], region: "Ásia", flag: "🇸🇦", color: "#006C35"
  },
  // África
  {
    id: "egito", name: "Egito", teams: ["Al Ahly", "Zamalek"], position: [0.5, 0.8, 1.7], region: "África", flag: "🇪🇬", color: "#CE1126"
  },
];

// --- 3D Components ---

// Animated Stars Background
function AnimatedStarsBackground() {
  return (
    <Stars
      radius={200} // Increased radius
      depth={80}
      count={7000} // More stars
      factor={5} // Larger stars
      saturation={0}
      fade
      speed={0.5} // Slower speed
    />
  );
}

// Orbiting Satellites/Events Layer
function OrbitingElements() {
  const satelliteRef = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      satelliteRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={satelliteRef}>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={10 + i * 5}>
          <Trail
            width={0.02}
            length={3 + i}
            color={new THREE.Color(0xffffff).lerp(new THREE.Color(0xaaaaaa), i / 4)}
            attenuation={(width) => width * (1 - i * 0.1)}
          >
            <mesh position={[3 + i * 0.5, Math.sin(i) * 2, Math.cos(i) * 2]}>
              <boxGeometry args={[0.05, 0.05, 0.1]} />
              <meshStandardMaterial emissive="white" emissiveIntensity={1} metalness={0.8} roughness={0.2} />
            </mesh>
          </Trail>
        </Float>
      ))}
    </group>
  );
}

// Enhanced Globe Component
function Globe({
  selectedCountry,
  onCountrySelect,
  dayNightCycle // 0 = full night, 1 = full day
}: { selectedCountry: Country | null; onCountrySelect: (country: Country | null) => void; dayNightCycle: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const nightLightsRef = useRef<THREE.Mesh>(null);

  // Load Ultra HD Textures (assuming 8k)
  const earthDayTexture = useTexture('/images/textures/earth_daymap_8k.jpg');
  const earthNightTexture = useTexture('/images/textures/earth_nightmap_8k.jpg'); // Night lights texture
  const earthNormalMap = useTexture('/images/textures/earth_normal_map_8k.jpg');
  const earthSpecularMap = useTexture('/images/textures/earth_specular_map_8k.jpg');
  const cloudsTexture = useTexture('/images/textures/earth_clouds_4k.png');

  // Material for day/night transition
  const earthMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    normalMap: earthNormalMap,
    roughnessMap: earthSpecularMap,
    metalness: 0.2,
    roughness: 0.8,
    normalScale: new THREE.Vector2(1, 1),
    envMapIntensity: 0.6
  }), [earthDayTexture, earthNormalMap, earthSpecularMap]);

  // Material for night lights (additive)
  const nightLightsMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: earthNightTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0, // Start fully transparent
    depthWrite: false,
  }), [earthNightTexture]);

  useFrame(({ clock }) => {
    const rotationSpeed = selectedCountry ? 0.02 : 0.05; // Slower rotation when selected
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y = clock.getElapsedTime() * (rotationSpeed * 0.8);
    if (nightLightsRef.current) nightLightsRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    // Atmosphere Pulse
    if (atmosphereRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 0.6) * 0.03 + 0.98;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
      atmosphereRef.current.material.opacity = Math.sin(clock.getElapsedTime() * 0.8) * 0.1 + 0.15;
    }

    // Day/Night Cycle Logic
    const nightIntensity = 1.0 - dayNightCycle; // Inverse relationship
    nightLightsMaterial.opacity = nightIntensity * 0.8; // Adjust max opacity
    earthMaterial.metalness = 0.2 + nightIntensity * 0.3; // More metallic at night
    earthMaterial.roughness = 0.8 - nightIntensity * 0.2; // Less rough at night
    // Adjust ambient/directional light based on cycle externally if needed
  });

  return (
    <group>
      {/* Earth Sphere */}
      <mesh ref={meshRef} castShadow receiveShadow material={earthMaterial}>
        <sphereGeometry args={[2, 128, 128]} /> {/* Increased segments */}
      </mesh>

      {/* Night Lights Layer */}
      <mesh ref={nightLightsRef} material={nightLightsMaterial}>
        <sphereGeometry args={[2.001, 128, 128]} /> {/* Slightly larger */}
      </mesh>

      {/* Clouds Layer */}
      <mesh ref={cloudsRef} scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.35}
          blending={THREE.NormalBlending}
          depthWrite={false}
          alphaTest={0.05}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          color="#87CEEB"
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Enhanced Country Marker
function CountryMarker({
  country,
  isSelected,
  onSelect,
}: {
  country: Country
  isSelected: boolean
  onSelect: (country: Country | null) => void
}) {
  const markerGroupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const pulseRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.killTweensOf([meshRef.current?.scale, meshRef.current?.material, glowRef.current?.scale, ringRef.current?.rotation, ringRef.current?.scale, pulseRef.current?.scale, pulseRef.current?.material]);

    const targetScale = isSelected ? 1.8 : hovered ? 1.5 : 1;
    gsap.to(meshRef.current.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    gsap.to(meshRef.current.material, { emissiveIntensity: isSelected ? 1.2 : hovered ? 0.9 : 0.3, duration: 0.3 });

    gsap.to(glowRef.current, { visible: isSelected || hovered, duration: 0 });
    gsap.to(glowRef.current.scale, { x: isSelected ? 2.8 : hovered ? 2.2 : 0, y: isSelected ? 2.8 : hovered ? 2.2 : 0, z: isSelected ? 2.8 : hovered ? 2.2 : 0, duration: 0.4, ease: "power3.out" });
    gsap.to(glowRef.current.material, { opacity: isSelected ? 0.5 : 0.35, duration: 0.3 });

    gsap.to(ringRef.current, { visible: isSelected, duration: 0 });
    if (isSelected) {
      gsap.fromTo(ringRef.current.rotation, { z: 0 }, { z: Math.PI * 2, duration: 10, repeat: -1, ease: "none" });
      gsap.fromTo(ringRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 }, { x: 3.2, y: 3.2, z: 3.2, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(ringRef.current.material, { opacity: 0.8, duration: 0.3 });
    } else {
      gsap.to(ringRef.current.material, { opacity: 0, duration: 0.3 });
    }

    gsap.to(pulseRef.current.scale, { x: isSelected ? 10 : hovered ? 8 : 5, y: isSelected ? 10 : hovered ? 8 : 5, z: isSelected ? 10 : hovered ? 8 : 5, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to(pulseRef.current.material, { opacity: isSelected ? 0.15 : hovered ? 0.1 : 0.05, duration: 0.5 });

  }, [isSelected, hovered]);

  return (
    <group ref={markerGroupRef} position={country.position}>
      {/* Outer Pulse */}
      <mesh ref={pulseRef} scale={5}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color={country.color} transparent={true} opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Animated Ring */}
      <mesh ref={ringRef} visible={false} rotation={[Math.PI / 2, 0, 0]} scale={2.5}>
        <ringGeometry args={[0.15, 0.17, 64]} />
        <meshBasicMaterial color={country.color} transparent={true} opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Glow Effect */}
      <mesh ref={glowRef} visible={false} scale={0}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color={country.color} transparent={true} opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Main Marker */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : country); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        castShadow
      >
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial
          color={country.color}
          emissive={country.color}
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.4}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* HTML Tooltip/Info Panel */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 0.15, 0]} center style={{ pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-black/70 backdrop-blur-md text-white p-3 rounded-lg border border-premium-gold/50 shadow-lg min-w-[180px] max-w-[250px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{country.flag}</span>
              <span className="font-bold text-premium-gold text-base">{country.name}</span>
            </div>
            <div className="text-xs text-premium-white-soft mb-1">{country.region}</div>
            {isSelected && country.details && (
              <div className="mt-2 pt-2 border-t border-premium-gold/30 text-xs space-y-1">
                {country.details.population && <div>Pop: {country.details.population}</div>}
                {country.details.championships && <div>🏆 {country.details.championships.join(', ')}</div>}
                {country.details.famousPlayers && <div>⭐ {country.details.famousPlayers.slice(0, 2).join(', ')}...</div>}
              </div>
            )}
             {!isSelected && <div className="text-xs text-premium-white-soft mt-1">Clique para detalhes</div>}
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Camera Controller for smooth focus
function CameraController({ targetPosition }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controlsRef.current?.target);

    const targetVec = targetPosition ? new THREE.Vector3(...targetPosition) : new THREE.Vector3(0, 0, 0);
    const endPosition = targetPosition
      ? targetVec.clone().normalize().multiplyScalar(4) // Zoom in closer
      : new THREE.Vector3(0, 1, 5); // Default position

    gsap.to(camera.position, {
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z,
      duration: 1.8,
      ease: "power3.inOut",
    });

    gsap.to(controlsRef.current?.target, {
      x: targetVec.x * 0.5, // Look towards the target
      y: targetVec.y * 0.5,
      z: targetVec.z * 0.5,
      duration: 1.8,
      ease: "power3.inOut",
      onUpdate: () => controlsRef.current?.update(),
    });

  }, [targetPosition, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      autoRotate={!targetPosition} // Auto-rotate only when nothing is selected
      autoRotateSpeed={0.4}
      minDistance={3}
      maxDistance={10}
      enableDamping={true}
      dampingFactor={0.05}
      target={[0, 0, 0]}
      makeDefault
    />
  );
}

// --- Main Component ---
export function InteractiveGlobe3D() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dayNight, setDayNight] = useState(0.7); // 0 = night, 1 = day

  const handleCountrySelect = (country: Country | null) => {
    setSelectedCountry(country);
  };

  return (
    <motion.div
      className="w-full h-[500px] md:h-[700px] cursor-grab active:cursor-grabbing bg-gradient-to-bl from-black via-blue-900/40 to-black rounded-xl shadow-2xl shadow-blue-500/10 border border-premium-gold/20 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
    >
      {/* Day/Night Slider Control */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
        <span className="text-xs text-premium-gold">☀️</span>
        <input
          type="range"
          min="0" max="1" step="0.01"
          value={dayNight}
          onChange={(e) => setDayNight(parseFloat(e.target.value))}
          className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-premium-gold"
        />
        <span className="text-xs text-premium-gold">🌙</span>
      </div>

      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1, 5], fov: 55 }}>
        <Suspense fallback={<Html center><span className="text-white">Carregando Globo...</span></Html>}>
          {/* Lighting */}
          <ambientLight intensity={0.3 + dayNight * 0.4} /> {/* Ambient light adjusts with cycle */}
          <directionalLight
            position={[5 + (1 - dayNight) * 10, 5, 5]} // Sun position changes
            intensity={1.0 + dayNight * 0.8} // Sun intensity changes
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />

          {/* Environment & Background */}
          <Environment preset="sunset" blur={0.5} /> {/* More dynamic environment */}
          <AnimatedStarsBackground />

          {/* Globe and Markers */}
          <group rotation={[0, 0, 0]}> {/* Optional tilt */}
            <Globe
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                dayNightCycle={dayNight}
            />
            {countries.map((country) => (
              <CountryMarker
                key={country.id}
                country={country}
                isSelected={selectedCountry?.id === country.id}
                onSelect={handleCountrySelect}
              />
            ))}
          </group>

          {/* Effects */}
          <OrbitingElements />
          <Sparkles count={80} scale={6} size={8} speed={0.3} color="#FFFFFF" opacity={0.5} />

          {/* Camera */}
          <CameraController targetPosition={selectedCountry?.position} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

