import { Player } from "./Player.js";
import { LevelEditor } from "./LevelEditor.js";
import { MeshInspector } from "./MeshInspector.js";
import { CollisionManager } from "./CollisionManager.js";
import { AirportManager } from "./AirportManager.js";
import { InteractionManager } from "./InteractionManager.js";

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
    // INVISIBLE FLOOR
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

    const levelEditor = new LevelEditor(scene);

    const interactionManager = new InteractionManager(scene, camera);

    // Pierwszy punkt testowy
    interactionManager.addPoint(
        "Check-In",
        new BABYLON.Vector3(-26, 18.8, -58),
        3
    );

    // ==========================
    // RENDER
    // ==========================

    engine.runRenderLoop(() => {

        interactionManager.update();

        scene.render();

    });

    window.addEventListener("resize", () => {

        engine.resize();

    });

}