const Sequelize = require('sequelize');

const config = { //데이터베이스 연결 정보 설정 (굳이 안 만들어도 되나, 아래에서 일일히 써 줘야 한다.)
    host : process.env.CORONABOARD_MYSQL_HOST || '127.0.0.1', //실제 배포 시 설정하는 환경 변수 || localhost
    port : 3306, //MySQL 서버의 기본값
    database : 'coronaboard',
    user : 'coronaboard_admin',
    password : process.env.CORONABOARD_MYSQL_PASSWORD || '0000', //실제 배포 시환경 변수 값을 설정하고, 암호는 지운다.(보안 목적)
};

//https://sequelize.org/docs/v6/getting-started/ 참조
const sequelize = new Sequelize(config.database, config.user, config.password , {
    host : config.host,
    dialect : 'mysql',
});

module.exports = { //외부 모듈에서 사용할 수 있도록 내보내기
    sequelize,
    //생성 된 객체 모델(들)을 아래에 적는다
    GlobalStat: require('./global-stat.model')(sequelize),  //sequelize 인스턴스를 전달한다.
    KeyValue: require('./key-value.model')(sequelize)
}