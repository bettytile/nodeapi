const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req,res) => {
    res.render('user/addUser',{
        viewTitle: 'Add User'
    });
});

router.post('/', (req,res)=>{
    if(req.body._id == '')
        insertRecord(req,res );
        else
        updateRecord(req,res);

});
 
const insertRecord = (req,res)=>{
    const users = new User();
    users.firstName = req.body.firstName;
    users.lastName = req.body.lastName;
    users.email = req.body.email;
    users.phone = req.body.phone;
    users.save((err, doc)=>{
        if(!err){
            res.redirect('/user/list');
        }
        else {
            console.log('Error while inserting Record :' + err);
        }
    });
}
const updateRecord = (req,res)=>{
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc)=>{
        if(!err){
            res.redirect('user/list');

        }
        else{
            console.log('Update Error');
        }

    });
}
router.get('/list', (req,res) => {
    User.find((err,doc)=>{
        if(!err){
            res.render('user/list', {
                list: doc
            });
        }
        else{
            console.log('Error in retrieving employee list :' + err);
        }
    })
});

router.get('/:id', (req,res) => {
    User.findById(req.params.id,(err, doc) => {
        if(!err){
            res.render('user/addUser', {
                viewTitle: 'Update User',
                user: doc
            })
        }
    });
});

router.get('/delete/:_id', (req,res) =>{
    User.findByIdAndRemove(req.params._id, (err, doc) =>{
        if(!err){
            res.redirect('user/list');
        }
        else{
            console.log('Error Deleting the User :' + err);
        }
    })
});
module.exports = router;