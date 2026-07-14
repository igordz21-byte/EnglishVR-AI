export async function loadModel(scene, path, fileName) {

    console.log("Loading:", path + fileName);

    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        path,
        fileName,
        scene
    );

    console.log("Model loaded!", result);

    const meshes = result.meshes;

    const min = new BABYLON.Vector3(
        Number.MAX_VALUE,
        Number.MAX_VALUE,
        Number.MAX_VALUE
    );

    const max = new BABYLON.Vector3(
        -Number.MAX_VALUE,
        -Number.MAX_VALUE,
        -Number.MAX_VALUE
    );

    meshes.forEach(mesh => {
        const info = mesh.getBoundingInfo();

        min.minimizeInPlace(info.boundingBox.minimumWorld);
        max.maximizeInPlace(info.boundingBox.maximumWorld);
    });

    console.log("MODEL MIN:", min);
    console.log("MODEL MAX:", max);

    meshes.forEach(mesh => {
        console.log(mesh.name, mesh.position);
    });

    return result;
}