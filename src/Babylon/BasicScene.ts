import * as BABYLON from "@babylonjs/core";

export default class BasicScene {

    private scene: BABYLON.Scene | undefined;
    private engine: BABYLON.Engine | undefined;
    private uvScale: number = 2;

    private static instance: BasicScene;

    constructor (canvas: HTMLCanvasElement | null = null) {
        if (BasicScene.instance) {
            return BasicScene.instance;
        }

        BasicScene.instance = this;
        this.engine = new BABYLON.Engine(canvas);
        this.scene = this.createScene();
        this.createSkyBox();
        this.renderFigures();

        this.engine.runRenderLoop(() => {
            this.scene?.render();
        });        
    }

    private createScene(): BABYLON.Scene {
        const scene = new BABYLON.Scene(this.engine!);

        const camera: BABYLON.UniversalCamera = new BABYLON.UniversalCamera(
            'camera',
            new BABYLON.Vector3(0, 1, -3),
            scene
        );

        camera.attachControl();
        camera.speed = 0.25;

        return scene;
    }

    private PBRGroung(): BABYLON.PBRMaterial {
        const pbr = new BABYLON.PBRMaterial('pbr', this.scene);

        pbr.albedoTexture = new BABYLON.Texture('/textures/ground/diffuse.png', this.scene);
        pbr.bumpTexture = new BABYLON.Texture('/textures/ground/normal.png', this.scene);
        pbr.invertNormalMapX = true;
        pbr.invertNormalMapY = true;
        pbr.metallicTexture = new BABYLON.Texture('/textures/ground/ao.png', this.scene);
        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true;

        pbr.roughness = 1;

        return pbr;
    }

    public renderFigures() {

        const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround('ground', {
            width: 10,
            height: 10,
            subdivisions: 500,
            updatable: true
        }, this.scene);
        //ground.applyDisplacementMap('/textures/ground/displacement.png', 0, 0.5, undefined, undefined, new BABYLON.Vector2(2, 2));
        ground.material = this.PBRGroung();

        const ball: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere('ball', {
            diameter: 2
        }, this.scene);

        ball.position.y= 1;
        ball.applyDisplacementMap('/textures/sphere/displacement.png', 0, 0.5, undefined, undefined, new BABYLON.Vector2(2, 2));
        ball.material = this.createBallMaterial();

        const light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
            'light',
            new BABYLON.Vector3(1, -1, 0),
            this.scene!
        );
        light.intensity = 0.7;
    }

    private createSkyBox() {
        const envTex = BABYLON.CubeTexture.CreateFromPrefilteredData('/environment/sky.env', this.scene!);
        this.scene!.environmentTexture = envTex;
        this.scene?.createDefaultSkybox(envTex, true);
    }
 
    private createGroundMaterial(): BABYLON.StandardMaterial {
        const groundMaterial = new BABYLON.StandardMaterial('groundMat', this.scene);
        const textureArray: Array<BABYLON.Texture> = [];

        const diffuseTex = new BABYLON.Texture('/textures/ground/diffuse.png', this.scene);
        diffuseTex.uScale = this.uvScale;
        diffuseTex.vScale = this.uvScale;
        groundMaterial.diffuseTexture = diffuseTex;
        textureArray.push(diffuseTex);

        const AOTex = new BABYLON.Texture('/textures/ground/ao.png', this.scene);
        groundMaterial.ambientTexture = AOTex;
        textureArray.push(AOTex);

        const normalTex = new BABYLON.Texture('/textures/ground/normal.png', this.scene);
        groundMaterial.bumpTexture = normalTex;
        groundMaterial.invertNormalMapX = true;
        groundMaterial.invertNormalMapY = true;
        textureArray.push(normalTex);

        const roughTex = new BABYLON.Texture('/textures/ground/rough.png', this.scene);
        groundMaterial.specularTexture = roughTex;
        groundMaterial.specularPower = 1500;
        groundMaterial.useGlossinessFromSpecularMapAlpha = true;
        textureArray.push(roughTex);

        for (let texture of textureArray) {
            texture.uScale = this.uvScale;
            texture.vScale = this.uvScale;
        }

        return groundMaterial;
    }
    private createBallMaterial(): BABYLON.StandardMaterial {
        const ballMaterial = new BABYLON.StandardMaterial('ballMat', this.scene);

        const textureArray: Array<BABYLON.Texture> = [];

        const diffuseTex = new BABYLON.Texture('/textures/sphere/diffuse.png', this.scene);
        diffuseTex.uScale = this.uvScale;
        diffuseTex.vScale = this.uvScale;
        ballMaterial.diffuseTexture = diffuseTex;
        textureArray.push(diffuseTex);

        const AOTex = new BABYLON.Texture('/textures/sphere/ao.png', this.scene);
        ballMaterial.ambientTexture = AOTex;
        textureArray.push(AOTex);

        const normalTex = new BABYLON.Texture('/textures/sphere/normal.png', this.scene);
        ballMaterial.bumpTexture = normalTex;
        ballMaterial.invertNormalMapX = true;
        ballMaterial.invertNormalMapY = true;
        textureArray.push(normalTex);

        const roughTex = new BABYLON.Texture('/textures/sphere/rough.png', this.scene);
        ballMaterial.specularTexture = roughTex;
        ballMaterial.specularPower = 1500;
        ballMaterial.useGlossinessFromSpecularMapAlpha = true;
        textureArray.push(roughTex);

        for (let texture of textureArray) {
            texture.uScale = this.uvScale;
            texture.vScale = this.uvScale;
        }

        return ballMaterial;
    }
}