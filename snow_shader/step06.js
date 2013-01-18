window.onload = function() {
	var renderer,
		scene,
		camera,
		cameraRadius = 200,
		cameraTarget,
		particleSystem,
		particleSystemHeight = 100.0,
		clock,
		controls,
		parameters,
		onParametersUpdate;

	init();
	animate();


	function init() {

		renderer = new THREE.WebGLRenderer();

		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( new THREE.Color( 0x000000 ) );

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		cameraTarget = new THREE.Vector3( 0, 0, 0 );
		
		var numParticles = 100,
			width = 100,
			height = particleSystemHeight,
			depth = 100,
			parameters = {
				color: 0xFFFFFF,
				height: particleSystemHeight,
				radiusX: 2.5,
				radiusZ: 2.5
			},
			systemGeometry = new THREE.Geometry(),
			systemMaterial = new THREE.ShaderMaterial({
				uniforms: {
					color:  { type: 'c', value: new THREE.Color( parameters.color ) },
					height: { type: 'f', value: parameters.height },
					elapsedTime: { type: 'f', value: 0 },
					radiusX: { type: 'f', value: parameters.radiusX },
					radiusZ: { type: 'f', value: parameters.radiusZ }
				},
				vertexShader: document.getElementById( 'step06_vs' ).textContent,
				fragmentShader: document.getElementById( 'step04_fs' ).textContent
			});
	 
		for( var i = 0; i < numParticles; i++ ) {
			var vertex = new THREE.Vector3(
					rand( width ),
					Math.random() * height,
					rand( depth )
				);

			systemGeometry.vertices.push( vertex );
		}


		particleSystem = new THREE.ParticleSystem( systemGeometry, systemMaterial );
		particleSystem.position.y = -height/2;

		scene.add( particleSystem );

		clock = new THREE.Clock();

		document.body.appendChild( renderer.domElement );

		onParametersUpdate = function( v ) {
			systemMaterial.uniforms.color.value.set( parameters.color );
			systemMaterial.uniforms.height.value = parameters.height;
			systemMaterial.uniforms.radiusX.value = parameters.radiusX;
			systemMaterial.uniforms.radiusZ.value = parameters.radiusZ;
		}

		controls = new dat.GUI();
		controls.close();

		controls.addColor( parameters, 'color' ).onChange( onParametersUpdate );
		controls.add( parameters, 'height', 0, particleSystemHeight * 2.0 ).onChange( onParametersUpdate );
		controls.add( parameters, 'radiusX', 0, 10 ).onChange( onParametersUpdate );
		controls.add( parameters, 'radiusZ', 0, 10 ).onChange( onParametersUpdate );

	}


	function rand( v ) {
		return (v * (Math.random() - 0.5));
	}


	function animate() {

		requestAnimationFrame( animate );

		var delta = clock.getDelta(),
			elapsedTime = clock.getElapsedTime(),
			t = 0;

		particleSystem.material.uniforms.elapsedTime.value = elapsedTime * 10;

		camera.position.set( cameraRadius * Math.sin( t ), 0, cameraRadius * Math.cos( t ) );
		camera.lookAt( cameraTarget );

		renderer.clear();
		renderer.render( scene, camera );

	}
}
