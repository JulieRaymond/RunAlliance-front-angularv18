# RunAlliance Front-End

## Overview

RunAlliance Front-End is an Angular application that serves as the front-end for the Run Alliance app. This project is built using Angular v18 and includes various dependencies such as PrimeNG, Chart.js, and more.

## Prerequisites

- Node.js (v14 or later)
- Angular CLI (v18 or later)

## Installation


### Clone the repository:
   ```bash
   git clone <repository-url>
   cd RunAlliance-front-angularv18
   ```

### Install the dependencies:
   ```npm install ```

### Development 

Start the development server: ``` npm start```

Open your browser and navigate to http://localhost:4200/.

### Build the project:
``` npm run build```

The build artifacts will be stored in the dist/run-alliance-front-angularv18 directory.

## Testing
Run the tests:
``` npm test```

## Dependencies
- Angular v18 
- PrimeNG v17.18.11 
- Chart.js v3.3.2 
- RxJS v7.8.0
- Zone.js v0.14.3

## Scripts

ng: Run Angular CLI commands.
start: Start the development server.
build: Build the project.
watch: Build the project and watch for changes.
test: Run the tests.

## Configuration
Development configuration:

Optimization: false
SourceMap: true
File replacements: environment.development.ts
Production configuration:

Budgets:
Initial: maximumWarning: 500kB, maximumError: 1MB
AnyComponentStyle: maximumWarning: 2kB, maximumError: 4kB
OutputHashing: all
License
This project is licensed under the MIT License.


