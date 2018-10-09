import { black, purple } from "./colors";

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule(
    "camera",
    new WHS.PerspectiveCamera({
      position: {
        y: 10,
        z: 50
      }
    })
  ),
  new WHS.RenderingModule(
    {
      bgColor: purple,

      renderer: {
        antialias: true,
        shadowmap: {
          type: THREE.PCFSoftShadowMap
        }
      }
    },
    { shadow: true }
  ),
  new WHS.ResizeModule()
]);

const box = new WHS.Box({
  geometry: {
    width: 20,
    height: 20,
    depth: 20
  },
  material: new THREE.MeshBasicMaterial({
    color: black
  }),
  position: [0, 0, 0]
});

box.addTo(app);

app.start();
