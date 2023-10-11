export type WallLetters = '#' | '.' | 'o' | 'x';
export const wall = '#';
export const noWall = '.';
export const goodWall = 'o';
export const badWall = 'x';
export const wait = 100;

export type Vertex = [number, number];
export type Edge = { v0: Vertex; v1: Vertex; weight: number };
