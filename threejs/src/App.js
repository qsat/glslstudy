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

const fs = require('./fs/polar_01').default

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
      camera.position.z = 1
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
