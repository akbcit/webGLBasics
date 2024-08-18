export const vsSource = () => `
  attribute vec4 aVertexPosition;
  uniform float uPointSize;

  void main() {
    gl_Position = aVertexPosition;
    gl_PointSize = uPointSize;  // Use the uniform point size
  }
`;
