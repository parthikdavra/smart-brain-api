const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '522348874a8246f0b8b9fe93b41780c7' 
});

const imageHandler = (req,res,db) =>{
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get count entries'))
}

const handleApiCall = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
    imageHandler:imageHandler,
    handleApiCall:handleApiCall
}