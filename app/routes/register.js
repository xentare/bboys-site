/**
 * Created by Juha on 23/01/16.
 */

var User = require('../models/user.js');
var bcrypt = require('bcrypt');

module.exports = function (app) {

    app.post('/api/register', function (req, res, next) {
       var params = req.body;

        if(!params.username || !params.password) {
            res.status(400).send({
                msg: 'All required parameters were not received.',
            });

            next();
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(params.password, salt, function (err, hash) {
                var user = new User({
                    username: params.username,
                    password: hash
                });

                User.save(user, function (err) {
                   if(err){
                       res.status(400).send({
                           success: false,
                           err: err
                       });
                   } else {
                       res.status(200).send({
                          success: true
                       });
                   }
                });

            })
        });

    });

};
