//translation module with dynamic json storage
var i18n_Validation = new (require('i18n-2'))({
  // setup some locales - other locales default to the first locale
  locales: ['en_valiation']
});

i18n_Validation.setLocale('en_valiation');

module.exports = function (sequelize, DataTypes) {
  var myModel = sequelize.define("Purchase",
    {
        account_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        purchase_invoice_no: {
            type: DataTypes.STRING,  
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }          
        },
        purchase_invoice_date: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        frieght_type: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        mode_of_transport: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        vehicle_no: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        dispatched_through: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        term_of_payment: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        to_be_pay_upto_date: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        // pay_date: {
        //     type: DataTypes.DATE,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        // pay_amount: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        // pay_mode: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        // description: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        // settlement: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        // discount: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: {
        //             msg: i18n_Validation.__('required')
        //         },   
        //     }
        // },
        taxable_value: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        gst_amt: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
        tcs: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: i18n_Validation.__('required')
                },   
            }
        },
    },
    {
      tableName: 'purchases',
  });  
  myModel.getAllValues = function (req, res) {
    this.findAll({where: req.where})
        .then(function(results){
            res(results);
        })
    }    
    myModel.getFirstValues = function (req, res) {
        this.findOne({where: req.where}).then(function (results) {
            res(results);
        });
    }
    myModel.getAllValuesPaging = function (req, res) {
        this.findAndCountAll({
            where: req.where,
            offset: req.offset,
            limit: req.limit,
            order: 'id DESC',
        }).then(function (results) {
            console.log(results);
            res(results);
        });
    }
    myModel.saveAllValues = function (req, res) {
        if(req.body.order === ''){
            req.body.order = 0;
        }
        this.create(req.body).then(function (results) {
            results.headerStatus = true;
            res(results);
        }).catch(function (err) {
            console.log(err);
            var errors = err;
            errors.headerStatus = false;
            res(errors);
        });
    }
    myModel.updateAllValues = function (req, res) {
        if(req.body.order === ''){
            req.body.order = 0;
        }
        myModel.update(req.body, {where: {id: req.body.id}}).then(function (results) {
            results.headerStatus = true;
            res(results);
        }).catch(function (err) {
            console.log(err);
            var errors = err;
            errors.headerStatus = false;
            res(errors);
        });
    }
    myModel.deleteAllValues = function (req, res) {

        myModel.destroy({
            where: req.where
        }).then(function (results) {
            results.headerStatus = true;
            res(results);
        });
    }
    return myModel;
};