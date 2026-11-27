import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import companyRoutes from '../src/company/company.routes.js';
import { swaggerDocs, swaggerUi } from './swagger.js';
export function createApp() {
    const app=express();
    app.use(express.json({limit:'128kb'}),cors(),helmet());
    app.get('/health',(_req,res)=>res.json({status:'ok'}));
    app.use('/coperex/v1/auth',authRoutes);
    app.use('/coperex/v1/company',companyRoutes);
    app.get('/openapi.json',(_req,res)=>res.json(swaggerDocs));
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
    app.use((error,_req,res,_next)=>res.status(error.status===400?400:500).json({success:false,message:error.status===400?'Invalid JSON body':'Internal server error'}));
    return app;
}
export async function initServer() {
    if (!process.env.SECRETORPRIVATEKEY || process.env.SECRETORPRIVATEKEY.length<32) throw new Error('Set SECRETORPRIVATEKEY with 32 characters or more');
    await dbConnection();
    await Promise.all(Object.values(mongoose.models).map(model => model.init()));
    return createApp().listen(Number(process.env.PORT||3002),'127.0.0.1',()=>console.log('Coperex ready'));
}
