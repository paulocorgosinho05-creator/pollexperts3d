import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Sun, Eye } from 'lucide-react';

interface CueViewer3DProps {
  cueName?: string;
  engravingText?: string;
  woodType?: string;
  tipSize?: string;
}

export const CueViewer3D: React.FC<CueViewer3DProps> = ({
  cueName = 'Goku Saiyan Pro 145cm',
  engravingText = 'POLLEXPERTS #08',
  woodType = 'Maple Canadense',
  tipSize = '11.0mm'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightPreset, setLightPreset] = useState<'gold' | 'neon' | 'studio'>('gold');
  const [viewAngle, setViewAngle] = useState<'full' | 'tip' | 'grip' | 'butt'>('full');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cueGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    point1: THREE.PointLight;
    point2: THREE.PointLight;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080a08);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 8.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const point1 = new THREE.PointLight(0xfacc15, 2.8, 20);
    point1.position.set(4, 5, 4);
    scene.add(point1);

    const point2 = new THREE.PointLight(0x06b6d4, 1.8, 20);
    point2.position.set(-4, -2, 3);
    scene.add(point2);

    lightsRef.current = { ambient, point1, point2 };

    // Create 3D Pool Cue
    const cueGroup = new THREE.Group();
    cueGroupRef.current = cueGroup;

    // Shaft (Tapered Cylinder)
    const shaftGeo = new THREE.CylinderGeometry(0.065, 0.11, 4.5, 32);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xdfd3b8, // Natural Canadian Maple
      roughness: 0.28,
      metalness: 0.08,
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 1.3;
    cueGroup.add(shaft);

    // Tip Ferrule (Brass / Ivorine)
    const ferruleGeo = new THREE.CylinderGeometry(0.066, 0.066, 0.15, 32);
    const ferruleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
    });
    const ferrule = new THREE.Mesh(ferruleGeo, ferruleMat);
    ferrule.position.y = 3.6;
    cueGroup.add(ferrule);

    // Tip (Layered Leather)
    const tipGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 32);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0x1d3557, // Blue Kamui tip
      roughness: 0.8,
      metalness: 0.0,
    });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.y = 3.71;
    cueGroup.add(tip);

    // Joint Ring (Gold metallic collar)
    const jointGeo = new THREE.CylinderGeometry(0.115, 0.115, 0.1, 32);
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.15,
      metalness: 0.9,
    });
    const joint = new THREE.Mesh(jointGeo, jointMat);
    joint.position.y = -0.98;
    cueGroup.add(joint);

    // Butt section upper (Dragon Ball Graphic theme - Black/Orange lacquer)
    const buttUpperGeo = new THREE.CylinderGeometry(0.118, 0.145, 2.2, 32);
    const buttUpperMat = new THREE.MeshStandardMaterial({
      color: 0x151210,
      roughness: 0.12,
      metalness: 0.25,
    });
    const buttUpper = new THREE.Mesh(buttUpperGeo, buttUpperMat);
    buttUpper.position.y = -2.1;
    cueGroup.add(buttUpper);

    // Grip (Textured Leather Wrap)
    const gripGeo = new THREE.CylinderGeometry(0.146, 0.155, 1.6, 32);
    const gripMat = new THREE.MeshStandardMaterial({
      color: 0x221a14, // Dark embossed leather
      roughness: 0.85,
      metalness: 0.05,
    });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.y = -3.2;
    cueGroup.add(grip);

    // Butt Cap & Bumper (Pollexperts Gold seal)
    const bumperGeo = new THREE.CylinderGeometry(0.155, 0.165, 0.45, 32);
    const bumperMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.85,
    });
    const bumper = new THREE.Mesh(bumperGeo, bumperMat);
    bumper.position.y = -4.1;
    cueGroup.add(bumper);

    // Subtle tilt for dynamic 3D presentation
    cueGroup.rotation.z = Math.PI / 4.5;
    cueGroup.rotation.x = Math.PI / 10;
    scene.add(cueGroup);

    // Subtle floor glow circle
    const floorGeo = new THREE.CircleGeometry(3.5, 32);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0xeab308,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4.2;
    scene.add(floor);

    // Pointer Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging || !cueGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      cueGroupRef.current.rotation.y += deltaX * 0.01;
      cueGroupRef.current.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (cueGroupRef.current && autoRotate && !isDragging) {
        cueGroupRef.current.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, []);

  // Handle Preset Changes
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { point1, point2 } = lightsRef.current;
    if (lightPreset === 'gold') {
      point1.color.setHex(0xfacc15);
      point2.color.setHex(0xf97316);
      sceneRef.current.background = new THREE.Color(0x0a0c09);
    } else if (lightPreset === 'neon') {
      point1.color.setHex(0x06b6d4);
      point2.color.setHex(0xd946ef);
      sceneRef.current.background = new THREE.Color(0x05070a);
    } else {
      point1.color.setHex(0xffffff);
      point2.color.setHex(0xe2e8f0);
      sceneRef.current.background = new THREE.Color(0x111311);
    }
  }, [lightPreset]);

  // Handle View Angle Changes
  useEffect(() => {
    if (!cameraRef.current || !cueGroupRef.current) return;
    const cam = cameraRef.current;
    if (viewAngle === 'full') {
      cam.position.set(0, 1.8, 8.5);
      cueGroupRef.current.position.set(0, 0, 0);
    } else if (viewAngle === 'tip') {
      cam.position.set(0, 3.5, 4.2);
      cueGroupRef.current.position.set(0, -1.8, 0);
    } else if (viewAngle === 'grip') {
      cam.position.set(0, -1.8, 4.2);
      cueGroupRef.current.position.set(0, 1.8, 0);
    } else {
      cam.position.set(0, -3.2, 3.5);
      cueGroupRef.current.position.set(0, 3.2, 0);
    }
  }, [viewAngle]);

  return (
    <div className="relative w-full h-[480px] bg-obsidian-950 rounded-2xl overflow-hidden border border-white/10 select-none">
      {/* 3D Canvas Mounting point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge & Telemetry */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur border border-amberGold-500/50 text-[10px] font-mono text-amberGold-400 font-bold uppercase tracking-wider">
            3D PBR REALTIME RENDER
          </span>
          <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-slate-300">
            {cueName}
          </span>
        </div>
        <p className="text-[11px] font-mono text-slate-400">
          Madeira: <strong className="text-white">{woodType}</strong> • Ponteira: <strong className="text-amberGold-400">{tipSize}</strong>
        </p>
        {engravingText && (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            <span>Laser:</span>
            <span className="font-bold tracking-widest text-white">"{engravingText}"</span>
          </div>
        )}
      </div>

      {/* Top Right: Light Presets */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur p-1 rounded-xl border border-white/10">
        <button
          onClick={() => setLightPreset('gold')}
          className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors flex items-center gap-1 ${
            lightPreset === 'gold' ? 'bg-amberGold-500 text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Iluminação Dourada Nobre"
        >
          <Sparkles className="w-3 h-3" /> Gold
        </button>
        <button
          onClick={() => setLightPreset('neon')}
          className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors flex items-center gap-1 ${
            lightPreset === 'neon' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Iluminação Cyber Neon"
        >
          <Sun className="w-3 h-3" /> Cyber
        </button>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
        {/* Camera Focus Angles */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Foco:</span>
          {(['full', 'tip', 'grip', 'butt'] as const).map(angle => (
            <button
              key={angle}
              onClick={() => setViewAngle(angle)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                viewAngle === angle
                  ? 'bg-white/20 text-white font-bold border border-white/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {angle === 'full' ? 'Geral' : angle === 'tip' ? 'Ponteira' : angle === 'grip' ? 'Empunhadura' : 'Culatra'}
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
              autoRotate ? 'bg-amberGold-500/20 text-amberGold-400 border border-amberGold-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title="Girar Automaticamente"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="text-[11px]">360° Giro</span>
          </button>
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
            Arraste com o mouse para orbitar
          </span>
        </div>
      </div>
    </div>
  );
};
