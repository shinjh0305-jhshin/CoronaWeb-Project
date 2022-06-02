//Gatsby의 Node API를 사용한다.
//createPage()라는 후크 함수에서 데이터베이스에서 글을 불러온 후, 개수만큼 createPage()함수를 호출하여 그 개수만큼 정적 페이지를 만든다.
//후크 함수는 개츠비의 빌드 과정에서 자동으로 호출된다.
const { getDataSource } = require('./src/data-loader');


exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const dataSource = await getDataSource(); //국가, 어제/오늘 데이터를 불러온다.

    createPage({
        path: '/', //url이 들어간다
        component: require.resolve('./src/templates/single-page.js'), //그냥 require과는 달리 모듈이 아닌 전체 페이지를 가져온다.
        context: { dataSource } //렌더링 시 사용할 데이터. single-page.js에 인자로 전달된다.
    });
};