//국가별 통계 데이터를 저장하고 불러오는 API

const { DataTypes } = require('sequelize'); //이 sequelize는 node_modules에 들어있는 모듈을 의미한다.

module.exports = (sequelize) => { //이 sequelize가 index.js에서 전달한 sequelize 객체를 의미한다.
    return sequelize.define (
        'GlobalStat', //객체 모델 이름
        { //모델의 속성 목록
            id : { //ID
                autoIncrement: true, //값 자동 증가
                type : DataTypes.INTEGER.UNSIGNED, //부호 없는 양의 정수
                allowNull : false, //null 비허용
                primaryKey : true, //기본키로 지정
            },
            cc : { //국가 코드
                type : DataTypes.CHAR(2), //두 자리 문자로 지정
                allowNull : false,
            },
            date : { //날짜
                type : DataTypes.DATEONLY,
                allowNull : false,
            },
            confirmed : { //확진자 수
                type : DataTypes.INTEGER,
                allowNull : false,
            },
            death : { //사망자 수
                type : DataTypes.INTEGER,
                allowNull : true,
            },
            released : { //완치자 수
                type : DataTypes.INTEGER,
                allowNull : true,
            },
            tested : { //총 검사자 수
                type : DataTypes.INTEGER,
                allowNull : true,
            },
            testing : { //검사중 수
                type : DataTypes.INTEGER,
                allowNull : true,
            },
            negative : { //결과 음성 수
                type : DataTypes.INTEGER,
                allowNull : true,
            },
        },
        {//추가 옵션
            sequelize, //시퀄라이즈 인스턴스
            tableName : 'GlobalStat', //DB에서 테이블의 이름
            indexes : [ //테이블 인덱스
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{ name: 'id'}],
                },
                {
                    name : 'ccWithDate',
                    unique : true,
                    fields : [{name : 'cc'}, {name: 'date'}],
                },
            ],
            timestamps : false, //타임스탬프 속성 자동으로 생성 안한다.

        }
    )
}