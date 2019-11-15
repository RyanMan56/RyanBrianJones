import {
  BoxGeometry,
  EdgesGeometry,
  Geometry,
  LineSegments,
  Line,
  LineBasicMaterial,
  Mesh,
  Vector3,
  MeshPhongMaterial,
} from 'three';

import { richBlack, lightSkyBlue } from '../../colors';

class OutlinedBlock {
  constructor({
    color = richBlack,
    lineColor = lightSkyBlue,
    disableLines = false,
    position = new Vector3(0, 0, 0),
    dimensions = new Vector3(1, 1, 1),
    sections = new Vector3(1, 1, 1),
    marginX = 0.002,
    marginY = 0.002,
    marginZ = 0.002,
  } = {}) {
    this.color = color;
    this.lineColor = lineColor;
    this.disableLines = disableLines;
    this.position = position;
    this.dimensions = dimensions;
    this.sections = sections;
    this.margin = { x: marginX, y: marginY, z: marginZ };
    return this.create();
  }

  create() {
    const {
      color, lineColor, position, dimensions, sections, margin,
    } = this;
    const geometry = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
    const material = new MeshPhongMaterial({ color });
    const cube = new Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);

    if (!this.disableLines) {
      const edges = new EdgesGeometry(geometry);

      const lineMaterial = new LineBasicMaterial({ color: lineColor });

      const boundingLine = new LineSegments(edges, lineMaterial);
      cube.add(boundingLine);

      const sectionLines = this.createLineSections(
        position,
        dimensions,
        sections,
        margin,
        lineMaterial,
      );
      sectionLines.map(line => cube.add(line));
    }

    return cube;
  }

  createLineSections(pos, dimens, sections, margin, mat) {
    const interval = {
      x: dimens.x / sections.x,
      y: dimens.y / sections.y,
      z: dimens.z / sections.z,
    };
    const base = { x: -dimens.x / 2, y: -dimens.y / 2, z: -dimens.z / 2 };
    // const margin = 0.5;
    const lines = [];
    this.createXSections(base, interval.x, dimens, sections, margin.x, mat).map(line => lines.push(line));
    this.createYSections(base, interval.y, dimens, sections, margin.y, mat).map(line => lines.push(line));
    this.createZSections(base, interval.z, dimens, sections, margin.z, mat).map(line => lines.push(line));
    return lines;
  }

  createXSections(base, interval, dimens, sections, margin, mat) {
    const lines = [];
    for (let i = 1; i < sections.x; i++) {
      const xPos = base.x + interval * i;
      const geometry = new Geometry();
      geometry.vertices.push(
        new Vector3(xPos, -margin + base.y, -margin + base.z),
        new Vector3(xPos, +margin + base.y + dimens.y, -margin + base.z),
        new Vector3(xPos, +margin + base.y + dimens.y, +margin + base.z + dimens.z),
        new Vector3(xPos, -margin + base.y, +margin + base.z + dimens.z),
        new Vector3(xPos, -margin + base.y, -margin + base.z),
      );
      lines.push(new Line(geometry, mat));
    }
    return lines;
  }

  createYSections(base, interval, dimens, sections, margin, mat) {
    const lines = [];
    for (let i = 1; i < sections.y; i++) {
      const yPos = base.y + interval * i;
      const geometry = new Geometry();
      geometry.vertices.push(
        new Vector3(-margin + base.x, yPos, -margin + base.z),
        new Vector3(+margin + base.x + dimens.x, yPos, -margin + base.z),
        new Vector3(+margin + base.x + dimens.x, yPos, +margin + base.z + dimens.z),
        new Vector3(-margin + base.x, yPos, +margin + base.z + dimens.z),
        new Vector3(-margin + base.x, yPos, -margin + base.z),
      );
      lines.push(new Line(geometry, mat));
    }
    return lines;
  }

  createZSections(base, interval, dimens, sections, margin, mat) {
    const lines = [];
    for (let i = 1; i < sections.z; i++) {
      const zPos = base.z + interval * i;
      const geometry = new Geometry();
      geometry.vertices.push(
        new Vector3(-margin + base.x, -margin + base.y, zPos),
        new Vector3(+margin + base.x + dimens.x, -margin + base.y, zPos),
        new Vector3(+margin + base.x + dimens.x, +margin + base.y + dimens.y, zPos),
        new Vector3(-margin + base.x, +margin + base.y + dimens.y, zPos),
        new Vector3(-margin + base.x, -margin + base.y, zPos),
      );
      lines.push(new Line(geometry, mat));
    }
    return lines;
  }
}

export default OutlinedBlock;
