const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://dalton:redesocial@cluster0.vvxkwgx.mongodb.net/?retryWrites=true&w=majority");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("unifor");
  return global.db;
}

const express = require('express');
const app = express();        
const port = 3000; //porta padrão

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));



// API usuario

// GET
router.get('/user/:id?',async function(req, res, next){
  try {
      const db = await connect();
      if (req.params.id) {
          res.json(await db.collection("user").findOne({_id: new ObjectId(req.params.id)}));
      } else {
          res.json(await db.collection("user").find().toArray());
      }
  } catch (ex) {
      
  }
})

router.get('/user/senha/:senha',async function(req, res, next){
  try {
      const db = await connect();
      const senha = req.params.senha; // Obter o valor do parâmetro senha
      res.json(await db.collection("user").findOne({ senha: senha }));
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

// POST
router.post('/user', async function(req, res, next){
  try {
      const user = req.body;
      const db = await connect();
      res.json(await db.collection("user").insertOne(user));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})

// PUT
router.put('/user/:id', async function(req, res, next){
  try {
      const user = req.body;
      const db = await connect();
      res.json(await db.collection("user").updateOne({_id: new ObjectId(req.params.id)},{$set: user}));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})


// DELETE
router.delete('/user/:id', async function(req, res, next){
  try {
      const db = await connect();
      res.json(await db.collection("user").deleteOne({_id: new ObjectId(req.params.id)}));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})
// Fim API user



//API mesa

// GET
router.get('/mesas/:id?',async function(req, res, next){
  try {
      const db = await connect();
      if (req.params.id) {
          res.json(await db.collection("mesas").findOne({_id: new ObjectId(req.params.id)}));
      } else {
          res.json(await db.collection("mesas").find().toArray());
      }
  } catch (ex) {
      
  }
})


// POST
router.post('/mesas', async function(req, res, next){
  try {
      const mesas = req.body;
      const db = await connect();
      res.json(await db.collection("mesas").insertOne(mesas));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})

// PUT
router.put('/mesas/:id', async function(req, res, next){
  try {
      const mesas = req.body;
      const db = await connect();
      res.json(await db.collection("mesas").updateOne({_id: new ObjectId(req.params.id)},{$set: mesas}));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})


// DELETE
router.delete('/mesas/:id', async function(req, res, next){
  try {
      const db = await connect();
      res.json(await db.collection("mesas").deleteOne({_id: new ObjectId(req.params.id)}));
  } catch (ex) {
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
  }
})
// Fim API user

app.use('/', router);

app.listen(port);
console.log('API funcionando');