export const clearScreenWithClearColor = (gl, { r, g, b, a }) => {
  // Set clear color
  gl.clearColor(r, g, b, a);
  // Clear the color buffer with the specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
};
