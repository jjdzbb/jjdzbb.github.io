import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParticleSystem } from './ParticleSystem.js';
import { HandInput } from './HandInput.js';
import { MagicCircle } from './MagicCircle.js'; // 1. 引入魔法阵

// --- 1. 基础 Three.js 场景设置 ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.002); // 加上雾效更神秘

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// --- 2. 轨道控制器 ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// --- 3. 实例化模块 (只写这一次！) ---
const particles = new ParticleSystem(scene);
const magicCircle = new MagicCircle(scene); // 2. 实例化魔法阵
const handInput = new HandInput();

// --- 4. GUI 设置 ---
const gui = new GUI({ title: 'Magic Controls' });
const params = {
    color: '#00ff88',
    resetCamera: () => {
        camera.position.set(0, 0, 60);
        controls.reset();
    }
};

gui.addColor(params, 'color').name('Magic Color').onChange(val => {
    particles.setColor(val);
});
gui.add(params, 'resetCamera').name('Reset Camera');


// --- 5. 启动流程 ---
async function init() {
    const statusText = document.getElementById('status-text');
    
    statusText.innerText = "Initializing Camera & AI...";
    await handInput.init();
    
    statusText.innerText = "Running";
    statusText.style.color = "#00ff88";
    
    animate();
}

// --- 6. 动画循环 (只写这一个！) ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();
    
    // 1. 获取 AI 检测结果
    const handState = handInput.detect();
    
    // 2. 更新粒子
    particles.update(handState, deltaTime);

    // 3. 更新魔法阵 (这里加入新逻辑)
    magicCircle.update(handState, deltaTime);
    
    // 4. 更新画面
    controls.update();
    renderer.render(scene, camera);
}

// 窗口自适应
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 开始程序
init();