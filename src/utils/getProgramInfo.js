export function getProgramInfo(gl, shaderProgram) {
    return {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        pointSize: gl.getUniformLocation(shaderProgram, 'uPointSize'),
        color: gl.getUniformLocation(shaderProgram, 'uColor'),
      },
    };
  }
  