/*
This code is designed to set up and initialize a WebGL shader program, 
which is essential for rendering graphics on the GPU. The process begins 
by importing functions that provide the source code for the vertex and 
fragment shaders—two small programs that run on the GPU. The vertex shader 
processes each vertex's position, while the fragment shader determines the 
color of each pixel.

The initShaderProgram function handles the core WebGL tasks: it compiles 
these shaders and links them into a single shader program. This program 
is what WebGL uses to render graphics, transforming the geometry and 
determining pixel colors. The loadShader function compiles the individual 
shaders, and error handling ensures that if anything goes wrong during 
compilation or linking, the program will not proceed, preventing runtime issues.

Finally, the initializeShaderProgram function allows for customization of 
the shaders, adjusting aspects like point size and color before creating 
the final shader program. This setup is crucial in WebGL, as it dictates 
how the graphics pipeline will process and render data to the screen.
*/

import { vsSource } from "./getVertexShaderProgram.js"; // Import function to get the vertex shader source
import { fsSource } from "./getFragmentShaderProgram.js"; // Import function to get the fragment shader source

// Function to initialize and link the shader program
function initShaderProgram(gl, vsSource, fsSource) {
  // Load and compile the vertex shader
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);

  // Load and compile the fragment shader
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program
  const shaderProgram = gl.createProgram();

  // Attach the compiled shaders to the program
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  // Link the shaders into a complete program
  gl.linkProgram(shaderProgram);

  // Check if the program was linked successfully
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null; // Return null if linking failed
  }

  return shaderProgram; // Return the linked shader program
}

// Function to load and compile a shader
function loadShader(gl, type, source) {
  const shader = gl.createShader(type); // Create a new shader of the given type

  gl.shaderSource(shader, source); // Set the source code of the shader
  gl.compileShader(shader); // Compile the shader

  // Check if the shader was compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader); // Delete the shader if compilation failed
    return null; // Return null to indicate failure
  }

  return shader; // Return the compiled shader
}

// Function to initialize the shader program with specified point size and color
export const initializeShaderProgram = (gl, pointSize, pointColor) => {
  // Generate the shader program using the customized vertex and fragment shaders
  const shaderProgram = initShaderProgram(
    gl,
    vsSource(pointSize),
    fsSource(pointColor)
  );

  return shaderProgram; // Return the initialized shader program
};
