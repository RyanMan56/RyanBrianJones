const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule(
    "camera",
    new WHS.PerspectiveCamera({
      position: new THREE.Vector3(0, 0, 0)
    })
  ),
  new WHS.RenderingModule({ bgColor: 0x162129 }),
  new WHS.ResizeModule()
]);

app.start();
