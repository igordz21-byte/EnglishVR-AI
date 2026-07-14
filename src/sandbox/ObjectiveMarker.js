export class ObjectiveMarker {

    constructor(scene) {

        this.scene = scene;
        this.marker = null;

    }

    show(position) {

        if (!this.marker) {

            this.marker = BABYLON.MeshBuilder.CreateSphere(
                "objectiveMarker",
                {
                    diameter: 0.8
                },
                this.scene
            );

            const material = new BABYLON.StandardMaterial(
                "objectiveMaterial",
                this.scene
            );

            material.emissiveColor =
                new BABYLON.Color3(0, 1, 0);

            this.marker.material = material;

        }

        this.marker.position = position.clone();

        this.marker.position.y += 3;

        this.marker.setEnabled(true);

    }

    hide() {

        if (this.marker) {

            this.marker.setEnabled(false);

        }

    }

}