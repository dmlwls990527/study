const express=require('express')
const app=express()
const port=1234
let db=new Map();
let youtuber1={
    channelTitle : "a",
    sub : "54.8만명",
    videoNum : "532개"
}
let youtuber2={
    channelTitle : "b",
    sub : "1090만명",
    videoNum : "2222개"
}
let youtuber3={
    channelTitle : "c",
    sub : "1234658만명",
    videoNum : "51231개"
}
let id=1;
db.set(id++,youtuber1)
db.set(id++,youtuber2)
db.set(id++,youtuber3)
app.use(express.json())
app.post('/add', (req, res) => {
    const newId = id++;
    db.set(newId, req.body);
});
app.get('/youtubers', function(req, res) {
    res.json(Array.from(db.values() ));
});




app.get('/youtuber/:id',function(req,res){
    let {id}=req.params;
    id=parseInt(id);
    const youtuber=db.get(id);

    if(youtuber==undefined){
        res.send({
            message : " 유튜버 정보를 찾을 수 없습니다."
        })
    }else{
        res.send(youtuber)
    }
})
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

