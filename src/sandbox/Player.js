export class Player {

    constructor(scene, canvas) {

        this.camera = new BABYLON.UniversalCamera(
            "player",
            new BABYLON.Vector3(
                -26.298359743385074,
                18.77366740908642,
                -58.443126444230735
            ),
            scene
        );

        // Kierunek patrzenia
        this.camera.setTarget(
            new BABYLON.Vector3(
                -97.9520507029031,
                26.13533995162377,
                -154.44080831351283
            )
        );

        this.camera.speed = 0.45;
        this.camera.angularSensibility = 2500;

        this.camera.minZ = 0.1;

        this.camera.keysUp = [87];      // W
        this.camera.keysDown = [83];    // S
        this.camera.keysLeft = [65];    // A
        this.camera.keysRight = [68];   // D

        this.camera.attachControl(canvas, true);

        scene.activeCamera = this.camera;

    }

    getCamera() {
        return this.camera;
    }

}