//Server
import app from './app'; // app.js에서 http 객체 가져오기
require('dotenv').config();
// import port from './config/port.json';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`
    ==========================================
         🥰  ${port} server running!   🥰
    ==========================================
    `);
});