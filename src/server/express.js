//引入
const WXBizDataCrypt = require('./WXBizDataCrypt') // 解密手机号
const express=require("express");
const path = require('path');
const Mock = require('mockjs');
let bodyParser = require('body-parser');//解析,用req.body获取post参数
const multiparty = require('multiparty')
var ROOT_PATH = path.resolve(__dirname);
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target') // 大文件存储目录
const app=express();
//监听get请求 路由router 服务器根据客户端请求的地址和方式
//返回不同资源的方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
// 加载静态资源
app.use(express.static(path.join(__dirname,'dist')));
console.log('ROOT_PATH',ROOT_PATH)

function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
app.all('/*', setupCORS);
app.get("/index",(req,res)=>{
    console.log(req.query)
    /*
    let data = Mock.mock({
        'code':'200',
        'list|1-9':[{
            'key|+1':1,
            'title|1':['音位年轻就看见了看见了看见酷家乐聚隆科技拉开距离聚隆科技了极乐空间','Music LabMusic LabMusic LabMusic LabMusic LabMusic Lab','Music Cares','Tencent Music Connects','以乐之名，让爱有声'],
            'date|1':['2018-01-02-14:52:20','2019-01-02-14:52:20','2018-04-02-14:52:20'],
            'imgUrl|1':['http://zkres1.myzaker.com/202101/5ffacc796227680a93000183_640.jpg','https://img1.mklimg.com/g3/M00/40/12/rBBrEF1FSmuATlB-ABLwOoMvA5E840.jpg!',
            'https://img2.mklimg.com/g3/M00/40/14/rBBrEV1FSuSAb7nvAAd8IWNjPkY985.jpg!','https://img3.mklimg.com/g3/M00/40/12/rBBrEF1FSrWAU4I6AA0biFPQBl8825.jpg!'
            ,'https://img3.mklimg.com/g3/M00/40/14/rBBrEV1FSyuASnJQAAgU2rmY9Kc818.jpg!']
        }]
    })
    */
    // let list = [
    //         {title:'音位年轻',date:'2018-01-02-14:52:20',imgUrl:'https://img2.mklimg.com/g3/M00/40/12/rBBrEF1FSk-AMAyAABGBB0sz6iM398.jpg!'},
    //         {title:'Music Lab',date:'2019-01-02-14:52:20',imgUrl:'https://img1.mklimg.com/g3/M00/40/12/rBBrEF1FSmuATlB-ABLwOoMvA5E840.jpg!'},
    //         {title:'Music Cares',date:'2018-04-02-14:52:20',imgUrl:'https://img2.mklimg.com/g3/M00/40/14/rBBrEV1FSuSAb7nvAAd8IWNjPkY985.jpg!'},
    //         {title:'Tencent Music Connects',date:'2018-11-08-14:52:20',imgUrl:'https://img3.mklimg.com/g3/M00/40/12/rBBrEF1FSrWAU4I6AA0biFPQBl8825.jpg!'},
    //         {title:'以乐之名，让爱有声',date:'2019-01-02-14:52:20',imgUrl:'https://img3.mklimg.com/g3/M00/40/14/rBBrEV1FSyuASnJQAAgU2rmY9Kc818.jpg!'},
    //         {title:'一叶之秋',date:'2014-01-02-14:52:20',imgUrl:'https://img2.mklimg.com/g3/M00/40/15/rBBrEV1FS02AX_TEAAiBnOwm0Ws608.jpg!'},
    //     ]
    let data = {}
    let list = [
        {index:0,title:'公司与行研 | 80 元一只的口红，撑得起完美日记的野心吗？',imgUrl:'http://zkres2.myzaker.com/202101/5ff3caef8e9f0943b4063125_1024.jpg',url:'http://www.myzaker.com/article/5ff3caef8e9f0943b4063124'},
        {index:1,title:'告别北上广，我回农村当「顶流」',imgUrl:'http://zkres2.myzaker.com/202101/5ff3cabf8e9f09430e5ea39a_1024.jpg',url:'http://www.myzaker.com/article/5ff3cabf8e9f09430e5ea399'},
        {index:2,title:'为拼多多守边疆的女孩，凌晨倒在了 -20 ℃的冬夜',imgUrl:'http://zkres2.myzaker.com/202101/5ff326078e9f09229d7a51a1_1024.jpg',url:'http://www.myzaker.com/article/5ff3d0d08e9f0973480d83d0'},
        {index:3,title:'这届年轻人，为什么越挣钱越穷？',imgUrl:'http://zkres.myzaker.com/202101/5ff91e0f8e9f092f394c3efb_640.jpg',url:'http://www.myzaker.com/article/5ff91e0f8e9f092f394c3efa'},
        {index:4,title:'《LOL》、吃鸡之后，网游市场谁来扛大旗？',imgUrl:'http://zkres.myzaker.com/202101/5ff91f4a8e9f0962bf722cac_640.jpg',url:'http://www.myzaker.com/article/5ff91f4a8e9f0962bf722c9f'},
        {index:5,title:'虾米倒下，下一个是谁？',imgUrl:'http://zkres.myzaker.com/202101/5ff7bb0d8e9f0915a14b22d8_640.jpg',url:'http://www.myzaker.com/article/5ff7bb0d8e9f0915a14b22d6'},
        {index:6,title:'那些睡不着的年轻人',imgUrl:'http://zkres.myzaker.com/202101/5ff7bf36b15ec021284bb55e_640.jpg',url:'http://www.myzaker.com/article/5ff7bf36b15ec021284bb55d'}
        
    ]
    data.code = '200'
    data.list = list
    res.send(data);
})

app.get("/find",(req,res)=>{
    let result = null
    if (req.query.key) {
        result = contentList.filter((item,index)=>{
           return item.key === Number(req.query.key)
       })
    }else {
        result =[{key:0,title:'精选'},{key:1,title:'汽车'},{key:2,title:'国内'},{key:3,title:'科技'},{key:4,title:'军事'},{key:5,title:'娱乐'},{key:6,title:'理财'},{key:7,title:'电影'},{key:8,title:'社会'},{key:9,title:'健康'},{key:10,title:'美食'}]
    }
    let data = {
        code: '200',
        list: result
    }
    res.send(data)
})


let contentList = [
    {
        key:0,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253f2db8c1f31d73654656.png',title:'汽车频道',desc:'这是汽车频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ff051a25631f33c6dbd.png',title:'娱乐八卦',desc:'这是娱乐八卦频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253fa2b8c1f31d704fec4c.jpg',title:'体育频道',desc:'这是体育频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ec351a25632080c35ec.png',title:'科技频道',desc:'这是科技频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202002/5e54f065cfc6c33257669c37.jpg',title:'国内新闻',desc:'这是国内新闻'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ea6b8c1f31d8d13853c.jpg',title:'军事频道',desc:'这是军事频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/201909/5d78908c7c274f49b546ffa7.png',title:'投资理财',desc:'这是投资理财频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202002/5e58dcb1b8c1f3418e64f00f.png',title:'电影资讯',desc:'这是电影资讯频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253f60cfc6c32cf9415f49.png',title:'社会新闻',desc:'这是社会新闻频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/201908/5d5f9c477c274f38ea46dd24.png',title:'健康有术',desc:'这是健康有术频道'},
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e18001451a2564412403351.png',title:'美食频道',desc:'温故知新 | 如果常规口味的蛋糕卷已经不能满足你，那就来试试特别款咯,咸蛋黄流沙法式吐司，要试试吗？'}
        ]
    },
    {
        key:1,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253f2db8c1f31d73654656.png',title:'汽车频道',desc:'这是汽车频道'}
        ]
    },
    {
        key:2,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202002/5e54f065cfc6c33257669c37.jpg',title:'国内新闻',desc:'这是国内新闻'}
        ]
    },
    {
        key:3,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ec351a25632080c35ec.png',title:'科技频道',desc:'这是科技频道'}
        ]
    },
    {
        key:4,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ea6b8c1f31d8d13853c.jpg',title:'军事频道',desc:'这是军事频道'}
        ]
    },
    {
        key:5,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253ff051a25631f33c6dbd.png',title:'娱乐八卦',desc:'这是娱乐八卦频道'}
        ]
    },
    {
        key:6,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/201909/5d78908c7c274f49b546ffa7.png',title:'投资理财',desc:'这是投资理财频道'}
        ]
    },
    {
        key:7,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202002/5e58dcb1b8c1f3418e64f00f.png',title:'电影资讯',desc:'这是电影资讯频道'}
        ]
    },
    {
        key:8,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e253f60cfc6c32cf9415f49.png',title:'社会新闻',desc:'这是社会新闻频道'}
        ]
    },
    {
        key:9,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/201908/5d5f9c477c274f38ea46dd24.png',title:'健康有术',desc:'这是健康有术频道'}
        ]
    },
    {
        key:10,
        arrayList:[
            {imgSrc:'https://mp-video.myzaker.com/image/202001/5e18001451a2564412403351.png',title:'美食频道',desc:'温故知新 | 如果常规口味的蛋糕卷已经不能满足你，那就来试试特别款咯,咸蛋黄流沙法式吐司，要试试吗？'}
        ]
    }
]

app.post("/api/login",(req,res)=>{
    console.log(JSON.stringify(req.body))
    console.log(req.body)
    const {username,password} = req.body
    if (username === 'admin' && password === '123') {
        let data = {code:'200',content:'登录成功',name:username}
        res.send(data);
    }else {
        let data = {code:'201',content:'用户名或密码错误'}
        res.send(data);
    }
})

app.post("/api/decrypt",(req,res)=>{
    console.log(JSON.stringify(req.body))
    // console.log(req.body)
    const {appId,encryptedData,iv,sessionKey} = req.body
    let pc = new WXBizDataCrypt(appId, sessionKey)
    let data = pc.decryptData(encryptedData , iv)
    res.send(data)
})
//设置监听的端口 和 域名  RESTFUL API 风格
//get 查询 获取post 提交 插入 put 更新 delete 删除
var server = app.listen(5001,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('host:', host)
    console.log('listen at http://%s:%s',host,port)
})
