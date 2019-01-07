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

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*0.5 +.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-0.8,1.0, cos(a*20.0))*0.6;//+0.5;

    color = vec3( 1.-smoothstep(f,f+0.01,r) );

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vec3( 1.-smoothstep(0.0, .01,r +f )),1.0);
    // gl_FragColor = vec4(vec3(f),1.0);
}
`
