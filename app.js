//when the size of our work become larger and larger,we need to  make our routes
//more clear, we need to move the control out of the route 



var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var mongoose=require('mongoose');
var mongoStore=require('connect-mongo')(session)// give it 'session' as a parameter to give it a start configuration
var dbUrl='mongodb://localhost/imooc';
var morgan=require('morgan');
mongoose.connect(dbUrl);

app.set('view engine','jade');
app.set('views',__dirname+'/app/view/pages');//because we change the framework, we also need to change this
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());//because session is based on cookieParser, so we need to use it
app.use(session({
  secret:'imooc',
  store: new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}));//by doing this, after refreshing website, user do not need to register again
app.locals.moment==require('moment');

if('development'===app.get('env')){// because when we develope we want to see more detailed information, so we want to do a configuration
  app.set('showStackError',true); 
  app.use(morgan(':method :url :status'));//it defines the format we want to see on the console, method+url+status
  app.locals.pretty=true;// let it be pretty when we want to see the HTML code
  mongoose.set('debug',true);//it will give us the detailed information about the databasse
}



require('./config/routes')(app);



app.listen(3000);
console.log('It is open on the port 3000');

