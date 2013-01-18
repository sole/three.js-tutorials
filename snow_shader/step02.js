window.onload = function() {
	var renderer,
		scene,
		camera,
		cameraRadius = 200,
		cameraTarget,
		particleSystem,
		particleSystemHeight = 100,
		clock;

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
			systemGeometry = new THREE.Geometry(),
			systemMaterial = new THREE.ParticleBasicMaterial({ color: 0xFFFFFF });
			
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

	}


	function rand( v ) {
		return (v * (Math.random() - 0.5));
	}

	function updateParticleSystem( elapsed ) {

		var geometry = particleSystem.geometry,
			vertices = geometry.vertices,
			numVertices = vertices.length,
			speedY = 10 * elapsed;

		for(var i = 0; i < numVertices; i++) {
			var v = vertices[i];

			if( v.y > 0 ) {
				v.y -= speedY * Math.random();
			} else {
				v.y = particleSystemHeight;
			}
		}

		geometry.verticesNeedUpdate = true;

	}

	function animate() {

		requestAnimationFrame( animate );

		var delta = clock.getDelta(),
			t = clock.getElapsedTime() * 0.5;

		updateParticleSystem( delta );

		camera.position.set( cameraRadius * Math.sin( t ), 0, cameraRadius * Math.cos( t ) );
		camera.lookAt( cameraTarget );

		renderer.clear();
		renderer.render( scene, camera );

	}
}
