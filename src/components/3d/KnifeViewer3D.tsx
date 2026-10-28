import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Shield, Eye, Flame } from 'lucide-react';
import { CS2Skin } from '../../types';

interface KnifeViewer3DProps {
  skin: CS2Skin;
}

export const KnifeViewer3D: React.FC<KnifeViewer3DProps> = ({ skin }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [floatValue, setFloatValue] = useState(skin.float);
  const [isInspecting, setIsInspecting] = useState(false);
  const [lightPreset, setLightPreset] = useState<'galaxy' | 'studio' | 'source2'>('galaxy');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const knifeGroupRef = useRef<THREE.Group | null>(null);
  const bladeMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060706);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    // Dynamic Doppler rim light
    const isPink = skin.skinName.toLowerCase().includes('pink') || skin.skinName.toLowerCase().includes('doppler');
    const primaryRimColor = isPink ? 0xf43f5e : 0xf59e0b;
    const secondaryRimColor = 0x38bdf8;

    const rim1 = new THREE.PointLight(primaryRimColor, 3.2, 20);
    rim1.position.set(4, 3, 3);
    scene.add(rim1);

    const rim2 = new THREE.PointLight(secondaryRimColor, 2.4, 20);
    rim2.position.set(-4, -2, 2);
    scene.add(rim2);

    const rim3 = new THREE.PointLight(0xffffff, 2.0, 15);
    rim3.position.set(0, 5, 2);
    scene.add(rim3);

    // Build Butterfly Knife / Blade 3D Mesh
    const knifeGroup = new THREE.Group();
    knifeGroupRef.current = knifeGroup;

    // Curved Curved Balisong Blade
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0.22, 1.8);
    bladeShape.lineTo(0.28, 2.5);
    bladeShape.lineTo(0.12, 3.2); // tip
    bladeShape.lineTo(0.0, 3.4);
    bladeShape.lineTo(-0.15, 2.9);
    bladeShape.lineTo(-0.18, 1.6);
    bladeShape.lineTo(-0.12, 0.4);
    bladeShape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 4
    };

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
    bladeGeo.center();

    // Doppler Phase 2 Pink Galaxy Physical Material
    const bladeColor = isPink ? 0xd946ef : 0xd97706; // Pink galaxy or Dragon gold
    const bladeMat = new THREE.MeshPhysicalMaterial({
      color: bladeColor,
      roughness: 0.12 + skin.float * 0.4,
      metalness: 0.95,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      iridescence: 0.8,
      iridescenceIOR: 1.3,
      emissive: isPink ? 0x4a044e : 0x451a03,
      emissiveIntensity: 0.25
    });
    bladeMatRef.current = bladeMat;

    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.9;
    knifeGroup.add(blade);

    // Pivot collar & Screws
    const pivotGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 24);
    const pivotMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3, metalness: 0.8 });
    const pivot = new THREE.Mesh(pivotGeo, pivotMat);
    pivot.rotation.x = Math.PI / 2;
    pivot.position.y = -0.55;
    knifeGroup.add(pivot);

    // Left & Right Butterfly Handles
    const handleGeo = new THREE.BoxGeometry(0.18, 2.6, 0.12);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x0f1110, // Matte black anodized titanium
      roughness: 0.35,
      metalness: 0.8
    });

    const leftHandle = new THREE.Mesh(handleGeo, handleMat);
    leftHandle.position.set(-0.25, -1.8, 0);
    leftHandle.rotation.z = 0.08;
    knifeGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, handleMat);
    rightHandle.position.set(0.25, -1.8, 0);
    rightHandle.rotation.z = -0.08;
    knifeGroup.add(rightHandle);

    // Skeletonized holes on handles
    for (let y = -1.0; y >= -2.6; y -= 0.4) {
      const holeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 16);
      const holeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const holeL = new THREE.Mesh(holeGeo, holeMat);
      holeL.rotation.x = Math.PI / 2;
      holeL.position.set(-0.25, y, 0);
      knifeGroup.add(holeL);

      const holeR = new THREE.Mesh(holeGeo, holeMat);
      holeR.rotation.x = Math.PI / 2;
      holeR.position.set(0.25, y, 0);
      knifeGroup.add(holeR);
    }

    knifeGroup.rotation.z = -Math.PI / 12;
    knifeGroup.position.set(0, -0.2, 0);
    scene.add(knifeGroup);

    // Pointer Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging || !knifeGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      knifeGroupRef.current.rotation.y += deltaX * 0.012;
      knifeGroupRef.current.rotation.x += deltaY * 0.008;
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

    // Render loop
    let animId: number;
    let inspectTime = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (knifeGroupRef.current) {
        if (isInspecting) {
          inspectTime += 0.04;
          // CS2 inspect twirl animation
          knifeGroupRef.current.rotation.y = Math.sin(inspectTime) * 1.8 + Math.PI;
          knifeGroupRef.current.rotation.z = Math.cos(inspectTime * 0.7) * 0.6;
          knifeGroupRef.current.rotation.x = Math.sin(inspectTime * 0.5) * 0.4;
        } else if (autoRotate && !isDragging) {
          knifeGroupRef.current.rotation.y += 0.009;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

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
  }, [skin]);

  // Handle Float wear slider change
  useEffect(() => {
    if (bladeMatRef.current) {
      bladeMatRef.current.roughness = 0.08 + floatValue * 0.65;
      bladeMatRef.current.clearcoat = Math.max(0.1, 1.0 - floatValue * 1.2);
    }
  }, [floatValue]);

  const triggerInspect = () => {
    setIsInspecting(true);
    setTimeout(() => {
      setIsInspecting(false);
    }, 3600);
  };

  return (
    <div className="relative w-full h-[480px] bg-obsidian-950 rounded-2xl overflow-hidden border border-fuchsia-500/30 select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Header Info Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-fuchsia-600/90 text-white font-mono text-[10px] font-bold tracking-wider uppercase backdrop-blur shadow-glow-purple">
            {skin.rarityBadge}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/70 text-slate-300 font-mono text-[11px] border border-white/10">
            FLOAT: {floatValue.toFixed(4)}
          </span>
        </div>
        <h4 className="text-sm font-bold font-mono text-white">
          {skin.weapon} | {skin.skinName}
        </h4>
        <p className="text-[11px] font-mono text-fuchsia-300">
          {skin.patternName} • Pattern {skin.patternIndex}
        </p>
      </div>

      {/* Action / Inspect Trigger (CS2 F-Key simulator) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={triggerInspect}
          className="px-3 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-mono text-xs font-bold transition-all shadow-glow-purple flex items-center gap-1.5 active:scale-95"
        >
          <Flame className={`w-3.5 h-3.5 ${isInspecting ? 'animate-bounce' : ''}`} />
          <span>{isInspecting ? 'Inspecionando (Tecla F)...' : 'Inspecionar Shaders [F]'}</span>
        </button>
      </div>

      {/* Bottom Floating Wear Simulator & Orbit Toggle */}
      <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/85 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Float Wear Slider */}
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-sm">
          <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
            Desgaste (Float):
          </span>
          <input
            type="range"
            min="0.0001"
            max="0.99"
            step="0.005"
            value={floatValue}
            onChange={e => setFloatValue(parseFloat(e.target.value))}
            className="w-full accent-fuchsia-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-fuchsia-400 min-w-12 text-right">
            {floatValue < 0.07 ? 'FN' : floatValue < 0.15 ? 'MW' : floatValue < 0.38 ? 'FT' : floatValue < 0.45 ? 'WW' : 'BS'}
          </span>
        </div>

        {/* View Orbit Switch */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
              autoRotate ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>360° Rotação</span>
          </button>
          <button
            onClick={() => setFloatValue(skin.float)}
            className="px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            title="Restaurar Float de Fábrica"
          >
            Reset Float
          </button>
        </div>
      </div>
    </div>
  );
};
