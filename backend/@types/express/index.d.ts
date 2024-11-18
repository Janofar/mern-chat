import { Types } from 'mongoose'; 

declare global {
  namespace Express {
    interface Request {
      user?: { _id: Types.ObjectId }; 
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string; 
    }
  }
}


export {};

