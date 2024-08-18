export const initBuffers = (gl, object) => {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Pass the object's positions array into the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.positions), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
    };
  }