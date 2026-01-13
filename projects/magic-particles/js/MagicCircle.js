import * as THREE from 'three';

export class MagicCircle {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.visible = false;
        
        this.init();
    }

    // --- 黑科技：用代码画一张魔法阵贴图 ---
    createMagicTexture() {
        const size = 1024;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        const cx = size / 2;
        const cy = size / 2;

        ctx.strokeStyle = '#ffaa00'; // 奇异博士的橙色
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff4400';
        ctx.lineWidth = 10;

        // 1. 外圈
        ctx.beginPath();
        ctx.arc(cx, cy, 400, 0, Math.PI * 2);
        ctx.stroke();

        // 2. 内圈
        ctx.beginPath();
        ctx.arc(cx, cy, 350, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.stroke();

        // 3. 画一个正方形
        ctx.strokeRect(cx - 240, cy - 240, 480, 480);
        
        // 4. 画一个旋转45度的正方形 (菱形)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-240, -240, 480, 480);
        ctx.restore();

        // 5. 画一些神秘符文 (随机线条模拟)
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#ffaa00';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for(let i=0; i<8; i++) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(i * (Math.PI / 4));
            ctx.translate(0, -300);
            ctx.fillText('⚡', 0, 0); // 用闪电符号代替符文
            ctx.restore();
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    init() {
        const texture = this.createMagicTexture();
        
        // 创建一个平面来承载这个纹理
        const geometry = new THREE.PlaneGeometry(30, 30);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0, // 初始不可见
            side: THREE.DoubleSide,
            depthWrite: false, // 避免遮挡粒子
            blending: THREE.AdditiveBlending // 发光混合模式
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    update(handState, deltaTime) {
        if (!this.mesh) return;

        // 1. 旋转动画 (一直都在转)
        this.mesh.rotation.z -= 0.5 * deltaTime;

        // 2. 显隐控制
        if (handState.handDetected) {
            // 如果有手，慢慢显现 (opacity -> 1)
            this.mesh.material.opacity = THREE.MathUtils.lerp(this.mesh.material.opacity, 1.0, 0.05);
            this.mesh.scale.setScalar(THREE.MathUtils.lerp(this.mesh.scale.x, 1.0, 0.05));
            
            // 如果握拳，魔法阵变红且加速
            if (handState.isFist) {
                 this.mesh.rotation.z -= 2.0 * deltaTime; // 疯狂加速
                 this.mesh.material.color.setHex(0xff0000); // 变红
            } else {
                 this.mesh.material.color.setHex(0xffffff); // 恢复原色
            }
            
        } else {
            // 如果没手，慢慢消失 (opacity -> 0)
            this.mesh.material.opacity = THREE.MathUtils.lerp(this.mesh.material.opacity, 0, 0.1);
            this.mesh.scale.setScalar(THREE.MathUtils.lerp(this.mesh.scale.x, 0.1, 0.1));
        }
    }
}