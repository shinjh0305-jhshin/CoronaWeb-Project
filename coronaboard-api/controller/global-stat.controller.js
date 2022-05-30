//컨트롤러는 요청을 받고, 요청에 맞게 비즈니스 로직을 수행한 뒤 다시 응답을 돌려 주는 역할을 하는 코드다.

//require는 해당 디렉터리의 index.js 파일의 코드를 읽어들인다.
const { GlobalStat } = require('../database'); //객체 모델 가져오기. Sequelize ORM에서 제공하는 기능을 사용한다.
const { wrapWithErrorHandler } = require('../util'); //에러 처리기 가져오기.

//REST API에서 컨트롤러 구현하기
async function getAll(req, res) { //모든 데이터를 반환한다.
    const result = await GlobalStat.findAll(); //SQL의 SELECT에 해당
    res.status(200).json({ result });
}

async function insertOrUpdate(req, res) { 
    const { cc, date } = req.body;
    if (!cc || !date) {
        res.status(400).json({ error: 'cc and date are required'});
        return ;
    }

    //조건에 해당하는 데이터가 있는지 확인한다
    const count = await GlobalStat.count({ where : {cc, date}}); //SQL의 SELECT로 검색된 레코드의 개수 반환

    if (count == 0) {
        await GlobalStat.create(req.body); //SQL의 insert에 해당
    } else {
        await GlobalStat.update(req.body, {where: {cc, date}}); //SQL의 UPDATE에 해당
    }

    res.status(200).json({result : 'success'});
}

async function remove(req, res) {
    const { cc, date } = req.body;
    if (!cc || !date) {
        res.status(400).json({ error : 'cc and date are required' });
        return;
    }
    await GlobalStat.destroy({ where : { cc, date }}); //SQL의 DELETE에 해당

    res.status(200).json({result: 'success'});
}

module.exports = wrapWithErrorHandler({ //에러 처리기를 한방에 연결한다.
    getAll, insertOrUpdate, remove
});


