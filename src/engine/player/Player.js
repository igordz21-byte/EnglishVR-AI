export class Player {

    constructor(scene, canvas) {

        this.camera = new BABYLON.UniversalCamera(
            "playerCamera",
            new BABYLON.Vector3(80, 15, 80),
            scene
        );

        this.camera.setTarget(new BABYLON.Vector3(20, 5, 20));

        this.camera.speed = 0.4;
        this.camera.angularSensibility = 3000;

        this.camera.keysUp = [87];
        this.camera.keysDown = [83];
        this.camera.keysLeft = [65];
        this.camera.keysRight = [68];

        this.camera.attachControl(canvas, false);
        console.log(this.camera.inputs.attached.keyboard);
console.log(this.camera.inputs.attached.mouse);
        console.log(this.camera.inputs.attached);
        canvas.tabIndex = 1;
canvas.focus();
window.addEventListener("keydown", (e) => {
    console.log("KEY:", e.code);
});
    }

    getCamera() {
        return this.camera;
    }

}