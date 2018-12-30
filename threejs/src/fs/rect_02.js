export default `
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // bottom-left
    vec2 bl = step(vec2(0.1),st);
    float pct = bl.x * bl.y;
    vec2 bl2 = 1.0 - step(vec2(0.05), st);
    pct += bl2.x + bl2.y;

    // top-right
    vec2 tr = step(vec2(0.1),1.0-st);
    pct *= tr.x * tr.y;
    vec2 tr2 = 1.0 - step(vec2(0.05), 1.0-st);
    pct += tr2.x + tr2.y;

    color = vec3(pct, pct, 0.5);

    gl_FragColor = vec4(color,1.0);
}
`
