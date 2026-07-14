import { Player } from "./Player.js";
import { MeshInspector } from "./MeshInspector.js";
import { CollisionManager } from "./CollisionManager.js";
import { AirportManager } from "./AirportManager.js";
import { InteractionManager } from "./InteractionManager.js";
import { HUD } from "./HUD.js";
import { DialogueUI } from "./DialogueUI.js";
import { LessonManager } from "./LessonManager.js";

export async function startEngine() {

    // ==========================
    // CANVAS
    // ==========================

    const canvas = document.getElementById("renderCanvas");

    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color4(0.6, 0.8, 1.0, 1);

    // ==========================
    // LIGHT
    // ==========================

    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    light.intensity = 1.2;

    // ==========================
    // PLAYER
    // ==========================

    const player = new Player(scene, canvas);

    const camera = player.getCamera();

    scene.activeCamera = camera;

    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -0.25, 0);

    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 0.9, 0.5);

    // ==========================
    // LOAD AIRPORT
    // ==========================

    await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "../../assets/models/sunshine-airport/",
        "sunshine_airportsunset.glb",
        scene
    );
// ==========================
// ENABLE COLLISIONS
// ==========================

scene.meshes.forEach(mesh => {

    if (mesh.getTotalVertices() > 0) {

        mesh.checkCollisions = true;

    }

});

console.log("All mesh collisions enabled.");
    // ==========================
    // FLOOR
    // ==========================

    const floor = BABYLON.MeshBuilder.CreateGround(
        "floor",
        {
            width: 400,
            height: 400
        },
        scene
    );

    floor.position.y = 17.2;
    floor.isVisible = false;
    floor.checkCollisions = true;

    // ==========================
    // MANAGERS
    // ==========================

    const airportManager = new AirportManager(scene);
    airportManager.initialize();

    const collisionManager = new CollisionManager(scene);

    const meshInspector = new MeshInspector(scene);

    // ==========================
    // USER INTERFACE
    // ==========================

    const hud = new HUD();

    const dialogueUI = new DialogueUI();

    const lessonManager =
        new LessonManager(dialogueUI, hud);

    // ==========================
    // INTERACTION
    // ==========================

    const interactionManager =
        new InteractionManager(
            scene,
            camera,
            hud,
            lessonManager
        );

    // Punkt testowy
    interactionManager.addPoint(
        "Airport Check-In",
        camera.position.clone(),
        2.5
    );

    // ==========================
    // CAMERA DEBUG
    // ==========================

    window.addEventListener("keydown", (e) => {

        if (e.code === "KeyK") {

            console.clear();

            console.log("========== CAMERA ==========");

            console.log(
                "X =",
                camera.position.x.toFixed(2)
            );

            console.log(
                "Y =",
                camera.position.y.toFixed(2)
            );

            console.log(
                "Z =",
                camera.position.z.toFixed(2)
            );

            console.log("");

            console.log(`new BABYLON.Vector3(
    ${camera.position.x.toFixed(2)},
    ${camera.position.y.toFixed(2)},
    ${camera.position.z.toFixed(2)}
)`);

            console.log("============================");

        }

    });

    // ==========================
    // RENDER LOOP
    // ==========================

    engine.runRenderLoop(() => {

        interactionManager.update();

        scene.render();

    });

    // ==========================
    // RESIZE
    // ==========================

    window.addEventListener("resize", () => {

        engine.resize();

    });

}