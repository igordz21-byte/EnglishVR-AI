export class LevelEditor {

    constructor(scene) {

        this.scene = scene;

        window.addEventListener("keydown", (e) => {

            switch (e.code) {

                case "KeyM":
                    this.pickMesh();
                    break;

                case "KeyP":
                    this.printMeshes();
                    break;

            }

        });

    }

    pickMesh() {

        const pick = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY
        );

        if (!pick.hit) {

            console.log("NIC");

            return;

        }

        const mesh = pick.pickedMesh;

        mesh.showBoundingBox = true;

        console.clear();

        console.log("NAZWA:", mesh.name);
        console.log("ID:", mesh.id);
        console.log("VERTICES:", mesh.getTotalVertices());

    }

    printMeshes() {

        console.clear();

        console.log("========== MESHES ==========");

        this.scene.meshes
            .slice()
            .sort((a, b) => b.getTotalVertices() - a.getTotalVertices())
            .forEach(mesh => {

                console.log(
                    mesh.name.padEnd(20),
                    mesh.getTotalVertices()
                );

            });

    }

}