const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Collection
router.get('/', async (req, res)=> {
    const posts = await tryConnect(); 
    res.send(await posts.find({}).toArray());
});

// Add Collection
router.post('/', async(req, res) => {
    const coll = await tryConnect(); 
    await coll.insertOne({
        text: req.body.text, 
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Collection
router.delete('/:id', async (req, res) => {
    const coll = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function tryConnect(){
    const client = await mongodb.MongoClient.connect
    ('mongodb://localhost:27017/Test', {
        useNewUrlParser: true
    });
    
    return client.db('Test').collection('Collection');
}

module.exports = router; 