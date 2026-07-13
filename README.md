# Palabras Encadenadas

Trabajo Final Integrador — UNQ UI  
Lucía Viazzo

## ¿De qué trata?

Juego de palabras encadenadas: ingresás palabras válidas en español donde cada una debe comenzar con la última letra de la anterior. Tenés 15 segundos por turno. Cuantas más letras, más puntos.

## Instalación

Requisitos: [Node.js](https://nodejs.org/) (versión 18 o superior)

```bash
# Clonar el repositorio
git clone https://github.com/luciaviazzo/unq-ui-lucia-viazzo-trabajo-final.git

# Entrar al directorio
cd unq-ui-lucia-viazzo-trabajo-final

# Instalar dependencias
npm install
```

## Cómo ejecutarlo localmente

```bash
npm run dev
```

Luego abrí [http://localhost:5173](http://localhost:5173) en el navegador.

## Funcionalidades

- Validación de palabras contra el diccionario español (API de la cátedra)
- Puntaje acumulado (1 punto por letra)
- Timer de 15 segundos por turno
- Mensajes de error según el tipo de palabra inválida
- Leaderboard local con los mejores 10 puntajes
- Soporte para palabras con tildes
- Interfaz responsive
