export class CollisionManager {

    constructor(scene) {

        this.scene = scene;

        window.addEventListener("keydown", (e) => {

            switch (e.code) {

                case "KeyR":
                    this.scanScene();
                    break;

                case "KeyY":
                    this.enableMeshUnderCursor();
                    break;

            }

        });

    }

    scanScene() {

        console.clear();

        console.log("========== SCENE ==========");

        let meshes = 0;
        let vertices = 0;

        this.scene.meshes.forEach(mesh => {

            const v = mesh.getTotalVertices();

            if (v > 0) {

                meshes++;

                vertices += v;

                console.log(
                    mesh.name,
                    "| vertices:",
                    v,
                    "| collision:",
                    mesh.checkCollisions
                );

            }

        });

        console.log("");

        console.log("Meshes:", meshes);

        console.log("Vertices:", vertices);

    }

    enableMeshUnderCursor() {

        const pick = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY
        );

        if (!pick.hit) {

            console.log("Nothing selected.");

            return;

        }

        const mesh = pick.pickedMesh;

        mesh.checkCollisions = true;

        mesh.showBoundingBox = true;

        console.clear();

        console.log("Collision enabled");
        console.log(mesh.name);
        console.log("Vertices:", mesh.getTotalVertices());

    }

}