const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const machining_controller = require('./machining_controller');

app.use(body_parser.json()); 
app.use(body_parser.urlencoded({
    extended: true
})); 

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); 


app.post("/machining-parameter-set", machining_controller.api_post_parameter);

app.get("/machining-parameter-sets", machining_controller.api_get_parameters);

app.get("/machining-parameter-set/:id", machining_controller.api_get_parameter); 

app.put("/machining-parameter-set/:id", machining_controller.api_put_parameter);

app.delete("/machining-parameter-set/:id", machining_controller.api_delete_parameter);


const database_uri = "mongodb+srv://server:N4GSeeH6EeYXAEM3@cluster0-pkrto.mongodb.net/machiningdb?retryWrites=true&w=majority"

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});