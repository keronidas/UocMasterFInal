import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight, DirectionalLight, MeshBasicMaterial } from 'three';
import * as dat from 'dat.gui';  // Importar dat.GUI

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
      this.scene.background = new THREE.Color('white');  // Fondo blanco

      // Luz ambiental (para iluminar el modelo)
      const ambientLight = new AmbientLight(0x404040, 1); // Luz suave
      this.scene.add(ambientLight);

      // Luz direccional (luz principal)
      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5).normalize();
      directionalLight.castShadow = true; // Habilitar sombras en la luz direccional
      this.scene.add(directionalLight);

      // Cámara
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(10, 10, 10);
      this.scene.add(camera);

      // Controles de órbita
      const controls = new OrbitControls(camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.05;
      controls.zoomSpeed = 0.1;
      controls.minPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia arriba
      controls.maxPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia abajo

      // Cargar el modelo 3D
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/assets/models/phoneRed.glb', // Ruta del modelo
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2); // Escala el modelo
          model.rotation.x = Math.PI / 2.15; // Ajusta la rotación

          // Ajustar materiales del modelo
          const nuevoMaterial = new THREE.MeshMatcapMaterial({ color: 'red' });
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (child.material && child.material.color) {
                child.material = nuevoMaterial;
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
              const planeGeometry = new THREE.PlaneGeometry(1, 1); // Tamaño del plano
              const planeMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
              this.plane = new THREE.Mesh(planeGeometry, planeMaterial);

              // Posicionar el plano sobre el modelo
              this.plane.position.set(0, 2, 0); // Ajusta la posición
              this.plane.rotation.x = -Math.PI / 2; // Rotar el plano si es necesario

              this.plane.castShadow = true; // Habilitar sombras en el plano
              this.plane.receiveShadow = true;

              // Crear un grupo que contenga tanto el modelo como la imagen
              const group = new THREE.Group();
              group.add(model);
              group.add(this.plane);

              // Añadir el grupo a la escena
              this.scene.add(group);
              console.log('Imagen aplicada correctamente');

              // Crear el GUI una vez que el plano esté disponible
              const gui = new dat.GUI();
              const planeFolder = gui.addFolder('Plano');
              planeFolder.add(this.plane.position, 'x', -5, 5).name('Posición X');
              planeFolder.add(this.plane.position, 'y', -5, 5).name('Posición Y');
              planeFolder.add(this.plane.position, 'z', -5, 5).name('Posición Z');
              
              // Para las rotaciones, el rango va de -Math.PI a Math.PI
              planeFolder.add(this.plane.rotation, 'x', -Math.PI, Math.PI).name('Rotación X');
              planeFolder.add(this.plane.rotation, 'y', -Math.PI, Math.PI).name('Rotación Y');
              planeFolder.add(this.plane.rotation, 'z', -Math.PI, Math.PI).name('Rotación Z');
              
              // Para la escala
              planeFolder.add(this.plane.scale, 'x', 0.1, 5).name('Escala X');
              planeFolder.add(this.plane.scale, 'y', 0.1, 5).name('Escala Y');
              planeFolder.add(this.plane.scale, 'z', 0.1, 5).name('Escala Z');
              
              planeFolder.open();
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
