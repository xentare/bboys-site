/**
 * Created by Juha on 23/01/16.
 */

var User = require('../models/user');
var Invite = require('../models/invitation')
var bcrypt = require('bcrypt');
var hashes = require('../helpers/hashes');

module.exports = function (app) {

    app.post('/api/register', function (req, res, next) {
        var params = req.body;
        console.log(params);
        Invite.findOne({
            key: params.apiKey
        }, function (err, invitation) {
            if (!invitation) {
                res.status(400).send({
                    msg: 'Invalid apikey',
                    success: false
                });
                next();
            } else if (invitation.key == params.apiKey) {
                Invite.remove({
                    key: params.apiKey
                });
                if (!params.username || !params.password) {
                    res.status(400).send({
                        msg: 'All required parameters were not received.',
                        success: false
                    });

                    next();
                } else {
                    User.findOne({
                        username: params.username
                    }, function (err, user) {
                        if (user) {
                            res.status(400).send({
                                msg: 'Username already in use',
                                data: user,
                                success: false
                            });
                            next();
                        } else {
                            var md5 = hashes.random('md5');
                            var hash = bcrypt.hashSync(params.password, 10);

                            User.create({
                                username: params.username,
                                password: hash,
                                apiKey: md5
                            }, function (err, user) {
                                //console.log(user);
                                if (err) {
                                    res.status(400).send({
                                        success: false,
                                        err: err
                                    });
                                    next();
                                } else {
                                    res.status(200).send({
                                        success: true
                                    });
                                    next();
                                }
                            });
                        }

                    });
                }
            }
        });

    });


};
