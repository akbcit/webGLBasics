import { getCanvasDomReference } from "./src/utils/getCanvasDomReference.js";
import { clearScreenWithClearColor } from "./src/utils/clearScreenWithClearColor.js";
import { initializeShaderProgram } from "./src/utils/initializeShaderProgram.js";
import { getProgramInfo } from "./src/utils/getProgramInfo.js";
import { initBuffers } from "./src/utils/initializeBuffers.js";
import { drawScene } from "./src/utils/drawScene.js";

function main() {
  const canvas = getCanvasDomReference("gl-canvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  clearScreenWithClearColor(gl, { r: 0.0, g: 0.0, b: 0.0, a: 1.0 });

  const shaderProgram = initializeShaderProgram(gl);
  const programInfo = getProgramInfo(gl, shaderProgram);

  const objects = [
    {
      type: 'triangle',
      positions: [-0.5, -0.4, 0.4, -0.4, 0.05, 0.4],
      color: [1.0, 1.0, 0.0, 1.0]
    },
    {
      type: 'line',
      positions: [-0.5, -0.5, 0.5, 0.5],
      color: [0.0, 1.0, 0.0, 1.0]
    },
    {
      type: 'point',
      positions: [-1, 1],
      color: [1.0, 0.0, 0.0, 1.0],
      size: 15.0 
    },
  ];

  const buffers = objects.map(obj => initBuffers(gl, obj));

  gl.clear(gl.COLOR_BUFFER_BIT);

  objects.forEach((obj, index) => {
    if (gl.isContextLost()) {
      console.error('WebGL context is lost!');
      return;
    }
    drawScene(gl, programInfo, buffers[index], obj);
    
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      console.error(`WebGL error after drawing ${obj.type}: ${error}`);
    }
  });
}

main();
