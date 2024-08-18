import { vsSource } from "./getVertexShaderProgram.js";
import { fsSource } from "./getFragmentShaderProgram.js";

/**
 * Initializes the shader program.
 * 
 * @param {WebGLRenderingContext} gl - The WebGL context.
 * @return {WebGLProgram|null} The initialized shader program, or null if an error occurred.
 */
export const initializeShaderProgram = (gl) => {
  // Generate and compile the shader program using the vertex and fragment shaders
  const shaderProgram = initShaderProgram(
    gl,
    vsSource(), // Generate vertex shader source code
    fsSource()  // Generate fragment shader source code
  );

  return shaderProgram;
};

/**
 * Initializes, compiles, and links the shader program.
 * 
 * @param {WebGLRenderingContext} gl - The WebGL context.
 * @param {string} vertexShaderSource - The source code for the vertex shader.
 * @param {string} fragmentShaderSource - The source code for the fragment shader.
 * @return {WebGLProgram|null} The linked shader program, or null if an error occurred.
 */
function initShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

/**
 * Utility function to load and compile a shader.
 * 
 * @param {WebGLRenderingContext} gl - The WebGL context.
 * @param {number} type - The type of shader, either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @param {string} source - The source code for the shader.
 * @return {WebGLShader|null} The compiled shader, or null if an error occurred.
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}