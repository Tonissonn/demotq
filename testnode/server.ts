import express from 'express';
import bodyParser from 'body-parser';
import { addMail,getMail,getMails,delMail,updMail} from './index';

const app = express();
const PORT = 3001;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
   extended: true
 }));
 app.use(bodyParser.json());

 app.get('/test', (req, res) => {

   res.send('RIP');
 });
 
app.get('/:id', (req, res) => {

  res.send(getMail(parseInt(req.params.id)));
});

app.get('/', (req, res) => {

   res.send(getMails());
 });


app.post('/', (req, res) => {
  const { from, date, to } = req.body;
  console.log(req.body)
  if (!from?.trim() || !date?.trim()) {
      console.log(from,date,to)
    return res.status(400).send('Bad fields');
  }
  addMail({ from, date, to });
  res.status(201).send('Mail added');
});

app.delete('/:id', (req, res) => {
   let result = delMail(parseInt(req.params.id));
   if(!result){
      console.log("Failed to delete")
      return res.status(400).send("Invalid index");
   }
   console.log("Not failed to delete")
   res.status(201).send('Mail deleted');
 });

 app.put('/:id', (req, res) => {
   const { from, date, to } = req.body;
   console.log(req.body)
   let result = updMail({ from, date, to },parseInt(req.params.id));
   if(!result || !from?.trim() || !date?.trim()){
      console.log("Failed to update")
      return res.status(400).send("Invalid index");
   }
   res.status(201).send('Mail updated');
 });



app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});