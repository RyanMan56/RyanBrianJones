import {
  Math as ThreeMath,
  Shape,
  ExtrudeGeometry,
  MeshPhongMaterial,
  Mesh,
  Group,
  Vector2,
  SphereGeometry,
  MeshBasicMaterial,
  PlaneGeometry,
} from 'three';

export function generateRoadMarkings() {
  const group = new Group();
  group.name = 'Road Markings';
  for (let i = 0; i < 4; i++) {
    const whiteLinesGeometry = new PlaneGeometry(0.025, 0.24);
    const whiteLinesMaterial = new MeshPhongMaterial({
      color: 0x72ffff, emissive: 0x72ffff,
    });
    const whiteLines = new Mesh(whiteLinesGeometry, whiteLinesMaterial);
    whiteLines.position.set(1.5, -0.549, i - 1.5);
    whiteLines.rotateX(ThreeMath.degToRad(-90));
    group.add(whiteLines);
  }
  return group;
}

/** ********
 * Corner *
 ******** */

// x = a + r cos t
// y = b + r sin t
// where t is the angle in rads
// rad = deg * PI/180

// 180 degrees -to- 270 degrees
// PI rads -to- PI * 1.5 rads
// extend function in future to take start / end angle
export function generatePath(
  center, r, angleOffset = Math.PI, angleSize = Math.PI * 0.5, numOfPoints = 10,
) {
  const points = [];
  const step = angleSize / numOfPoints;
  for (let i = 0; i < numOfPoints + 1; i++) {
    const angle = angleOffset + step * i;
    const point = new Vector2(
      center.x + r * Math.cos(angle),
      center.y + r * Math.sin(angle),
    );
    points.push(point);
  }
  return points;
}

export function generatePointMeshes(points, radius = 0.05, yOffset = -0.55, color = 0xffff00) {
  const group = new Group();
  points.map((point) => {
    const sphereGeom = new SphereGeometry(radius);
    const sphereMat = new MeshBasicMaterial({ color });
    const sphere = new Mesh(sphereGeom, sphereMat);
    sphere.position.set(point.x, yOffset, point.y);
    group.add(sphere);
  });
  return group;
}

export function generateCurveFromPoints(
  nearPoints, farPoints, depth = 0.15, color = 0x2e127b, yOffset = -0.55,
) {
  const shape = new Shape();

  shape.moveTo(nearPoints[0].x, nearPoints[0].y);
  for (let i = 1; i < nearPoints.length; i++) {
    shape.lineTo(nearPoints[i].x, nearPoints[i].y);
  }

  shape.lineTo(farPoints[farPoints.length - 1].x, farPoints[farPoints.length - 1].y);
  for (let i = farPoints.length - 1; i >= 0; i--) {
    shape.lineTo(farPoints[i].x, farPoints[i].y);
  }

  shape.lineTo(nearPoints[0].x, nearPoints[0].y);

  const geometry = new ExtrudeGeometry(shape, { bevelEnabled: false, depth });
  const material = new MeshPhongMaterial({ color });
  const mesh = new Mesh(geometry, material);
  mesh.rotateX(ThreeMath.degToRad(90));
  mesh.position.y = yOffset;
  return mesh;
}
