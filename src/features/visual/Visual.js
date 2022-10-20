
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

import {
    selectCThickness,
    selectAThickness,
    selectCDiameter,
    selectADiameter,
  } from '../stack/stackSlice';
import { ShapeGeometry } from 'three';


export function Visual() {

    const mountRef = useRef(null);

    const CThickness = useSelector(selectCThickness);
    const AThickness = useSelector(selectAThickness);
    const CDiameter = useSelector(selectCDiameter);
    const ADiameter = useSelector(selectADiameter);


    useEffect(() => {
    
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize( mountRef.current.offsetWidth, 200 );
        renderer.setClearColor(0xFFFFFF);
        mountRef.current.appendChild( renderer.domElement );
        const camera = new THREE.PerspectiveCamera( 40, mountRef.current.offsetWidth / 200, 1, 500 );
        camera.position.set( -40, 0, 60 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); 

        var v = 0.05;
        var max_i = 100;
        var w = 7.8*Math.PI * CThickness*AThickness / (ADiameter**2 + CDiameter **2)
        var points = []
        var z_max = 10

        const shape = new THREE.Shape();
        shape.moveTo(0,0)


        // for (let z=0; z<z_max; z++){
            for (let i = 0; i < max_i; i++) {
                const x1 = v*i*Math.cos(w * i)
                const y1 = v*i*Math.sin(w * i)
                const x2 = v*(i+1)*Math.cos(w * i+1)
                const y2 = v*(i+1)*Math.sin(w * i+1)
                shape.lineTo(x1,y1,x2,y2)
                const delta_t = 0.01
                if(x2 < 0){
                    var x3 = x2-delta_t
                }
                else{
                    var x3 = x2+delta_t
                }
                if(y2 < 0){
                    var y3 = y2-delta_t
                }
                else{
                    var y3 = y2+delta_t
                }

                // shape.lineTo(x2,y2)
                // const p = new THREE.Vector3(x,y,z)
                // points.push(p)
                // const geometry = new THREE.BoxGeometry( 0.5,0.5,3 );
                // geometry.translate(p.x, p.y, p.z)
                // const material = new THREE.MeshBasicMaterial( { color: 0x00aa00, wireframe: false } );
                // const mesh = new THREE.Mesh( geometry, material );
                // scene.add( mesh );

        }
    // }
    

    const geometry = new THREE.ShapeGeometry( shape );
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: true } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    scene.add( mesh );

    // group = new THREE.Group();
    // group.position.y = 50;
    // scene.add( group );

    // // NURBS curve

    // const nurbsControlPoints = [];
    // const nurbsKnots = [];
    // const nurbsDegree = 3;

    // for ( let i = 0; i <= nurbsDegree; i ++ ) {

    //     nurbsKnots.push( 0 );

    // }

    // for ( let i = 0, j = 20; i < j; i ++ ) {

    //     nurbsControlPoints.push(
    //         new THREE.Vector4(
    //             Math.random() * 400 - 200,
    //             Math.random() * 400,
    //             Math.random() * 400 - 200,
    //             1 // weight of control point: higher means stronger attraction
    //         )
    //     );

    //     const knot = ( i + 1 ) / ( j - nurbsDegree );
    //     nurbsKnots.push( THREE.MathUtils.clamp( knot, 0, 1 ) );

    // }

    // const nurbsCurve = new NURBSCurve( nurbsDegree, nurbsKnots, nurbsControlPoints );

    // const nurbsGeometry = new THREE.BufferGeometry();
    // nurbsGeometry.setFromPoints( nurbsCurve.getPoints( 200 ) );

    // const nurbsMaterial = new THREE.LineBasicMaterial( { color: 0x333333 } );

    // const nurbsLine = new THREE.Line( nurbsGeometry, nurbsMaterial );
    // nurbsLine.position.set( 200, - 100, 0 );
    // group.add( nurbsLine );

    // const nurbsControlPointsGeometry = new THREE.BufferGeometry();
    // nurbsControlPointsGeometry.setFromPoints( nurbsCurve.controlPoints );

    // const nurbsControlPointsMaterial = new THREE.LineBasicMaterial( { color: 0x333333, opacity: 0.25, transparent: true } );

    // const nurbsControlPointsLine = new THREE.Line( nurbsControlPointsGeometry, nurbsControlPointsMaterial );
    // nurbsControlPointsLine.position.copy( nurbsLine.position );
    // group.add( nurbsControlPointsLine );

    // // NURBS surface

    // const nsControlPoints = [
    //     [
    //         new THREE.Vector4( - 200, - 200, 100, 1 ),
    //         new THREE.Vector4( - 200, - 100, - 200, 1 ),
    //         new THREE.Vector4( - 200, 100, 250, 1 ),
    //         new THREE.Vector4( - 200, 200, - 100, 1 )
    //     ],
    //     [
    //         new THREE.Vector4( 0, - 200, 0, 1 ),
    //         new THREE.Vector4( 0, - 100, - 100, 5 ),
    //         new THREE.Vector4( 0, 100, 150, 5 ),
    //         new THREE.Vector4( 0, 200, 0, 1 )
    //     ],
    //     [
    //         new THREE.Vector4( 200, - 200, - 100, 1 ),
    //         new THREE.Vector4( 200, - 100, 200, 1 ),
    //         new THREE.Vector4( 200, 100, - 250, 1 ),
    //         new THREE.Vector4( 200, 200, 100, 1 )
    //     ]
    // ];
    // const degree1 = 2;
    // const degree2 = 3;
    // const knots1 = [ 0, 0, 0, 1, 1, 1 ];
    // const knots2 = [ 0, 0, 0, 0, 1, 1, 1, 1 ];
    // const nurbsSurface = new NURBSSurface( degree1, degree2, knots1, knots2, nsControlPoints );

    // const map = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
    // map.wrapS = map.wrapT = THREE.RepeatWrapping;
    // map.anisotropy = 16;

    // function getSurfacePoint( u, v, target ) {

    //     return nurbsSurface.getPoint( u, v, target );

    // }

    // const geometry = new ParametricGeometry( getSurfacePoint, 20, 20 );
    // const material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
    // const object = new THREE.Mesh( geometry, material );
    // object.position.set( - 200, 100, 0 );
    // object.scale.multiplyScalar( 1 );
    // group.add( object );



        controls.update();

        function render(){
            renderer.render( scene, camera)
            console.log(camera.position)
        }

        render()

        return () => mountRef.current.removeChild( renderer.domElement);

      }, [CThickness, AThickness, ADiameter, CDiameter]);


    return(
        <div ref={mountRef}>

        </div>
    )
}