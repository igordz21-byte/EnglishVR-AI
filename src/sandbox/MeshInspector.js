export class MeshInspector {

    constructor(scene) {
console.log("MeshInspector started");
        this.scene = scene;

        this.selectedMesh = null;

        window.addEventListener("keydown", (e) => {

            switch (e.code) {

                case "KeyM":
                    this.inspect();
                    break;

                case "KeyH":
                    this.toggleHighlight();
                    break;

                case "KeyC":
                    this.enableCollision();
                    break;

                case "KeyV":
                    this.disableCollision();
                    break;

                case "KeyL":
                    this.listCollisionMeshes();
                    break;

            }

        });

    }

    inspect() {

        const pick = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY
        );

        if (!pick.hit) {

            console.log("Nothing selected.");
            return;

        }

        this.selectedMesh = pick.pickedMesh;

        console.clear();

        console.log("========== MESH ==========");
        console.log("Name:", this.selectedMesh.name);
        console.log("ID:", this.selectedMesh.id);
        console.log("Vertices:", this.selectedMesh.getTotalVertices());
        console.log("Collision:", this.selectedMesh.checkCollisions);

        console.log(
            "Position:",
            this.selectedMesh.position
        );

        console.log(
            "Material:",
            this.selectedMesh.material
                ? this.selectedMesh.material.name
                : "none"
        );

        console.log(
            "Parent:",
            this.selectedMesh.parent
                ? this.selectedMesh.parent.name
                : "none"
        );

        console.log("==========================");

    }

    toggleHighlight() {

        if (!this.selectedMesh) return;

        this.selectedMesh.showBoundingBox =
            !this.selectedMesh.showBoundingBox;

        console.log(
            "BoundingBox:",
            this.selectedMesh.showBoundingBox
        );

    }

    enableCollision() {

        if (!this.selectedMesh) return;

        this.selectedMesh.checkCollisions = true;

        console.log(
            "✔ Collision ENABLED:",
            this.selectedMesh.name
        );

    }

    disableCollision() {

        if (!this.selectedMesh) return;

        this.selectedMesh.checkCollisions = false;

        console.log(
            "❌ Collision DISABLED:",
            this.selectedMesh.name
        );

    }

    listCollisionMeshes() {

        console.clear();

        console.log("===== COLLISION MESHES =====");

        this.scene.meshes.forEach(mesh => {

            if (mesh.checkCollisions) {

                console.log(mesh.name);

            }

        });

        console.log("============================");

    }

}