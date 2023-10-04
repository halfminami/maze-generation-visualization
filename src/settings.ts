export const wall = '#';
export const noWall = '.';
export const wait = 100;

export type Node = [number, number];
export type Edge = { v0: Node; v1: Node; weight: number };
