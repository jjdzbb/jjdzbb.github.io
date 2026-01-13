import * as THREE from 'three';

export class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particleCount = 5000; // 粒子数量
        this.baseSpeed = 0.5;
        this.targetSpeed = 0.5;
        this.expansion = 1.0; // 扩散系数
        
        this.initParticles();
    }

    initParticles() {
        // 核心：使用 BufferGeometry (GPU友好)
        this.geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        
        const color = new THREE.Color(0x00ff88); // 默认绿色魔法

        for (let i = 0; i < this.particleCount; i++) {
            // 生成球形分布的粒子
            const r = 10 + Math.random() * 30; // 半径
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // 材质
        this.material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });

        this.particles = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particles);
    }

    // 更新状态（每帧调用）
    // interactionState: { isFist: boolean, handDetected: boolean }
    update(interactionState, deltaTime) {
        const positions = this.geometry.attributes.position.array;
        const time = Date.now() * 0.001;

        // --- 1. 响应手势逻辑 ---
        if (interactionState.isFist) {
            // 握拳：加速 + 收缩
            this.targetSpeed = 4.0; 
            this.expansion = THREE.MathUtils.lerp(this.expansion, 0.3, 0.1); 
        } else if (interactionState.handDetected) {
            // 张开：减速 + 扩散
            this.targetSpeed = 0.5;
            this.expansion = THREE.MathUtils.lerp(this.expansion, 1.5, 0.05);
        } else {
            // 无手：恢复默认
            this.targetSpeed = 1.0;
            this.expansion = THREE.MathUtils.lerp(this.expansion, 1.0, 0.05);
        }

        // 平滑速度变化
        this.baseSpeed = THREE.MathUtils.lerp(this.baseSpeed, this.targetSpeed, 0.1);

        // --- 2. 旋转整体 ---
        this.particles.rotation.z += this.baseSpeed * deltaTime * 0.5;
        this.particles.rotation.y += this.baseSpeed * deltaTime * 0.2;

        // --- 3. 动态更新粒子位置 (呼吸效果) ---
        // 注意：直接修改 BufferGeometry 的顶点开销较大，这里我们做简单的缩放模拟
        this.particles.scale.setScalar(this.expansion);
        
        // 标记需要更新 (虽然这里我们用了 scale 属性，不需要重传顶点，但如果改颜色就需要)
        // this.geometry.attributes.position.needsUpdate = true;
    }
    
    setColor(hex) {
        const color = new THREE.Color(hex);
        const colors = this.geometry.attributes.color.array;
        for (let i = 0; i < this.particleCount; i++) {
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        this.geometry.attributes.color.needsUpdate = true;
    }
}