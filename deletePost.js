const fs = require('fs');
const path = require('path');
const showPost = require('./showPost');
const dataFilePath = path.join(__dirname,'./public/data.json');

module.exports = function(id,cb){

  showPost((err,posts) => {

    if(err) return cb(err);

    else {

        var index = posts.findIndex(x => x.id === id);
        posts.splice(index,1);
        cb(null,posts);
    }

    fs.writeFile(dataFilePath,JSON.stringify(posts),
      function(err){
        cb(err);
      }
    );
  });

}
