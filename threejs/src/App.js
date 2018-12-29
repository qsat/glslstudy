import React, { Component } from 'react';
import './App.css';
import {
  Vector2,
  ShaderMaterial,
  Mesh,
  Camera,
  Scene,
  WebGLRenderer,
  PlaneBufferGeometry
} from 'three'

const vs = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`

const fs = `
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
  }

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // float y = pow(st.x,5.0);
    float y = step(0.5,st.x);

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
  }
`

class App extends Component {
  componentDidMount() {
    const container = document.getElementById('container');
    const camera = new Camera()
    const scene = new Scene()
    const renderer = new WebGLRenderer()
    let uniforms;

    init();
    animate();

    function init() {
      camera.position.z = 1;
      var geometry = new PlaneBufferGeometry( 2, 2 );

      uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new Vector2() },
        u_mouse: { type: "v2", value: new Vector2() }
      };

      const material = new ShaderMaterial( {
        uniforms, vertexShader: vs, fragmentShader: fs,
      } );

      const mesh = new Mesh( geometry, material );
      scene.add( mesh );

      renderer.setPixelRatio( window.devicePixelRatio );

      container.appendChild( renderer.domElement );

      onWindowResize();
      window.addEventListener( 'resize', onWindowResize, false );

      document.addEventListener('mousemove', function(e){
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
      })
    }

    function onWindowResize( event ) {
      renderer.setSize( window.innerWidth, window.innerHeight );
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    function animate() {
      requestAnimationFrame( animate );
      render();
    }

    function render() {
      uniforms.u_time.value += 0.05;
      renderer.render( scene, camera );
    }
  }
  render() {
    return (
      <div className="App">
        <div id="container" />
      </div>
    );
  }
}

export default App;
