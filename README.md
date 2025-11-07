# Dia en el Bosque - Aplicación de Programa de Eventos

Este proyecto es una aplicación web de una sola página diseñada para mostrar el programa de un evento de un día de duración llamado "Dia en el Bosque". La aplicación presenta una lista de charlas técnicas, calcula dinámicamente los horarios e incluye pausas, y permite a los usuarios filtrar las charlas por categoría.

## ✨ Características

- **Programa Dinámico:** Muestra un horario completo para el día, comenzando a las 10:00 AM, con charlas de 1 hora, descansos de 10 minutos y una pausa para el almuerzo de 1 hora.
- **Búsqueda en Tiempo Real:** Permite a los usuarios buscar y filtrar las charlas por categoría de forma instantánea.
- **Diseño Limpio:** Interfaz de usuario moderna y fácil de leer, construida con HTML semántico y CSS.
- **Backend Sencillo:** Un servidor ligero de Node.js y Express se encarga de servir la aplicación y los datos de las charlas.

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Datos:** JSON

## 🚀 Cómo Empezar

Sigue estas instrucciones para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Azuprecision/Gato-negro.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd Gato-negro 
    ```
    *(Nota: Si clonaste el repositorio dentro de la carpeta `event-website`, asegúrate de navegar al directorio correcto que contiene `package.json`)*

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Inicia el servidor:**
    ```bash
    node server.js
    ```

5.  **Abre la aplicación:**
    Abre tu navegador y visita [http://localhost:3000](http://localhost:3000).

## 📂 Estructura del Proyecto

```
event-website/
├── public/
│   ├── css/
│   │   └── style.css       # Estilos
│   ├── js/
│   │   └── main.js         # Lógica del frontend
│   └── index.html          # Estructura de la página
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
├── server.js               # Servidor Express
└── talks.json              # Datos de las charlas
```

## ⚙️ API

La aplicación utiliza una API simple para obtener los datos de las charlas.

- **`GET /api/talks`**
  - **Descripción:** Devuelve una lista completa de todas las charlas disponibles desde el archivo `talks.json`.
  - **Respuesta:** Un array de objetos JSON, donde cada objeto representa una charla.
