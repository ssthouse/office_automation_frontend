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


