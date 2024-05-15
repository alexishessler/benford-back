// Do not forget to import with .js extensions when importing files
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import router from './router/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api',router)

const PORT = process.env.PORT || 5000,
serverStartingString = `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    colors.disable();
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
        }
    )
} else {
    colors.enable();
    console.log(`
        ${'Are'.blue} 
        ${'you'.white} 
        ${'colorblind?'.red} 
        ${'>'.cyan} 
        ${'Let\'s dev!'.rainbow}
    `)
    app.get('/', (req, res) => {
        res.send(serverStartingString);
    })
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(serverStartingString))