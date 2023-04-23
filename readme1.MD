#DEPENDENCIES PROD
npm install class-validator class-transformer cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript

#DEPENDENCIES DEV 
npm install -D @types/cors @types/express @types/morgan concurrently nodemon

#TYPESCRIPT
npx tsc --init

#ATRIBUTES
"strictPropertyInitialization": true,   
"experimentalDecorators": true, 
"outDir": "./dist",         
"emitDecoratorMetadata": true