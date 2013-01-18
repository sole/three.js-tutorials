window.onload = function() {
	var renderer,
		scene,
		camera,
		cameraRadius = 200,
		cameraTarget,
		particleSystem;

	init();
	animate();


	function init() {
		renderer = new THREE.WebGLRenderer();

		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( new THREE.Color( 0x000000 ), 1.0 );

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		cameraTarget = new THREE.Vector3( 0, 0, 0 );
		
		var numParticles = 100,
			width = 100,
			height = 100,
			depth = 100,
			systemGeometry = new THREE.Geometry(),
			systemMaterial = new THREE.ParticleBasicMaterial({ color: 0xFFFFFF });
			
		for( var i = 0; i < numParticles; i++ ) {
			var vertex = new THREE.Vector3(
					rand( width ),
					rand( height ),
					rand( depth )
				);

			systemGeometry.vertices.push( vertex );
		}


		particleSystem = new THREE.ParticleSystem( systemGeometry, systemMaterial );

		scene.add( particleSystem );


		document.body.appendChild( renderer.domElement );

	}

	function rand( v ) {
		return (v * (Math.random() - 0.5));
	}

	function animate() {

		requestAnimationFrame( animate );

		var t = Date.now() * 0.0005;

		camera.position.set( cameraRadius * Math.sin( t ), 0, cameraRadius * Math.cos( t ) );
		camera.lookAt( cameraTarget );

		renderer.clear();
		renderer.render( scene, camera );

	}
}
