#DEPENDENCIES PROD
npm install class-validator class-transformer cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript

#DEPENDENCIES DEV 
npm install -D @types/cors @types/express @types/morgan concurrently nodemon

#TYPESCRIPT
npx tsc --init

#ATRIBUTES TYPESCRIPT
"strictPropertyInitialization": true,   
"experimentalDecorators": true, 
"outDir": "./dist",         
"emitDecoratorMetadata": true

#GENERAR LA MIGRACION DE A LA BASE DE DATOS
npm run m:gen -- src/migrations/<Nombre Migracion>

#APLICARs LA MIGRACION DE A LA BASE DE DATOS
npm run m:run