import { getCanvasDomReference } from "./src/utils/getCanvasDomReference.js";
import { clearScreenWithClearColor } from "./src/utils/clearScreenWithClearColor.js";
import { initializeShaderProgram } from "./src/utils/initializeShaderProgram.js";

function main() {
  const canvas = getCanvasDomReference("gl-canvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  clearScreenWithClearColor(gl, { r: 0.0, g: 0.0, b: 0.0, a: 1.0 });

  // Initialize the shader program using dynamic point size and color
  const shaderProgram = initializeShaderProgram(gl, 10.0, { r: 0.0, g: 0.1, b: 0.4, a: 1.0 });

  // Collect all the info needed to use the shader program
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
  };

  // Initialize buffers and draw the scene
  const buffers = initBuffers(gl);
  drawScene(gl, programInfo, buffers);
}

// Initialize the buffers
function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Position for the point at the center
  const positions = [0.0, 0.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

// Draw the scene
function drawScene(gl, programInfo, buffers) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    2, // Pull out 2 values per iteration (x, y)
    gl.FLOAT, // The data in the buffer is 32bit floats
    false, // Don't normalize
    0, // How many bytes to get from one set of values to the next
    0 // How many bytes inside the buffer to start from
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.useProgram(programInfo.program);

  // Draw the point
  gl.drawArrays(gl.POINTS, 0, 1);
}

main();
