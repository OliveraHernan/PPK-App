# Documentación Técnica - Planning Poker

## 1. Introducción
El Planning Poker es una técnica ampliamente utilizada en metodologías ágiles, como Scrum, para estimar el esfuerzo o la complejidad de las tareas dentro de un proyecto. Este método combina la experiencia colectiva del equipo y un enfoque colaborativo para llegar a estimaciones precisas y consensuadas.

## 2. Objetivos
- Configurar el entorno con TypeScript para mayor escalabilidad y seguridad en el desarrollo.
- Establecer estilos iniciales con Tailwind CSS o CSS Modules.
- Implementar autenticación basada en JWT para el inicio de sesión.
- Permitir a los usuarios registrarse o unirse a sesiones con un enlace único generado dinámicamente.
- Crear un backend con una base de datos para almacenar sesiones activas (usando MongoDB).
- Generar enlaces únicos para invitar a los miembros del equipo a cada sesión.
- Permitir al creador de la sesión (facilitador) controlar el flujo de votación (iniciar, detener y resetear rondas).
- Usar WebSockets con herramientas como Socket.io.
- Sincronizar las estimaciones de todos los usuarios en una interfaz compartida.
- Crear componentes interactivos para las tarjetas de estimación, con valores como la serie de Fibonacci o T-Shirt.
- Mostrar los resultados de la votación en gráficos o tablas dinámicas para facilitar la discusión.
- Permitir exportar resultados en formatos como PDF o CSV para referencia.

## 3. Arquitectura de la aplicación
Esta arquitectura organiza una aplicación **Next.js** de forma modular y reutilizable, dividiendo responsabilidades por áreas funcionales para facilitar el desarrollo, mantenimiento y escalabilidad. Aquí está el desglose de cada carpeta y su propósito:


├── /components
│   ├── /forms          // Formularios reutilizables (ShadCN + Tailwind)
│   ├── /modals         // Modales reutilizables para confirmaciones o acciones
│   ├── /tables         // Tablas personalizadas para visualización de datos
│   └── /UI             // Componentes pequeños y reutilizables (botones, inputs)
├── /lib
│   ├── /db             // Conexión y funciones auxiliares para MongoDB
│   ├── /validators     // Validaciones reutilizables con Zod
│   ├── /interfaces  // Interfaces que se deseen separar del componente 
│   └── /auth           // Utilidades para autenticación (JWT, roles)
├── /pages
│   ├── /api            // Rutas API para la lógica de backend
│   │   ├── /auth       // Login, registro y control de acceso
│   │   ├── /sessions   // Gestión de sesiones de Planning Poker
│   │   ├── /stories    // CRUD de historias de usuario
│   │   └── /reports    // Generación de informes y análisis
│   └── /dashboard      // Página principal de la aplicación
├── /styles             // Archivos CSS globales y configuración de Tailwind
├── /utils              // Funciones auxiliares y helpers
├── /hooks              // Custom hooks para estado y lógica compartida
└── tailwind.config.js  // Configuración de Tailwind CSS



## 4. Dependencias Clave
### 1. Core del Proyecto
- **next**: Framework principal.
- **react** y **react-dom**: Biblioteca base.
- **tailwindcss**: Para diseño y estilos.
- **shadcn/ui**: Componentes UI preconfigurados y accesibles.
- **zod**: Validación de esquemas y formularios.

### 2. Persistencia y API
- **mongoose**: ORM para conectarse y trabajar con MongoDB.
- **jsonwebtoken**: Generación y validación de tokens JWT.

### 3. Estado y Gestión
- **zustand**: Para estado global ligero y manejable.

## 5. GitFlow y Manejo de Ramas
Para garantizar que todos los desarrolladores trabajen de manera eficiente y organizada en paralelo, se seguirá una estrategia de **GitFlow**:
- **Rama principal (`master`)**: Contiene el código en producción.
- **Rama de desarrollo (`dev`)**: Aquí se integran los cambios aprobados de todas las ramas de features y épicas.





