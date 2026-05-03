import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── Scene Setup ─────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 4.75);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ─── Globe Group (everything rotates together) ───────────────
    const globeGroup = new THREE.Group();
    // Tilt the globe slightly for a nicer angle
    globeGroup.rotation.x = 0.12;
    // Start with India facing camera (India ~79°E)
    globeGroup.rotation.y = -3.55;
    scene.add(globeGroup);

    // ─── Earth Sphere ────────────────────────────────────────────
    const earthRadius = 1.5;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );
    const bumpMap = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png"
    );

    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.015,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });

    const earth = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earth);

    // ─── Atmospheric Glow (outer halo) ───────────────────────────
    const glowGeo = new THREE.SphereGeometry(earthRadius * 1.15, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          vec3 color = mix(vec3(0.1, 0.4, 0.8), vec3(0.05, 0.15, 0.35), intensity);
          gl_FragColor = vec4(color, intensity * 0.6);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // ─── Inner atmosphere rim ────────────────────────────────────
    const innerGlowGeo = new THREE.SphereGeometry(earthRadius * 1.01, 64, 64);
    const innerGlowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = vec3(0.3, 0.6, 1.0);
          gl_FragColor = vec4(color, intensity * 0.35);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    globeGroup.add(innerGlow);

    // ─── Lighting ────────────────────────────────────────────────
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x88aaff, 0.8);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xd4a843, 1.2);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x404060, 0.6));

    // ─── Helpers ─────────────────────────────────────────────────
    function latLngToVector3(lat, lng, radius = earthRadius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // ─── City Markers ────────────────────────────────────────────
    const destinations = [
      { name: "India", lat: 20.5937, lng: 78.9629, isOrigin: true },
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
    ];

    // Create markers with depthTest: true
    destinations.forEach((dest) => {
      const pos = latLngToVector3(dest.lat, dest.lng, earthRadius * 1.015);

      // Outer ring (pulse ring)
      const ringGeo = new THREE.RingGeometry(0.02, 0.035, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dest.isOrigin ? 0xd4a843 : 0x66bbff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthTest: true,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ring);

      // Inner dot
      const dotGeo = new THREE.SphereGeometry(
        dest.isOrigin ? 0.025 : 0.015,
        16,
        16
      );
      const dotMat = new THREE.MeshBasicMaterial({
        color: dest.isOrigin ? 0xffd700 : 0x88ccff,
        depthTest: true,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Glow sprite for origin
      if (dest.isOrigin) {
        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = 64;
        glowCanvas.height = 64;
        const ctx = glowCanvas.getContext("2d");
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 200, 50, 0.8)");
        gradient.addColorStop(0.3, "rgba(255, 180, 50, 0.3)");
        gradient.addColorStop(1, "rgba(255, 180, 50, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const glowTex = new THREE.CanvasTexture(glowCanvas);
        const spriteMat = new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthTest: true,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(pos);
        sprite.scale.set(0.2, 0.2, 1);
        globeGroup.add(sprite);
      }
    });

    // ─── Trade Route Arcs ────────────────────────────────────────
    const routesData = [
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 40.7128, lng: -74.006 },
        color1: 0xffd700,
        color2: 0xff6b35,
        label: "Spices & Tea",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 51.5074, lng: -0.1278 },
        color1: 0xffd700,
        color2: 0x66bbff,
        label: "Textiles",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 35.6762, lng: 139.6503 },
        color1: 0xffd700,
        color2: 0xff69b4,
        label: "Electronics",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: -33.8688, lng: 151.2093 },
        color1: 0xffd700,
        color2: 0x44ff88,
        label: "Pharmaceuticals",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 25.2048, lng: 55.2708 },
        color1: 0xffd700,
        color2: 0xff9944,
        label: "Food Grains",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 1.3521, lng: 103.8198 },
        color1: 0xffd700,
        color2: 0xaa66ff,
        label: "Makhana",
      },
      {
        from: { lat: 20.5937, lng: 78.9629 },
        to: { lat: 53.5511, lng: 9.9937 },
        color1: 0xffd700,
        color2: 0x55ddff,
        label: "Chemicals",
      },
    ];

    const routes = [];

    routesData.forEach((routeInfo, index) => {
      const start = latLngToVector3(
        routeInfo.from.lat,
        routeInfo.from.lng,
        earthRadius * 1.01
      );
      const end = latLngToVector3(
        routeInfo.to.lat,
        routeInfo.to.lng,
        earthRadius * 1.01
      );

      // Calculate arc height based on distance
      const distance = start.distanceTo(end);
      const arcHeight = earthRadius + distance * 0.35;

      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

      // ── TUBE ARC (thick, visible with depthTest: true) ────────────
      const tubeSegments = 120;
      const tubeGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.008, 6, false);

      // Apply gradient vertex colors to tube
      const tubeColors = [];
      const c1 = new THREE.Color(routeInfo.color1);
      const c2 = new THREE.Color(routeInfo.color2);
      const vertexCount = tubeGeo.attributes.position.count;

      for (let i = 0; i < vertexCount; i++) {
        const t = (i / vertexCount);
        const c = c1.clone().lerp(c2, t);
        tubeColors.push(c.r, c.g, c.b);
      }
      tubeGeo.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(tubeColors, 3)
      );

      const tubeMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthTest: true,
        side: THREE.DoubleSide,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.visible = true; // Always visible for premium effect
      globeGroup.add(tubeMesh);

      // ── GLOW TUBE (larger, faded) ──────────────────────────────
      const glowTubeGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.022, 6, false);
      const glowColors = [];
      const glowVertexCount = glowTubeGeo.attributes.position.count;
      for (let i = 0; i < glowVertexCount; i++) {
        const t = (i / glowVertexCount);
        const c = c1.clone().lerp(c2, t);
        glowColors.push(c.r, c.g, c.b);
      }
      glowTubeGeo.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(glowColors, 3)
      );

      const glowTubeMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
        depthTest: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const glowTubeMesh = new THREE.Mesh(glowTubeGeo, glowTubeMat);
      glowTubeMesh.visible = true;
      globeGroup.add(glowTubeMesh);

      // Traveling particles (glowing spheres with depthTest: true)
      const particles = [];
      const particleCount = 3;
      for (let p = 0; p < particleCount; p++) {
        const pCanvas = document.createElement("canvas");
        pCanvas.width = 64;
        pCanvas.height = 64;
        const pCtx = pCanvas.getContext("2d");
        const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        pGrad.addColorStop(0, "rgba(255, 240, 150, 1)");
        pGrad.addColorStop(0.2, "rgba(255, 200, 80, 0.8)");
        pGrad.addColorStop(0.5, "rgba(255, 160, 40, 0.3)");
        pGrad.addColorStop(1, "rgba(255, 120, 20, 0)");
        pCtx.fillStyle = pGrad;
        pCtx.fillRect(0, 0, 64, 64);

        const pTex = new THREE.CanvasTexture(pCanvas);
        const pMat = new THREE.SpriteMaterial({
          map: pTex,
          transparent: true,
          depthTest: true,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(pMat);
        sprite.scale.set(0.09, 0.09, 1);
        sprite.visible = true;
        globeGroup.add(sprite);
        particles.push({
          sprite,
          offset: p / particleCount,
        });
      }

      routes.push({
        curve,
        tubeMesh,
        glowTubeMesh,
        particles,
        startDelay: index * 20,
      });
    });

    // ─── Starfield Background ────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 800; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 10;
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    starGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ─── Animation Loop ──────────────────────────────────────────
    let animationId;
    let time = 0;

    const animate = () => {
      time++;

      // Smooth, fast, dynamic rotation
      globeGroup.rotation.y += 0.0035;

      // Animate each route infinitely & continuously without sudden pops
      routes.forEach((route) => {
        route.particles.forEach((particle) => {
          const t = ((time * 0.005 + particle.offset) % 1.0) * 0.98 + 0.01;
          const pos = route.curve.getPoint(t);
          particle.sprite.position.copy(pos);

          // Pulse scale smoothly
          const pulse = 1 + Math.sin(time * 0.1 + particle.offset * 10) * 0.25;
          particle.sprite.scale.set(0.09 * pulse, 0.09 * pulse, 1);
        });
      });

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // ─── Resize Handler ──────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // ─── Cleanup ─────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    />
  );
}