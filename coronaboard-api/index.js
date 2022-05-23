const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //익스프레스 인스턴스

app.use(bodyParser.json()); //application/json을 Content-Type로 갖는 요청의 바디를 파싱

app.get('/', (req, res) => {
    res.json({ message : 'Hello CoronaBoard!'});
})

const port = process.env.PORT || 8080; //process.env.PORT가 값이 undefined일 경우 8080으로 포트를 지정한다.
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
