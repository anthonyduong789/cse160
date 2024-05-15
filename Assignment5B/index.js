import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";



	function makeXYZGUI( gui, vector3, name, onChangeFn ) {

		const folder = gui.addFolder( name );
		folder.add( vector3, 'x', - 10, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'y', 0, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'z', - 10, 10 ).onChange( onChangeFn );
		folder.open();

	}

class DegRadHelper {

		constructor( obj, prop ) {

			this.obj = obj;
			this.prop = prop;

		}
		get value() {

			return THREE.MathUtils.radToDeg( this.obj[ this.prop ] );

		}
		set value( v ) {

			this.obj[ this.prop ] = THREE.MathUtils.degToRad( v );

		}

	}

class Farmer{
  constructor(scene,scale,x = 0, y = 0, z = 0){
    this.scene = scene;
    this.object = null;
    this.pivot = new THREE.Group();
    this.pivot.position.set(x, y, z);
    this.loader = new OBJLoader;
    scene.add(this.pivot);
    this.loader.load(
      './Farmer/17864_Farmer_v1.obj',
      (object) => {
        object.scale.set(scale, scale, scale);
        // position relative to the pivot
        //         object.rotation.x = THREE.MathUtils.degToRad(-90);
        // object.position.set(0, 0, 0);
        // object.position.set(5, 0, 0); // This sets the object 5 units away from the pivot along the x-axis

        this.object = object;
        this.pivot.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

  }
  animate(){
    this.pivot.rotation.y-=0.05;
    // this.pivot.rotation.z+=0.0011;
// this.pivot.rotation.x+=.01;
    // this.object.rotation.x += time*0.2
    // this.object.rotation.y += time*0.2
    // if (this.pivot) {
    //   time *= 0.001; // convert time to seconds
    //   const speed = 1 + 0 * 0.1;
    //   const rot = time * speed;
    //    this.pivot.rotation.x = rot;
    //    // this.pivot.rotation.y = rot;
    // }
   // if (this.object) {
   //    time *= 0.001; // convert time to seconds
   //    const speed = 1 + 2 * 0.1;
   //    const rot = time * speed;
   //    this.object.rotation.x = rot;
   //    this.object.rotation.y = rot;
   //  }


  }

}


class UFO {
  constructor(scene, x = 0, y = 0, z = 0) {
    this.scene = scene;
    this.ufo = new THREE.Group();
    this.createUFO();
    this.setPosition(x, y, z);
    scene.add(this.ufo);
  }

  createUFO() {
    // Main body (dome)
    const domeGeometry = new THREE.SphereGeometry(2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 0;

    // Bottom part
    const bottomGeometry = new THREE.CylinderGeometry(2, 5, 1, 32);
    const bottomMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = 0;

    // Central antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 3;

    // Antenna tip
    const antennaTipGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const antennaTipMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const antennaTip = new THREE.Mesh(antennaTipGeometry, antennaTipMaterial);
    antennaTip.position.y = 4;

    // Lights
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    // Create lights around the bottom edge
    for (let i = 0; i < 16; i++) {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      const angle = (i / 16) * Math.PI * 2;
      light.position.set(Math.cos(angle) * 2.5, -0.5, Math.sin(angle) * 2.5);
      this.ufo.add(light);
    }

    // Additional decorations
    const decorationGeometry = new THREE.ConeGeometry(0.2, 0.5, 16);
    const decorationMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    for (let i = 0; i < 4; i++) {
      const decoration = new THREE.Mesh(decorationGeometry, decorationMaterial);
      const angle = (i / 4) * Math.PI * 2;
      decoration.position.set(Math.cos(angle) * 2, 1, Math.sin(angle) * 2);
      decoration.rotation.x = Math.PI / 2;
      this.ufo.add(decoration);
    }

    // Assemble UFO
    this.ufo.add(dome);
    this.ufo.add(bottom);
    this.ufo.add(antenna);
    this.ufo.add(antennaTip);
  }

  // Set the position of the UFO
  setPosition(x, y, z) {
    this.ufo.position.set(x, y, z);
  }

  // Optional: Add animation for the UFO
  animate() {
    this.ufo.rotation.y += 0.01;
  }
}




// Create cylindrical light source at a specific position







function main() {
  const canvas = document.querySelector("#c");
  // const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  });
  const fov = 20;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 130;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(20, 300, 0);

  const scene = new THREE.Scene();

  // scene.background = new THREE.Color("black");



 //   NOTE: If we want the background to be able to be affected by post 
  //   processing  effects then we need to draw the background using THREE.js.
 // const loader = new THREE.TextureLoader();
 // const bgTexture = loader.load('./sky1.jpg');
 // bgTexture.colorSpace = THREE.SRGBColorSpace;
 // scene.background = bgTexture;

{
    // NOTE: method 1 for using a cubemap loading 6 images
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    './pos-x.jpg',
    './neg-x.jpg',
    './pos-y.jpg',
    './neg-y.jpg',
    './pos-z.jpg',
    './neg-z.jpg',
  ]);
  scene.background = texture;
    // NOTE: method 2 uses a 360 degree image
  //   const loader = new THREE.TextureLoader();
  // const texture = loader.load(
  //     '360NightSky.jpeg',
  //   () => {
  //     texture.mapping = THREE.EquirectangularReflectionMapping;
  //     texture.colorSpace = THREE.SRGBColorSpace;
  //         // Set filtering options
  //     scene.background = texture;
  //
  //   });
}



const UFO_object=new UFO(scene, 8, 10, 0);



  function updateCamera() {
    camera.updateProjectionMatrix();
  }
  // responsible for the Controls
    // NOTE: gui control
  // NOTE: DirectionalLightColor
    const DirectionalLightColor = 0xffffff;
    const dirIntensity = 0;
    const DirectionalLightObject = new THREE.DirectionalLight(DirectionalLightColor, dirIntensity);

const directionalLightHelper = new THREE.DirectionalLightHelper(DirectionalLightObject, 1);
    scene.add(directionalLightHelper);



    DirectionalLightObject.position.set(0, 10, 0);
    DirectionalLightObject.target.position.set(-5, 0, 0);
    scene.add(DirectionalLightObject);
    scene.add(DirectionalLightObject.target);
    // NOTE: Ambient Light
   const AmbientColor = 0xffffff;
   const AmbIntensity = 0;
   const AmbientLightObject = new THREE.AmbientLight(AmbientColor, AmbIntensity);
   scene.add(AmbientLightObject);
    const gui = new dat.GUI();
  // PointLight
  const PointLightColor = 0xffffff;
  const pointIntensity = 0;
  const PointLightObject = new THREE.PointLight(PointLightColor, pointIntensity);
  PointLightObject.position.set(8,10,0);
  scene.add(PointLightObject);

  const SpotLightColor = 0xFFFFFF;
  const spotIntensity = 200;
  const SpotLightObject = new THREE.SpotLight(SpotLightColor, spotIntensity);
  scene.add(SpotLightObject);


  // NOTE: Default SpotLightObject
  SpotLightObject.position.set(8,10,0);
  SpotLightObject.target.position.set(8,0,0);
  SpotLightObject.angle=THREE.MathUtils.degToRad(26);
  SpotLightObject.penumbra=0;
  SpotLightObject.distance=23;
  

const helper = new THREE.SpotLightHelper(SpotLightObject);

scene.add(helper);
  function updateLight(light) {

			SpotLightObject.target.updateMatrixWorld();
			helper.update();
      DirectionalLightObject.target.updateMatrixWorld();
    directionalLightHelper.update();

		}

		updateLight();

		gui.add( SpotLightObject, 'intensity', 0, 250, 1 );
		gui.add( SpotLightObject, 'distance', 0, 40 ).onChange( updateLight );
		gui.add( new DegRadHelper( SpotLightObject, 'angle' ), 'value', 0, 90 ).name( 'angle' ).onChange( updateLight );
		gui.add( SpotLightObject, 'penumbra', 0, 1, 0.01 );

		makeXYZGUI( gui, SpotLightObject.position, 'position', updateLight );
   
		makeXYZGUI( gui, SpotLightObject.target.position, 'target', updateLight );

// Assuming gui is already created and DirectionalLightObject is your directional light
const directionalLightFolder = gui.addFolder('Directional Light');

// Add color control
directionalLightFolder.addColor(new ColorGUIHelper(DirectionalLightObject, "color"), "value").name("Directional Light Color");

// Add intensity control
directionalLightFolder.add(DirectionalLightObject, "intensity", 0, 10, 0.01).name("Intensity");

// Add target position controls

directionalLightFolder.add(DirectionalLightObject.target.position, "x", -10, 10, 0.1).name("Target X");
directionalLightFolder.add(DirectionalLightObject.target.position, "z", -10, 10, 0.1).name("Target Z");
directionalLightFolder.add(DirectionalLightObject.target.position, "y", 0, 10, 0.1).name("Target Y");
directionalLightFolder.open(); // Optional: Automatically open the folder
const ambientLightFolder = gui.addFolder('Ambient Light');

// Light color control
const lightColor = { color: AmbientLightObject.color.getHex() }; // Initial color value
ambientLightFolder.addColor(lightColor, 'color').onChange((value) => {
    AmbientLightObject.color.set(value);
});

// Light intensity control
ambientLightFolder.add(AmbientLightObject, 'intensity', 0, 2, 0.01); // Min: 0, Max: 2, Step: 0.01

ambientLightFolder.open();
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(PointLightObject.position, 'x', -50, 50, 0.1).name("Position X");
        pointLightFolder.add(PointLightObject.position, 'y', -50, 50, 0.1).name("Position Y");
        pointLightFolder.add(PointLightObject.position, 'z', -50, 50, 0.1).name("Position Z");

        pointLightFolder.open(); // Optional: Automatically open the folder




    gui.add(camera, "fov", 1, 180).onChange(updateCamera);
    const minMaxGUIHelper = new MinMaxGUIHelper(camera, "near", "far", 0.1);
    gui
      .add(minMaxGUIHelper, "min", 0.1, 50, 0.1)
      .name("near")
      .onChange(updateCamera);
    gui
      .add(minMaxGUIHelper, "max", 0.1, 50, 0.1)
      .name("far")
      .onChange(updateCamera);
  //
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "./cropCircle.webp",
    );




    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);
const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Right side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Left side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Top side (no texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Bottom side (no texture)
    new THREE.MeshPhongMaterial({ map: texture }),    // Front side (with texture)
    new THREE.MeshPhongMaterial({ color: 0xffffff })  // Back side (no texture)
  ];

    const planeGeo = new THREE.BoxGeometry(planeSize, planeSize);
    const mesh = new THREE.Mesh(planeGeo, materials);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }


  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  
    const mtlLoader = new MTLLoader();
    mtlLoader.load("windmill.mtl", (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load("windmill.obj", (root) => {
        scene.add(root);

        // compute the box that contains all the stuff
        // from root and below
        const box = new THREE.Box3().setFromObject(root);

        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        // set the camera to frame the box
        // NOTE: adjust first parameter to zoom in and out
        frameArea(boxSize * 3, boxSize, boxCenter, camera);

        // update the Trackball controls to handle the new size
        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      });
    });

   const FarmerObj = new Farmer(scene,0.2, 8, 2, 0)



  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  // renderShapes
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const cube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const pyramid = new THREE.ConeGeometry(1.25, 5, 8);
  function texturedCube(geometry, x, y, z) {
    const loader = new THREE.TextureLoader();
    const textures = [
      loader.load('hayBale.png'),
      loader.load('hayBale.png'),
      loader.load('hayBaleTopBot.png'),
      loader.load('hayBaleTopBot.png'),
      loader.load('hayBale.png'),
      loader.load('hayBale.png')
    ];;
    // textures.colorSpace = THREE.SRGBColorSpace;
    // const material = new THREE.MeshBasicMaterial({
    //   map: textures,
    // });
        const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
  }

     const cubeGeometry = new THREE.BoxGeometry(5,5, 5);
     const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red
     const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
     cube1.position.set(-5, 5, 0);
     scene.add(cube1);
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions,
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);

    mesh.position.set(-sphereRadius, sphereRadius + 2, 6);
    scene.add(mesh);
  }
  const otherShapes = [texturedCube(cube, 8, 2.4, 0),
    texturedCube(cube, 6, 2.9, 0),
    texturedCube(cube, 7, 2.2, 2),
    texturedCube(cube, 7, 2.5, -2)


  ];
  function renderOtherShapes(time) {
    time *= 0.001; // convert time to seconds

    otherShapes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(renderOtherShapes);
  }

  function render(time) {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    // Set the repeat and offset properties of the background texture
  // to keep the image's aspect correct.
  // Note the image may not have loaded yet.
    // used for loading in texture as background with teh Loader1
  // const canvasAspect = canvas.clientWidth / canvas.clientHeight;
  // const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
  // const aspect = imageAspect / canvasAspect;
  //
  // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
  // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
  //
  // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
  // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
  //   renderer.render(scene, camera);

    requestAnimationFrame(render);
      UFO_object.animate();
      FarmerObj.animate();

  }

  requestAnimationFrame(render);
  requestAnimationFrame(renderOtherShapes);
}

main();
