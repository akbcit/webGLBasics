// Vertex shader program
export const vsSource = (pointSize) => {
    if(isNaN(pointSize)){
        pointSize = 10.0;
    }
    return `
      attribute vec4 aVertexPosition;
  
      void main(void) {
        gl_Position = aVertexPosition;
        gl_PointSize = ${pointSize.toFixed(1)};  // Ensure point size is a float
      }
    `;
};
