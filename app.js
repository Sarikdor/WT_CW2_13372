const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()

// const getPug = (url) => {
//     const pugPath = path.join(__dirname, "pages", url);
//     const pug = fs.readFileSync(pugPath, { encoding: "utf-8" });
//     return pug;
//   };
  
//   const reqHandler = (req, res) => {
//     if (req.url === "/") {
//       res.send(getPug("home.pug"));
//     }
//     res.send(getPug(req.url.slice(1) + ".pug"));
//   };
  
//   const urls = ["/create-order", "/meals", "/order", "/drinks", "/"];
  
//   for (let url of urls) {
//     server.get(url, reqHandler);
//   }
  
//   server.get("*", (req, res) => {
//     if (req.url === "/auth/login") {
//       res.send(
//         "<form><input type='email' placeholder='Email'/> <input type='password' placeholder='Password'></form>"
//       );
//     }
//   });

server.set('view engine', 'pug')
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.use('/meals', require('./routes/meals.routes'))

server.get('/', (req, res) => {
    res.render('home', { title: 'Home' })
})

server.get('/create-order', (req, res) => {
    res.render('create-order', { title: 'Add meal to the menu' })
})

  const PORT = 8000;
  server.listen(PORT, () => {
    console.log(`This app listening on port ${ PORT }`)
})
