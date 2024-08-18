// Fragment shader program
export const fsSource = ({r, g, b, a}) => {
    return `
      void main(void) {
        gl_FragColor = vec4(
          ${isNaN(r) ? 0.0 : r.toFixed(1)}, 
          ${isNaN(g) ? 0.0 : g.toFixed(1)}, 
          ${isNaN(b) ? 1.0 : b.toFixed(1)}, 
          ${isNaN(a) ? 1.0 : a.toFixed(1)}
        );  // Set RGBA color in the shader
      }
    `;
};

// This function generates a GLSL fragment shader code string.
// It takes an object with properties r, g, b, a (representing red, green, blue, alpha).
// Each component is checked for NaN (Not-a-Number) using isNaN().
// If a component is NaN, a default value is used:
// - r (red) and g (green) default to 0.0 (no color).
// - b (blue) and a (alpha) default to 1.0 (full color/full opacity).
// The valid (or defaulted) values are formatted to one decimal place using .toFixed(1).
// The resulting vec4() represents the final color output for each fragment in the WebGL context.
