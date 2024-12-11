import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight, DirectionalLight, MeshBasicMaterial } from 'three';
import * as dat from 'dat.gui';  // Importar dat.GUI
import { color } from 'three/webgpu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  debugObject = { color: 0xff12ae }; // Objeto para el color del móvil
  nuevoMaterial = new THREE.MeshStandardMaterial({ color: this.debugObject.color }); // Material del móvil
  directionalLightFront = new DirectionalLight(this.debugObject.color, 1);
  directionalLightBack = new DirectionalLight(this.debugObject.color, 1);

  // Variables para el plano
  plane: THREE.Mesh | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Solo continuar si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Este código se ejecuta solo en el navegador

      // Crear el renderizador
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true; // Habilitar sombras
      this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

      // Crear la escena
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('lightgray');  // Fondo blanco

      // Luz ambiental (para iluminar el modelo)
      const ambientLight = new AmbientLight(0x404040, 5); // Luz suave
      this.scene.add(ambientLight);

      // Luz direccional (luz principal)
      this.directionalLightFront.position.set(2, 2, 2).normalize();
      this.directionalLightFront.castShadow = true; // Habilitar sombras en la luz direccional
      this.scene.add(this.directionalLightFront);

      this.directionalLightBack.position.set(-2, -2, -2).normalize();
      this.directionalLightBack.castShadow = true; // Habilitar sombras en la luz direccional
      this.scene.add(this.directionalLightBack);

      // Cámara
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 4, 0);
      this.scene.add(camera);

      // Controles de órbita
      const controls = new OrbitControls(camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.05;
      controls.zoomSpeed = 0.8;
      controls.minPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia arriba
      controls.maxPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia abajo

      // Cargar el modelo 3D
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/assets/models/phoneRed.glb', // Ruta del modelo
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2); // Escala el modelo

          // Ajustar materiales del modelo
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (child.material && child.material.color) {
                child.material = this.nuevoMaterial;
                child.castShadow = true; // Proyectar sombras
                child.receiveShadow = true; // Recibir sombras
              }
            }
          });



          // Cargar la imagen
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(
            '/assets/images/OpenOfice2.png', // Ruta de la imagen
            (imageTexture) => {
              console.log('Imagen cargada correctamente'); // Verifica si se carga
              const planeGeometry = new THREE.PlaneGeometry(1.8, 3.6); // Tamaño del plano
              const planeMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true, side: THREE.DoubleSide });
              this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
              // Posicionar el plano sobre el modelo
              this.plane.position.set(0, 0.15, -0.3); // Ajusta la posición
              this.plane.rotation.x = -Math.PI / 2; // Rotar el plano si es necesario

              this.plane.castShadow = true; // Habilitar sombras en el plano
              this.plane.receiveShadow = true;

              // Crear un grupo que contenga tanto el modelo como la imagen
              const group = new THREE.Group();
              group.add(model);
              group.add(this.plane);
              group.rotation.x = Math.PI / 2.15; // Ajusta la rotación
              // Añadir el grupo a la escena
              this.scene.add(group);
              console.log('Imagen aplicada correctamente');

              // Crear el GUI una vez que el plano esté disponible
              const gui = new dat.GUI();

              // Crea un objeto para el color, que será modificado por el GUI


              // Crea una carpeta para el móvil y añade el selector de color
              gui.addColor(this.debugObject, 'color')
                .onChange(() => {
                  this.nuevoMaterial.color.set(this.debugObject.color)
                  this.directionalLightBack.color.set(this.debugObject.color);
                  this.directionalLightFront.color.set(this.debugObject.color);
                })
              gui.add(this.directionalLightFront, 'intensity', 0, 10).name('Luz frontal');
              gui.add(this.directionalLightBack, 'intensity', 0, 10).name('Luz trasera');
              gui.add(this.directionalLightBack.position, 'x', -10, 10).name('Luz trasera X');
              gui.add(this.directionalLightBack.position, 'y', -10, 10).name('Luz trasera Y');
              gui.add(this.directionalLightBack.position, 'z', -10, 10).name('Luz trasera Z');

              gui.open();

            },
            undefined, // Progreso (si lo necesitas)
            (error) => {
              console.error('Error al cargar la imagen:', error);
            }
          );
        },
        (xhr) => {
          console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error('Error al cargar el modelo:', error);
        }
      );
      // Crear una luz de área
      const rectLight = new THREE.RectAreaLight(0xffffff, 5, 10, 5);  // Color, intensidad, ancho y alto
      rectLight.position.set(0, 5, 0);  // Posicionar la luz

      // Crear un objeto para visualizar la luz (es común hacerlo con una malla)


      // Añadir la luz de área a la escena
      this.scene.add(rectLight);


      // Animar la escena
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(this.scene, camera);
      };
      animate();
    }
  }
}
