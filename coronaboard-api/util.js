//컨트롤러의 모든 함수를 일일히 try-catch를 적용하기에는 귀찮기에 여기서 한방에 처리한다.

//wrapWithErrorHandler가 전달해준 함수를 try-catch로 래핑하는 함수
const errorHandler = (block) => async (req, res) => { //block에는 컨트롤러 내의 각각 함수가 들어간다.(getAll, insertOrUpdate, remove)
    try {
        await block(req, res); //block에는 컨트롤러 내의 각각 함수가 들어간다.(getAll, insertOrUpdate, remove)
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

//컨트롤러의 각 함수를 받아서 try-catch로 래핑하러 보내는 역할을 하는 함수(중간 매개 함수)
const wrapWithErrorHandler = (obj) => { //컨드롤러의 각각 함수가 하나의 객체 안에 들어간 형태의 인수가 전달된다.
    Object.keys(obj).forEach((key) => { 
        obj[key] = errorHandler(obj[key]); //obj[key]는 key에 해당하는 이름을 갖는 함수 그 자체를 의미한다.
    });
    return obj; //try-catch로 래핑된 함수를 반환한다.
}

module.exports = {
    wrapWithErrorHandler
};