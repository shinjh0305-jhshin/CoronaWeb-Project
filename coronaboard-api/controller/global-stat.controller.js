const { GlobalStat } = require('../database'); //객체 모델 가져오기

//REST API에서 컨트롤러 구현하기
async function getAll(req, res) {
    const result = await GlobalStat.findAll(); //SQL의 SELECT에 해당
    res.status(200).json({ result });
}

async function insertOrUpdate(req, res) {
    const { cc, date } = req.body;
    if (!cc || !date) {
        res.status(400).json({ error: 'cc and date are required'});
        return ;
    }

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

module.exports = { getAll, insertOrUpdate, remove };


