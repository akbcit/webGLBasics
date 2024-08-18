export function drawScene(gl, programInfo, buffer, object) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      2, // Each vertex has 2 components (x, y)
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  
    gl.useProgram(programInfo.program);
  
    gl.uniform4fv(programInfo.uniformLocations.color, object.color);
  
    // Set the point size if the object is a point
    if (object.type === 'point') {
      gl.uniform1f(programInfo.uniformLocations.pointSize, object.size); // Pass the point size
    } else {
      gl.uniform1f(programInfo.uniformLocations.pointSize, 1.0); // Default size for other objects
    }
  
    // Determine the draw mode based on the object's type
    let drawMode;
    switch (object.type) {
      case 'triangle':
        drawMode = gl.TRIANGLES;
        break;
      case 'line':
        drawMode = gl.LINES;
        break;
      case 'point':
        drawMode = gl.POINTS;
        break;
      default:
        console.error(`Unknown object type: ${object.type}`);
        return;
    }
  
    gl.drawArrays(drawMode, 0, object.positions.length / 2);
  
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      console.error(`WebGL error: ${error}`);
    }
  }
  