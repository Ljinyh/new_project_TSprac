import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/' ,(req: Request, res: Response , next: NextFunction) => {
    res.send("Backend server, Hello there!");
});

const port = 8080;
app.listen(port, () => {
    console.log(`
    ==========================================
         🥰   {port} server running!   🥰
    ==========================================
    `)
});