const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('data')) fs.mkdirSync('data');
const DB = 'data/memories.json';
if (!fs.existsSync(DB)) fs.writeFileSync(DB, '[]');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_,file,cb)=> cb(null, Date.now()+'-'+file.originalname)
});
const upload = multer({storage});

app.get('/api/memories', (_,res)=>{
  res.json(JSON.parse(fs.readFileSync(DB)).reverse());
});

app.post('/api/upload', upload.single('photo'), (req,res)=>{
  const all = JSON.parse(fs.readFileSync(DB));
  const mem = {
    id: Date.now().toString(),
    name: req.body.name,
    course: req.body.course,
    batch: req.body.batch,
    caption: req.body.caption,
    template: req.body.template || 'classic',
    photo: `/uploads/${req.file.filename}`,
    likes: Math.floor(Math.random()*80)+5,
    date: new Date().toLocaleDateString('en-IN')
  };
  all.push(mem);
  fs.writeFileSync(DB, JSON.stringify(all, null, 2));
  res.json(mem);
});

app.delete('/api/memories/:id', (req,res)=>{
  let all = JSON.parse(fs.readFileSync(DB));
  const found = all.find(m=>m.id===req.params.id);
  if(found && fs.existsSync('.'+found.photo)) try{fs.unlinkSync('.'+found.photo)}catch{}
  all = all.filter(m=>m.id!==req.params.id);
  fs.writeFileSync(DB, JSON.stringify(all, null, 2));
  res.json({ok:true});
});

app.listen(process.env.PORT || 5000,  () => 
  console.log('Vault running '));
});