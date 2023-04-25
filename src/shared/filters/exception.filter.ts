import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../response/http.response';
import { HttpException } from './exceptions/http-exception';

export default function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    // Obtener la información del error
    const status = err instanceof HttpException ? err.status : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err instanceof HttpException ? err.message : err.message;
    console.log(err)
    // Registrar el error en los registros (logs)
    console.error(`[${new Date().toISOString()}] ${status} - ${message}`);

    // Enviar una respuesta en formato REST
    res.status(status).json({
        timestamp: new Date().toISOString(),
        path: req.route.path,
        error: {
            message: message,
        }
    });
}
