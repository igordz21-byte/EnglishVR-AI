export class AirportManager {

    constructor(scene) {

        this.scene = scene;

        this.meshes = [];

    }

    initialize() {

        this.meshes = this.scene.meshes.filter(mesh =>
            mesh.name !== "__root__" &&
            mesh.name !== "floor"
        );

        console.clear();

        console.log("====================================");
        console.log(" AIRPORT MANAGER");
        console.log("====================================");
        console.log("Meshes:", this.meshes.length);

        let totalVertices = 0;

        this.meshes.forEach(mesh => {

            totalVertices += mesh.getTotalVertices();

        });

        console.log("Vertices:", totalVertices);

        console.log("====================================");

    }

    getMeshes() {

        return this.meshes;

    }

}