import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface Props {
    id: string;
}

export default function RotateThings({ id }: Props) {
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = viewerRef.current;
        if (!container) return;

        // scene
        const scene = new THREE.Scene();

        // camera
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 5000);
        camera.position.set(0, 0, 120);

        // renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // light
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(100, 100, 100);
        scene.add(light);

        // resize
        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener("resize", resize);

        // mesh reference for rotation
        let modelMesh: THREE.Mesh | null = null;

        // load STL (asset)
        const loader = new STLLoader();
        loader.load(
            `${import.meta.env.BASE_URL}models/${id}_symbol.stl`,
            (geometry) => {
                geometry.center();
                geometry.computeVertexNormals();

                const mesh = new THREE.Mesh(
                    geometry,
                    new THREE.MeshStandardMaterial({
                        color: 0xcccccc,
                        roughness: 0.4,
                        metalness: 0.6,
                    })
                );
                // Rotate to face camera better initially if needed
                mesh.rotation.x = -Math.PI / 2;

                geometry.computeBoundingBox();
                const box = geometry.boundingBox!;
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);

                const target = 80; // Slightly larger target size
                const s = target / maxDim;
                mesh.scale.setScalar(s);

                scene.add(mesh);
                modelMesh = mesh;
            }
        );

        // render loop
        let raf = 0;
        const animate = () => {
            raf = requestAnimationFrame(animate);
            if (modelMesh) {
                modelMesh.rotation.z += 0.005; // Rotate around Z axis (since we rotated X)
            }
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            renderer.dispose();
            if (renderer.domElement.parentElement === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return viewerRef;

}