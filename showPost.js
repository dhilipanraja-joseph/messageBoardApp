const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname,'./public/data.json');

module.exports = function(cb){
  let data;
  fs.readFile(dataFilePath,(err,buffer)=>{
    if (err) return cb(err);

    try{
      data=JSON.parse(buffer);
    }catch(err){
      return cb(err);
    }

    cb(null , data);
  });
}
