//데이터 양이 방대하지 않아서 별도의 테이블을 만들 정도는 아닌 데이터 저장하는 모델
//성병/나이대별 확진자 통계 저장 등에 사용할 예정
//global-stat.model.js와 정확히 똑같은 구조이므로, 해당 파일의 주석 참조.

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'KeyValue',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: false
            },
        },        
        {           
            sequelize,
            tableName: 'KeyValue',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{ name: 'id'}]
                },
                {
                    name: 'key',
                    unique: true,
                    fields: [{ name: 'key'}]
                }
            ]
        }
    )
}