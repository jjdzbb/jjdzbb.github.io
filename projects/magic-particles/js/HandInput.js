import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export class HandInput {
    constructor() {
        this.video = document.getElementById('video-input');
        this.handLandmarker = null;
        this.isReady = false;
        
        // 状态输出
        this.state = {
            handDetected: false,
            isFist: false,
            position: { x: 0, y: 0 }
        };
    }

    async init() {
        try {
            console.log("Step 1: 开始加载 WASM..."); 
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );

            console.log("Step 2: WASM 加载成功，开始加载模型...");
            this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    // 确保这里是你刚才修改后的路径，或者原来的 URL
                    modelAssetPath: `./js/hand_landmarker.task`, 
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 1
            });

            console.log("Step 3: 模型加载成功，请求摄像头...");
            await this.startCamera();
            
            console.log("Step 4: 摄像头启动成功！");
            this.isReady = true;
            
            // 隐藏 Loading
            const loadingEl = document.getElementById('loading');
            if(loadingEl) loadingEl.style.display = 'none';
            
        } catch (error) {
            // 这里会打印具体的错误原因
            console.error("❌ 致命错误:", error);
            document.getElementById('status-text').innerText = "Error: " + error.message;
        }
    }

    async startCamera() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = stream;
        return new Promise((resolve) => {
            this.video.onloadeddata = () => {
                this.video.play();
                resolve();
            };
        });
    }

    detect() {
        if (!this.isReady || !this.video.videoWidth) return this.state;

        // 执行检测
        const results = this.handLandmarker.detectForVideo(this.video, performance.now());

        if (results.landmarks && results.landmarks.length > 0) {
            this.state.handDetected = true;
            const landmarks = results.landmarks[0]; // 获取第一只手

            // 简单的“握拳”检测逻辑：
            // 检测指尖 (Tip) 是否靠近 手掌根部 (Wrist) 或 指关节 (MCP)
            // 关键点：0=Wrist, 8=IndexTip, 12=MiddleTip, etc.
            
            const wrist = landmarks[0];
            const middleTip = landmarks[12];
            
            // 计算距离 (简单欧几里得距离)
            const distance = Math.sqrt(
                Math.pow(middleTip.x - wrist.x, 2) + 
                Math.pow(middleTip.y - wrist.y, 2)
            );

            // 阈值判断 (需要根据实际调试微调)
            this.state.isFist = distance < 0.25; 
            
            // 更新 UI
            document.getElementById('gesture-text').innerText = this.state.isFist ? "FIST ✊" : "OPEN ✋";
        } else {
            this.state.handDetected = false;
            this.state.isFist = false;
            document.getElementById('gesture-text').innerText = "None";
        }

        return this.state;
    }
}