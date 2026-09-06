import app from './src/app.js';
import connectdb from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();    

connectdb()


app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});