export class InteractionManager {

    constructor(scene, camera, hud, lessonManager) {

        this.scene = scene;
        this.camera = camera;
        this.hud = hud;
        this.lessonManager = lessonManager;

        this.points = [];
        this.isInteracting = false;

        window.addEventListener("keydown", (e) => {

            switch (e.code) {

                case "KeyE":

                    if (!this.isInteracting) {

                        this.tryInteract();

                    }

                    break;

                case "Escape":

                    this.endInteraction();

                    break;

            }

        });

    }

    addPoint(name, position, radius = 3) {

        this.points.push({
            name,
            position,
            radius
        });

    }

    update() {

        if (this.isInteracting) return;

        let nearest = null;

        for (const point of this.points) {

            const distance = BABYLON.Vector3.Distance(
                this.camera.position,
                point.position
            );

            if (distance <= point.radius) {

                nearest = point;
                break;

            }

        }

        if (nearest) {

            this.hud.show(
                "Press <b>E</b> to start lesson<br><b>" +
                nearest.name +
                "</b>"
            );

        } else {

            this.hud.hide();

        }

    }

    tryInteract() {

        for (const point of this.points) {

            const distance = BABYLON.Vector3.Distance(
                this.camera.position,
                point.position
            );

            if (distance <= point.radius) {

                this.isInteracting = true;

                this.hud.hide();

                console.log("Lesson:", point.name);

                if (this.lessonManager) {

                    this.lessonManager.startCheckInLesson();

                }

                return;

            }

        }

    }

    endInteraction() {

        if (!this.isInteracting) return;

        this.isInteracting = false;

        this.hud.hide();

    }

}