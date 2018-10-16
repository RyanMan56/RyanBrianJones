import {
  BoxGeometry,
  EdgesGeometry,
  Geometry,
  LineSegments,
  Line,
  LineBasicMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from 'three';

import { richBlack, lightSkyBlue } from '../../colors';

class Block {
  constructor({
    color = richBlack,
    lineColor = lightSkyBlue,
    position = new Vector3(0, 0, 0),
    dimensions = new Vector3(1, 1, 1),
    sections = new Vector3(1, 1, 1),
    margin = 0.002,
  }) {
    this.color = color;
    this.lineColor = lineColor;
    this.position = position;
    this.dimensions = dimensions;
    this.sections = sections;
    this.margin = margin;
    return this.create();
  }

  create() {
    const {
      color, lineColor, position, dimensions, sections, margin,
    } = this;
    const geometry = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
    const material = new MeshBasicMaterial({ color });
    const cube = new Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);

    const edges = new EdgesGeometry(geometry);

    const lineMaterial = new LineBasicMaterial({ color: lineColor });

    const boundingLine = new LineSegments(edges, lineMaterial);
    cube.add(boundingLine);

    const sectionLines = this.createLineSectionsX(
      position,
      dimensions,
      sections,
      margin,
      lineMaterial,
    );
    sectionLines.map(line => cube.add(line));

    return cube;
  }

  createLineSectionsX(pos, dimens, sections, margin, mat) {
    const xInterval = dimens.x / sections.x;
    const base = { x: -dimens.x / 2, y: -dimens.y / 2, z: -dimens.z / 2 };
    const yPos = base.y + pos.y;
    const zPos = base.z + pos.z;
    // const margin = 0.5;
    const lines = [];

    for (let i = 1; i < sections.x; i++) {
      const xPos = base.x + pos.x + xInterval * i;
      const geometry = new Geometry();
      geometry.vertices.push(
        new Vector3(xPos, -margin + yPos, -margin + zPos),
        new Vector3(xPos, +margin + yPos + dimens.y, -margin + zPos),
        new Vector3(xPos, +margin + yPos + dimens.y, +margin + zPos + dimens.z),
        new Vector3(xPos, -margin + yPos, +margin + zPos + dimens.z),
        new Vector3(xPos, -margin + yPos, -margin + zPos),
      );
      lines.push(new Line(geometry, mat));
    }
    return lines;
  }
}

export default Block;
