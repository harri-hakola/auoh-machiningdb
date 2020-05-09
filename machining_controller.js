const machining_model = require('./machining_model');


const machining_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate,
    };
    return data;
};

//Lisää parametrisetti
const api_post_parameter = (req, res, next) => {
    console.log('api_post_parameter');
    let data = machining_data(req);

    let new_parameter = machining_model(data);

    new_parameter.save().then(() => {
        console.log(new_parameter);
        res.send(JSON.stringify(new_parameter));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

//Hae kaikki parametrisetit
const api_get_parameters = (req, res, next) => {
    console.log('api_get_parameters');

    machining_model.find({})
        .lean()
        .then(parameters => {
            res.send(JSON.stringify(parameters));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

//Hae parametrisetti ID:llä
const api_get_parameter = (req, res, next) => {
    let id = req.params.id; 
    machining_model.findById(id)
        .then(parameters => {
            res.send(JSON.stringify(parameters));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

//Päivitä parametrisetti
const api_put_parameter = (req, res, next) => {
    let id = req.params.id;
    let data = machining_data(req);

    machining_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((parameter) => {
        res.send(parameter);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

//Poista parametrisetti
const api_delete_parameter = (req, res, next) => {
    let id = req.params.id;
     machining_model.findByIdAndRemove(id).then(() => {
         res.send();
     }).catch(err => {
         res.status(500);
         res.send(err.errmsg);
         console.log(err);
     });
};


// EXPORTS
module.exports.api_post_parameter = api_post_parameter;
module.exports.api_get_parameters = api_get_parameters;
module.exports.api_get_parameter = api_get_parameter;
module.exports.api_put_parameter = api_put_parameter;
module.exports.api_delete_parameter = api_delete_parameter;