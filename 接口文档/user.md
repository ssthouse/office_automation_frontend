# 登录页面

###发起登录请求:
```JSON
{  
   "username":"sst",
   "age":"22",
   "isAdmin":false
}
```

* **username** 用户名
* **password** 密码
* **isAdmin** 时候以管理员账户登录


###获取用户数据

####url:
` /user get`
####返回Json:

```JSON
{
    "ok": false,
    "user": {
        "id": 1,
        "username": "ssthouse",
        "password": "ssthouse",
        "name": "沈顺天",
        "gender": "male",
        "phoneNumber": "18771037960",
        "description": "android developer",
        "department": "wap ShangHai",
        "isAdmin": false
    }
}
```


###修改用户数据
####请求json:
不一定要包含所有字段, 只需要包含想要修改的字段, 剩下的字段留空

```JSON
{
   "id": 1,
   "username": "ssthouse",
   "password": "ssthouse",
   "name": "沈顺天",
   "gender": "male",
   "phoneNumber": "18771037960",
   "description": "android developer",
   "department": "wap ShangHai",
   "isAdmin": false
}
```

####返回json:
response是一个简单的json数据, 表示请求时候成功

```JSON
{
    "ok": true
}
```



