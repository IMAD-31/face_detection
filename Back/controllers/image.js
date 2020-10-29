
const Clarifai = require ('clarifai');
const app = new Clarifai.App({
    apiKey: '26e0d109dff54f6fb71a66fd86402685'
   });
   const handleApiCall = (req, res) => {
   
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>
     { 
        res.json(data);

   })
   }

const handleImage = (req, res, db) =>{
    const {id}=req.body;
db('users')
.where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(user=>{
 res.json(user[0])

})
.catch(err=>res.status(404).json('unable to get entries'))}

module.exports = {
    handleImage,
    handleApiCall
  };