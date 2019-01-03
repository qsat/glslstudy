export default `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
  // return smoothstep( pct-0.02, pct, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;

  // float y = pow(st.x,5.0);
  // float y = step(0.5,st.x);
  float y = smoothstep(0.1,0.9,st.x);
  // float y = smoothstep(0.2,0.5,st.x);// - smoothstep(0.5,0.8,st.x);

  vec3 color = vec3(1.0, 1.0, y);

  // next
  // https://thebookofshaders.com/06/?lan=jp

  // Plot a line
  float pct = plot(st,y);
  // color = (1.0-pct)*color + pct*vec3(0.0,1.0,0.0);
  color = pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color,1.0);
}
`
