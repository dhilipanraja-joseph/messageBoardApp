const PORT = process.env.PORT || 8000;

const getPost = require('./getPost');
const createPost = require('./createPost');
const deletePost = require('./deletePost');
const showPost = require('./showPost');
const modifyPost = require('./modifyPost');

const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(morgan('dev'));

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/',(req,res,err)=>{

  showPost((err,data) => {

    if(err) return res.status(400).send(err);

    else res.render('index',{"posts":data});
  });

});

app.get('/showPost',(req,res,err) => {

    showPost((err,data) => {

      if(err) return res.status(400).send(err);

      else res.send(data);

    });
});

app.post('/createPost',(req,res,err)=>{

    createPost(req.body,(err,data)=>{

      if(err) return res.status(400).send(err);

      else res.render('index',{"posts":data});
    });

});

app.put('/post/:id',(req,res,err)=>{

        var reqA=[req.params.id,req.body];

        modifyPost(reqA,(err,data)=>{

          if(err) return res.status(400).send(err);

          else res.render('index',{"posts" : data});
        });
});

app.delete('/post/:id',(req,res,err)=>{

        deletePost(req.params.id,(err,data)=>{

            if(err) return res.status(400).send(err);

            else res.render('index',{"posts" : data});
        });
});

app.get('/post/:id',(req,res,err)=>{

        getPost(req.params.id,(err,data)=>{

          if(err) return res.status(400).send(err);

          else res.send(data);

        });
});

app.listen(PORT , err => {

  console.log(err || `Server listening on port ${PORT}`);

});
