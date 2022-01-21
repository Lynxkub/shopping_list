const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');



router.get('/items' , (req , res) => {
    return res.json(items);
})

router.post('/add' , (req , res) => {
   items.push(req.body);
   return res.status(201).json({added : `{${req.body.name} : ${req.body.price}}`});
})


router.get('/items/:name' , (req , res) => {
    const item = items.find(el => el.name === req.params.name)
    res.send(item);
})


router.patch('/items/:name' , (req , res) => {
    let item = items.find(el => el.name === req.params.name);
    const changes = req.body;
    item.name = changes.name;
    item.price = changes.price;
    res.status(201).send(item);
})

router.delete('/items/:name' , (req , res) => {
    let item = items.find(el => el.name === req.params.name);
    items.splice(item , 1);
    return res.json({message: "Deleted"})
})

module.exports = router;




