var express = require('express');
var router = express.Router();
//引入crypto模块和user.js文档
var crypto=require('crypto');
var User=require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog' });
});
router.get('/user',function(req,res){
     res.send('woshinimabi');
});
router.get('/login',function(req,res){
    res.render('login',{
    	title:'用户登录'
    });
});
router.get('/logout',function(req,res){
    console.log(req.query.name);
});
router.get('/reg',function(req,res){
     res.render('reg',{
     	title:'用户注册'});
});
router.post('/login',function(req,res){

});
router.post('/reg',function(req,res){
    var name=req.body.name;
    var password=req.body.password;
    var password_re=req.body['password-repeat'];
    //检验两次输入的密码是否相同
    if(password!=password_re){
        console.log('两次输入的密码不一致');
    	req.flash('error','两次输入的密码不一致');
    	return res.redirect('/reg');
    }
    //生成md5值
    var md5=crypto.createHash('md5');
    var password=md5.update(req.body.password).digest('base64');
    var newUser=new User({
    	name:req.body.name,
    	password:password
    });
    //检查用户名是否存在
    User.get(newUser.name,function(err,user){
    	if(err){
    		req.flash('error',err);
            console.log("err");
    		return res.redirect('/');
    	}
    	if(user){
    		req.flash('error','用户已经存在!');
    		return res.redirect('/reg');//返回注册页
    	}
    	//如果不是用户就新增用户
    	newUser.save(function(err,user){
    		if(err){
    			req.flash('error',err);
    			return res.redirect('/reg');
    		}
    		req.session.user=newUser;
    		req.flash('success','注册成功');
    		return res.redirect('/');
    	});

    });
});
router.post('/post',function(req,res){

});

module.exports = router;
