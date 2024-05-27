const express=require('express');
const app=express();
app.listen(1234);

let db=new Map();
var id=1
app.use(express.json()) //http 의 모듈 json 사용
//로그인

app.post('/login',function(req,res){


})

//회원가입
app.post('/join',function(req,res){
    const { userId, password, name, age, email } = req.body;

    // 모든 필수 필드가 존재하는지 확인
    if(!userId||!password||!name||!age||!email){
        return res.status(400).json({
            message : "필드 정보 누락"
        })
    }
    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({
            message: "유효하지 않은 나이입니다."
        });
    }
    db.set(id++,req.body)
   
    res.status(201).json({
        message : `${req.body.name}님 환영합니다.`
    })

})


//조회
app.get('/users/:id',function(req,res){
    let {id}=req.params;
    id=parseInt(id)
    
    const user=db.get(id);

    if(user==undefined){
        return res.status(404).json({
            message : "error"
        })
    }else{
        res.status(200).json({
            userId : user.userId,
            name : user.name,
            age : user.age,
            email : user.email
        })
    }
})
//탈퇴
app.delete('/users/:id',function(req,res){
    let {id}=req.params;
    id=parseInt(id)
    
    const user=db.get(id);
    if(user==undefined){
        return res.status(400).json({
            message : "error"
        })
    }else{
        db.delete(id);
        return res.status(200).json({
            message : "탈퇴 성공"
        })
    }

})