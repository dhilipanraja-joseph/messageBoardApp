const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const showPost = require('./showPost');
const moment = require('moment');
const dataFilePath = path.join(__dirname,'./public/data.json');

module.exports = function(messObj,cb){

  showPost((err,posts) => {

    if(err) return cb(err);

    else {
      messObj['created_on'] = moment().format('MMMM Do YYYY, h:mm:ss a');
      messObj['id'] = uuid.v4();
      posts.unshift(messObj);
      cb(null,posts);
    }

    fs.writeFile(dataFilePath,JSON.stringify(posts),
      function(err){
        cb(err);
      }
    );
  });

}
