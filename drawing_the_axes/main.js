window.onload = function() {
	var renderer,
		scene,
		camera,
		controls,
		meshMaterial;
	
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	renderer = new THREE.WebGLRenderer({ antialias: true });
	document.body.appendChild( renderer.domElement );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColorHex( 0xeeeeee, 1.0 );

	scene = new THREE.Scene();
	
	// Add some objects to the scene, one per quadrant
	meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
	
	var cube = new THREE.Mesh( new THREE.CubeGeometry( 5, 5, 5 ), meshMaterial );
	cube.position.set( 25, 25, 25 );
	scene.add( cube );

	var sphere = new THREE.Mesh( new THREE.SphereGeometry( 5 ), meshMaterial );
	sphere.position.set( -25, 25, 25 );
	scene.add( sphere );

	var icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry( 5 ), meshMaterial );
	icosahedron.position.set( 25, 25, -25 );
	scene.add( icosahedron );

	var torus = new THREE.Mesh( new THREE.TorusGeometry( 5, 3 ), meshMaterial );
	torus.position.set( -25, 25, -25 );
	scene.add( torus );

	var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 5 ), meshMaterial );
	cylinder.position.set( 25, -25, 25 );
	scene.add( cylinder );

	var circle = new THREE.Mesh( new THREE.CircleGeometry( 5 ), meshMaterial );
	circle.position.set( -25, -25, 25 );
	scene.add( circle );

	var octahedron = new THREE.Mesh( new THREE.OctahedronGeometry( 5 ), meshMaterial );
	octahedron.position.set( 25, -25, -25 );
	scene.add( octahedron );

	var torusKnot = new THREE.Mesh( new THREE.TorusKnotGeometry( 5, 1 ), meshMaterial );
	torusKnot.position.set( -25, -25, -25 );
	scene.add( torusKnot );

	
	// Add axes
	axes = buildAxes( 1000 );
	scene.add( axes );

	
	// We need a camera to look at the scene!
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 30, 50, 120 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	
	// And some sort of controls to move around
	// We'll use one of THREE's provided control classes for simplicity
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 0.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;


	// and go!
	animate();

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}

	function buildAxes( length ) {
		var axes = new THREE.Object3D();

		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

		return axes;

	}

	function buildAxis( src, dst, colorHex, dashed ) {
		var geom = new THREE.Geometry(),
			mat; 

		if(dashed) {
			mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
		} else {
			mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
		}

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
		geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

		var axis = new THREE.Line( geom, mat, THREE.LinePieces );

		return axis;

	}
}
