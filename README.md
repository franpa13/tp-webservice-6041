# TP Webservice — Consumo de APIs externas

Aplicación web desarrollada como trabajo práctico universitario. Consume 5 APIs externas distintas, cada una presentada en su propia sección de la app.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| [Angular](https://angular.dev) | 21.2 | Framework principal (standalone components, signals, lazy loading) |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Lenguaje base |
| [Tailwind CSS](https://tailwindcss.com) | 4.1 | Estilos utilitarios |
| [Spartan UI](https://www.spartan.ng) | alpha.697 | Componentes UI (Button, Input, Badge, Sheet) |
| [ng-icons / Lucide](https://ng-icons.github.io/ng-icons) | 32+ | Íconos vectoriales |
| [RxJS](https://rxjs.dev) | 7.8 | Manejo de observables y llamadas HTTP |
| [Angular CDK](https://material.angular.io/cdk) | 21 | Portal y primitivas de UI |

---

## APIs consumidas

| Sección | API | Descripción |
|---|---|---|
| **Películas** | [IMDB Top 100 Movies](https://rapidapi.com/rapihub-rapihub-default/api/imdb-top-100-movies) — RapidAPI | Listado de las 100 mejores películas según IMDB |
| **Autos** | [Car Specs](https://rapidapi.com/alekivanovski96-O1vKHrFskQm/api/car-specs) — RapidAPI | Marcas de autos y sus modelos disponibles |
| **Conversor** | [Currency Data](https://apilayer.com/marketplace/currency_data-api) — APILayer | Conversión de montos entre divisas en tiempo real |
| **Audio** | [OpenAI Text to Speech](https://rapidapi.com/swift-api-swift-api-default/api/open-ai-text-to-speech1) — RapidAPI | Conversión de texto a voz con distintas voces e idiomas |
| **Clima** | [Open-Meteo](https://open-meteo.com) — Gratuita, sin clave | Clima actual de cualquier ciudad del mundo |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── navbar/              # Barra de navegación responsiva
│   ├── pages/
│   │   ├── peliculas/       # Página de películas
│   │   ├── autos/           # Página de marcas y modelos de autos
│   │   ├── conversor/       # Página de conversión de monedas
│   │   ├── audio/           # Página de texto a audio
│   │   └── otra-api/        # Página del clima
│   ├── services/            # Servicios HTTP (uno por API)
│   └── models/              # Interfaces TypeScript por API
├── environments/
│   └── environment.ts       # API keys centralizadas
└── libs/                    # Componentes Spartan UI (helm layer)
```

---

## Configuración de API keys

Todas las claves están centralizadas en [`src/environments/environment.ts`](src/environments/environment.ts):

```ts
export const environment = {
  rapidApiKey: 'TU_RAPIDAPI_KEY',   // clave compartida para todas las APIs de RapidAPI
  imdbHost:    'imdb-top-100-movies.p.rapidapi.com',
  carsHost:    'car-specs.p.rapidapi.com',
  audioHost:   'open-ai-text-to-speech1.p.rapidapi.com',
  apiLayerKey: 'TU_APILAYER_KEY',   // clave para APILayer (conversor de monedas)
};
```

> Las APIs de RapidAPI comparten una única clave. Open-Meteo es completamente gratuita y no requiere clave.

---

## Requisitos previos

- [Node.js](https://nodejs.org) 18 o superior
- [npm](https://www.npmjs.com) 10 o superior
- Angular CLI instalado globalmente (opcional):
  ```bash
  npm install -g @angular/cli
  ```

---

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd tp-webservice-6041
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las API keys

Editar el archivo `src/environments/environment.ts` y reemplazar los valores con tus claves reales:

- **RapidAPI key**: obtenerla en [rapidapi.com](https://rapidapi.com) → suscribirse a cada API mencionada arriba
- **APILayer key**: obtenerla en [apilayer.com](https://apilayer.com) → suscribirse a Currency Data API

### 4. Levantar el servidor de desarrollo

```bash
npm start
```

La app estará disponible en `http://localhost:4200`.

### 5. Build para producción

```bash
npm run build
```

Los archivos compilados se generan en el directorio `dist/`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo en `localhost:4200` |
| `npm run build` | Compila la app para producción |
| `npm run watch` | Compila en modo watch (desarrollo) |
| `npm test` | Ejecuta los tests con Vitest |
