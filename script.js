import { getCanvasDomReference } from "./src/utils/getCanvasDomReference.js";
import { clearScreenWithClearColor } from "./src/utils/clearScreenWithClearColor.js";
import { initializeShaderProgram } from "./src/utils/initializeShaderProgram.js";
import { getProgramInfo } from "./src/utils/getProgramInfo.js";
import { initBuffers } from "./src/utils/initializeBuffers.js";
import { drawScene } from "./src/utils/drawScene.js";

/**
 * The main entry point for the WebGL program. It initializes the WebGL context,
 * sets up shaders, buffers, and renders the objects to the canvas.
 *
 * @return {void} - This function does not return a value.
 */
function main() {
  // Get the canvas DOM element by its ID
  const canvas = getCanvasDomReference("gl-canvas");

  // Get the WebGL rendering context from the canvas
  const gl = canvas.getContext("webgl");

  // Check if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Clear the canvas with a specific color (black in this case)
  clearScreenWithClearColor(gl, { r: 0.0, g: 0.0, b: 0.0, a: 1.0 });

  // Initialize the shader program (vertex and fragment shaders)
  const shaderProgram = initializeShaderProgram(gl);

  // Get the locations of attributes and uniforms in the shader program
  const programInfo = getProgramInfo(gl, shaderProgram);

  // Define the objects to be drawn (triangle, line, point)
  const objects = [
    {
      type: 'triangle',
      positions: [-0.5, -0.4, 0.4, -0.4, 0.05, 0.4],
      color: [1.0, 1.0, 0.0, 1.0] // Yellow color
    },
    {
      type: 'line',
      positions: [-0.5, -0.5, 0.5, 0.5],
      color: [0.0, 1.0, 0.0, 1.0] // Green color
    },
    {
      type: 'point',
      positions: [-1, 1],
      color: [1.0, 0.0, 0.0, 1.0], // Red color
      size: 15.0  // Size of the point
    },
  ];

  // Initialize buffers for each object
  const buffers = objects.map(obj => initBuffers(gl, obj));

  // Clear the canvas before drawing
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Loop through each object and draw it on the canvas
  objects.forEach((obj, index) => {
    // Check if the WebGL context has been lost
    if (gl.isContextLost()) {
      console.error('WebGL context is lost!');
      return;
    }

    // Draw the object using the defined shader program and buffers
    drawScene(gl, programInfo, buffers[index], obj);

    // Check for any WebGL errors that occurred during drawing
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      console.error(`WebGL error after drawing ${obj.type}: ${error}`);
    }
  });
}

// Call the main function to execute the WebGL program
main();
