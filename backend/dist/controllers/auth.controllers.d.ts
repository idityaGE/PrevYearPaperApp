import express from 'express';
export declare const signup: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const sendEmail: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const verifyOTP: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const resendOTP: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const signin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controllers.d.ts.map