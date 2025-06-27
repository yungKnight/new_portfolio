const h = window.innerHeight;
const w = window.innerWidth;
    
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
    
let fov = 90;
let aspect = w / h;
let near = 0.1;
let far = 100;
let currentZ = 2;

if (w < 480) {
    fov = 135;
} else if (w > 480  && w <= 767 ) {
    fov = 120;
    currentZ = -2.5
} else if (w > 767  && w < 1025 ) {
    fov = 120;
    currentZ = -3;
} else {
    fov = 90;
}
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = currentZ;
    
const scene = new THREE.Scene();
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableZoom = false;
const isTouchDevice = ('ontouchstart' in window) && 
                      (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
controls.enableRotate = !isTouchDevice;
controls.enablePan = false;

const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.75);
scene.add(ambientLight);

const addStar = () => {
    const geo = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geo, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
    star.position.set(x, y, z);
    scene.add(star);
};

Array(2500).fill().forEach(() => addStar());
    
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const basicMaterial = new THREE.MeshStandardMaterial({
    color: "white",    
    wireframe: false,  
    flatShading: true,
});
    
const mesh = new THREE.Mesh(geo, basicMaterial);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight("blue", "green", 0.7);
scene.add(hemiLight);

const wireMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
    wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMaterial);
wireMesh.scale.setScalar(1.005);
mesh.add(wireMesh);

let lastScrollY = 0;
window.addEventListener("scroll", () => {
    let scrollY = window.scrollY; 
    
    gsap.to(camera.position, {
        z: currentZ + scrollY * 0.01,
        x: -scrollY * 0.0015,
        y: scrollY * 0.0003,
        duration: 0.5,
        ease: "power2.out"
    });
    let rotationSpeed = (scrollY - lastScrollY) * 0.01;
    gsap.to(mesh.rotation, {
        x: mesh.rotation.x + rotationSpeed,
        y: mesh.rotation.y - rotationSpeed,
        z: mesh.rotation.z + rotationSpeed * 0.5,
        duration: 0.5,
        ease: "power2.out"
    });
    lastScrollY = scrollY;
});

const animate = (t = 0) => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    mesh.rotation.z = t * -0.0001;
    mesh.rotation.x = t * 0.0001;
    mesh.rotation.y = t * -0.0005;
};
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});