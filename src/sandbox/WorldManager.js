export class WorldManager {

    constructor(scene) {

        this.scene = scene;

        this.meshes = [];

        this.worldName = "";

    }

    initialize(name) {

        this.worldName = name;

        this.meshes = this.scene.meshes.filter(mesh =>
            mesh.name !== "__root__" &&
            mesh.name !== "floor"
        );

        console.clear();

        console.log("====================================");
        console.log("WORLD MANAGER");
        console.log("====================================");

        console.log("World:", this.worldName);

        console.log("Meshes:", this.meshes.length);

        let vertices = 0;

        for (const mesh of this.meshes) {

            vertices += mesh.getTotalVertices();

        }

        console.log("Vertices:", vertices);

        console.log("====================================");

    }

    getMeshes() {

        return this.meshes;

    }

    findMesh(name) {

        return this.meshes.find(mesh => mesh.name === name);

    }

}