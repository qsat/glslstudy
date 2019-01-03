export default `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st, in float _radius, in vec2 _center){
  vec2 dist = _st-_center;
  float ff = smoothstep(
    _radius-(_radius * 0.01),
    _radius+(_radius * 0.01),
    dot(dist,dist)*4.0
  );
  return 1.0 - ff;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 color = vec3(circle(st,0.1, vec2(0.3)));
  vec3 c2 = vec3(circle(st,0.1, vec2(0.8)));
  vec3 c3 = vec3(circle(st,0.01, vec2(0.5)));

  gl_FragColor = vec4( color + c2 + c3 , 1.0 );
}
`
