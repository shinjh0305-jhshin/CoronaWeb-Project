//크롤링 된 결과를 저장 할 API를 호출한다
const axios = require('axios');

class ApiClient {
    constructor() {
        const client = axios.create({
            baseURL: process.env.CB_API_BASE_URL || 'http://localhost:8080'
        })

        /**
         * interceptors는 http request, response를 가로채서 어쩌구저쩌구 일을 진행한다.
         * 만약 모든 response, request에 대해서 해야 할 일이 각각 같다면, 굳이 여러 번 적을 필요가 없다.
         * 즉, request에서는 응답을 보내기 전에 처리를 할 내용을 적고
         * response에서는 응답을 받은 직후 처리 할 내용을 적는다.
         */
        client.interceptors.response.use((resp) => {
            return resp.data; //실제 응답 바디에 해당하는 객체를 바로 반환한다.
            //인터셉터가 없으면, 모든 request 부분에 resp.data를 적어야 한다. 코드 유지 보수에 매우 애로사항이 생긴다.
        })
        
        this.client = client;
    }

    async upsertGlobalStat(data) {
        return await this.client.post('global-stats', data);
    }

    async upsertKeyValue(key, value) {
        return await this.client.post('key-value', {
            key,
            value
        });
    }
}

module.exports = ApiClient;