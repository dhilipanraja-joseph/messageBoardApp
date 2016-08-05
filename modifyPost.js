const fs = require('fs');
const path = require('path');
const moment = require('moment');
const showPost = require('./showPost');
const dataFilePath = path.join(__dirname,'./public/data.json');

module.exports = function(arr,cb){

  showPost((err,posts) => {

    if(err) return cb(err);

    else {

      var id = arr[0], obj = arr[1];
      var index = posts.findIndex(x => x.id === id);
      var post = posts[index];

      for (let key in post){
        post[key] = obj[key] || post[key];
      }

      post['modified_on'] = moment().format('MMMM Do YYYY, h:mm:ss a');
      posts[index] = post;
      cb(err,posts);
    }

    fs.writeFile(dataFilePath,JSON.stringify(posts),
      function(err){
        cb(err);
      }
    );
  });

}
