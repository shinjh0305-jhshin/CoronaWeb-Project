const express = require('express');
const bodyParser = require('body-parser'); //http request의 body를 파싱하는 기능
const { sequelize } = require('./database');
const globalStatController = require('./controller/global-stat.controller'); //컨트롤러 들고온다
const keyValueController = require('./controller/key-value.controller'); //컨트롤러 들고온다

async function launchServer() {
    const app = express(); //익스프레스 인스턴스
    app.use(bodyParser.json()); //application/json을 Content-Type로 갖는 요청의 바디를 파싱하도록 설정

    app.get('/', (req, res) => {
        res.json({ message : 'Hello CoronaBoard!'});
    })
    //이 부분이 API를 컨트롤러에 분배하는 '라우터' 부분이다.
    app.get('/global-stats', globalStatController.getAll); // /global-stats는 http://localhost:8080/global-stats에서 뒤에 들어가는 부분.
    app.post('/global-stats', globalStatController.insertOrUpdate);
    app.delete('/global-stats', globalStatController.remove);

    //key-value controller을 등록한다
    app.get('/key-value/:key', keyValueController.get);
    app.post('/key-value', keyValueController.insertOrUpdate);
    app.delete('/key-value/:key', keyValueController.remove);

    try {
        await sequelize.sync(); //객체 모델을 통해 DB의 테이블 스키마를 수정 혹은 생성한다.
        //sync 내부에는 force, alter 등의 매개변수가 올 수 있다.(https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-sync)
        console.log('Database is Ready to go!');
    } catch(error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }

    const port = process.env.PORT || 8080; //process.env.PORT가 값이 undefined일 경우 8080으로 포트를 지정한다.
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    })
}

launchServer();