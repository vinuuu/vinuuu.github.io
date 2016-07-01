var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var uuid = require('node-uuid');
var routes = require('./routes/index');
var users = require('./routes/users');
var _ = require("underscore");
var async = require('async');
//var getjsondata = require('./public/Database/data');
var moment = require('moment');
var app = express();
var imageidir='/images/';
var imagealbumdir='Album';
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(multiparty({
//     uploadDir: './public/Database/images'
// }));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var imagepath='public/Database/images';
routes.get('/api/getFiles', multipartyMiddleware, function(req, res) {
    var imagepath='public/Database/images';
    var listofDir = _.sortBy(getDirsSync(imagepath)).reverse();
     imagepath=imagepath+'/'+req.query.MainFolderName;
  var FolderList=req.query.FolderList;
  var listofDirectories = _.sortBy(getDirsSync(imagepath)).reverse();
  console.log(listofDirectories[FolderList]);
  var getjsondata=getFiles((imagepath+'/'+listofDirectories[FolderList]+'/'),undefined,req.query.startIndex,req.query.endIndex);

  var TotalData={DirectoryName:listofDirectories[FolderList],Data:getjsondata.Data,TotalDir:listofDirectories.length,Total:getjsondata.Total,TotalDirectories:listofDir};
  res.send(TotalData);
  res.end();
});
routes.post('/api/registration', multipartyMiddleware, function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var name = req.body.name;
    console.log(req.body);
    getjsondata.data.push(req.body);
    fs.writeFile('./Database/data.json', JSON.stringify(getjsondata));
    fs.readFile(req.files.file[0].path, function(err, data) {
        var imageName = req.files.file[0].originalFilename;
        /// If there's an error
        if (!imageName) {
            console.log("There was an error");
            res.redirect("/");
            res.end();

        } else {
            var newPath = __dirname + imageidir + req.body.name + "/" + imageName;
            if (!fs.existsSync(__dirname + imageidir + req.body.name)) {
                fs.mkdirSync(__dirname + imageidir + req.body.name);
            }
            /// write file to uploads/fullsize folder
            fs.writeFile(newPath, data, function(err) {
                var userData = _.where(getjsondata.data, {
                    'name': name
                });
                var index = _.indexOf(getjsondata.data, userData[0]);
                console.log('indexvalue'+index);
                getjsondata.data[index].picture= imageidir + req.body.name + "/" + imageName;
                fs.writeFile('./Database/data.json', JSON.stringify(getjsondata));
                res.end();
            });
        }
    });
});

function getFiles (dir, files_,start,end){
    files_ = files_ || [];
    var files = fs.readdirSync(dir).map(function(v) {
                  return { name:v,
                           time:fs.statSync(dir + v).mtime.getTime()
                         };
               })
               .sort(function(a, b) { return a.time - b.time; }).reverse()
               .map(function(v) { return v.name; });
    console.log(files);
     for (var i=start-1;i<files.length;i++){
         if(i>=end){
             return {Data:files_,Total:files.length};
         }
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return {Data:files_,Total:files.length};
}



// Original function
function getDirsSync(srcpath) {
var now = moment().format("MM-DD-YYYY");
    console.log(now);
  return fs.readdirSync(srcpath).filter(function(file) {

    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getDirs(srcpath, cb) {
  fs.readdir(srcpath, function (err, files) {
    if(err) {
      console.error(err);
      return cb([]);
    }
    var iterator = function (file, cb)  {
      fs.stat(path.join(srcpath, file), function (err, stats) {
        if(err) {
          console.error(err);
          return cb(false);
        }
        cb(stats.isDirectory());
      });
    };
    async.filter(files, iterator, cb);
  });
}

routes.post('/api/uploadmultipleImage', multipartyMiddleware, function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    console.log(req.body.MainFolderName);
     var imagepath='public/Database/images';
     imagepath=imagepath+'/'+req.body.MainFolderName;
    //req.files.file.forEach(function(v, i) {
        fs.readFile(req.files.file.path, function(err, data) {
            //console.log(i);
            var imageName = req.files.file.originalFilename;

            /// If there's an error
            if (!imageName) {
                console.log("There was an error");
                res.redirect("/");
                res.end();
            } else {
                var name = moment().format("MM-DD-YYYY");
                var newPath = __dirname +"/"+ imagepath;
                var AlbumPath = __dirname +"/"+ imagepath +"/"+ name + "/"+ imageName;
                if (fs.existsSync(__dirname +"/"+ imagepath +"/"+ name)) {
                     if(fs.existsSync(__dirname +"/"+ imagepath +"/"+ name+"/"+ imageName)){
                         var filename = uuid.v4();
                         if(AlbumPath.split('.').length == 1){
                            AlbumPath = AlbumPath +filename+'.jpg';
                        }
                        else{
                            AlbumPath = AlbumPath.split('.')[0]+filename+'.'+AlbumPath.split('.')[1];
                        }

                     }
                     else{
                         if(AlbumPath.split('.').length == 1){
                             var filename1 = uuid.v4();
                            AlbumPath = AlbumPath +filename1+'.jpg';
                        }

                     }

                    fs.writeFile(AlbumPath, data, function (err) {
                    });
                } else {
                    fs.mkdirSync(__dirname +"/"+ imagepath +"/"+ name);
                    fs.writeFile(AlbumPath, data, function (err) {
                    });
                }

            }
        });
    //});
    res.end();
});

routes.post('/api/insertIdea', multipartyMiddleware, function(req, res) {
  var getjsondata = require('./public/Database/StickNotes/Data');
    var name = req.body.name;
    console.log(req.body);
    getjsondata.data.push(req.body);
    fs.writeFile('./public/Database/StickNotes/Data.json', JSON.stringify(getjsondata));
    console.log(getjsondata);
    res.end();
});

routes.get('/api/getIdeas', multipartyMiddleware, function(req, res) {
  var getjsondata = require('./public/Database/StickNotes/Data');
  res.send(getjsondata);
  res.end();
});
function GetDirsNew(dir){
    console.log(111);
 var files = fs.readdirSync(dir).map(function(v) {
                  return { name:v,
                           time:fs.statSync(dir + v).mtime.getTime()
                         };
               })
               .sort(function(a, b) { return a.time - b.time; }).reverse()
               .map(function(v) { return v.name; });
            console.log(files);
}
routes.get('/api/getDirs', multipartyMiddleware, function(req, res) {
  console.log(GetDirsNew('public/Database/images/'));
  res.end();
});
routes.get('/api/getslides', multipartyMiddleware, function(req, res) {
  var getjsondata = require('./public/Database/SlideShow/Data');
  res.send(getjsondata);
  res.end();
});
module.exports = app;
