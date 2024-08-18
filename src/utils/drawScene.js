/**
 * Draws a WebGL scene with a given object using specified program information and buffers.
 *
 * @param {WebGLRenderingContext} gl - The WebGL rendering context used to draw on the canvas.
 * @param {Object} programInfo - An object containing the shader program and its attribute/uniform locations.
 * @param {WebGLBuffer} buffer - The buffer containing the vertex positions of the object.
 * @param {Object} object - The object to be drawn, including its type, positions, color, and size (for points).
 *   @param {string} object.type - The type of the object ('triangle', 'line', 'point').
 *   @param {Float32Array} object.positions - An array of vertex positions defining the object.
 *   @param {Array<number>} object.color - An array of four numbers (RGBA) defining the object's color.
 *   @param {number} [object.size=1.0] - The size of the object if it is a point (optional; default is 1.0).
 *
 * @return {void} - This function does not return a value.
 */
export function drawScene(gl, programInfo, buffer, object) {
    // Bind the position buffer to the ARRAY_BUFFER target in WebGL
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);

    // Define how to pull out the vertex positions from the buffer and supply them to the vertex shader
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition, // Attribute location in the shader program
      2, // Number of components per vertex attribute (x, y)
      gl.FLOAT, // Data type of each component (32-bit floating point)
      false, // Normalize the data? (false means no)
      0, // Stride: offset in bytes between consecutive vertex attributes (0 means tightly packed)
      0  // Offset: byte offset from the beginning of the buffer (0 means start from the beginning)
    );

    // Enable the vertex attribute array for the position data
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    // Use the shader program for rendering this object
    gl.useProgram(programInfo.program);

    // Set the color uniform in the shader program with the object's color
    gl.uniform4fv(programInfo.uniformLocations.color, object.color);

    // Set the point size uniform in the shader program if the object is a point
    if (object.type === 'point') {
      // Pass the size of the point as defined in the object
      gl.uniform1f(programInfo.uniformLocations.pointSize, object.size); 
    } else {
      // For non-point objects, set a default point size (typically not used, but required by some hardware)
      gl.uniform1f(programInfo.uniformLocations.pointSize, 1.0);
    }

    // Determine the draw mode based on the object's type
    let drawMode;
    switch (object.type) {
      case 'triangle':
        drawMode = gl.TRIANGLES; // Draw the object as a set of triangles
        break;
      case 'line':
        drawMode = gl.LINES; // Draw the object as a set of lines
        break;
      case 'point':
        drawMode = gl.POINTS; // Draw the object as a set of points
        break;
      default:
        console.error(`Unknown object type: ${object.type}`); // Handle unknown object types
        return; // Exit the function if the type is unknown
    }

    // Draw the object using the selected draw mode and the number of vertices
    gl.drawArrays(drawMode, 0, object.positions.length / 2);

    // Check for any WebGL errors during the draw call
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      console.error(`WebGL error: ${error}`); // Log the error if one occurred
    }
}
