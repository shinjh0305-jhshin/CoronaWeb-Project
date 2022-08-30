const fs = require('fs'); //파일 읽기 및 파일 쓰기 관련 모듈
const readline = require('readline'); //stdin에서 한 줄씩 입력받는 모듈
const { google } = require('googleapis'); //google API
const { GoogleAuth } = require('google-auth-library');

require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //필요한 scope(사용자한테 요구할 권한)를 전부 배열에 적는다.
const TOKEN_PATH = 'accessToken.json'; //사용자의 접근 권한 및 토큰을 저장할 파일명


class SheetApiClientFactory {
    static async create() { //OAuth 프로세스를 진행하는 메인 함수
        try {
            var credential = fs.readFileSync('credentials.json'); //동기적으로 파일을 읽는다
            console.log(credential);
        } catch (e) {
            console.log('★ 중요 : 보안을 위해 credentials 제거함. 다음 경로에서 "credentials.json"으로 다시 다운로드 요망 ★');
            console.log('https://console.cloud.google.com/apis/credentials?project=coronaboard-351810');
        }

        const auth = await this._authorize(JSON.parse(credential)); //읽은 내용을 바탕으로 OAuth 인증 실행
        return google.sheets({ version: 'v4', auth }) //생성된 OAuth 클라이언트로 구글 시트 API 클라이언트 생성
    }

    static async _authorize(credentials) { 
        const { client_secret, client_id, redirect_uris } = credentials.installed;

        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); //구글 OAuth 클라이언트 초기화

        if (!fs.existsSync(TOKEN_PATH)) { //사용자가 한 번도 로그인 한 적 없어서, 가져온 토큰이 없는 경우. 즉 최초상태.
            const token = await this._getNewToken(oAuth2Client);
            oAuth2Client.setCredentials(token); //access, refresh token 등록하기

            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
            console.log('Token stored to', TOKEN_PATH);

            return oAuth2Client;
        }

        //기존에 발급 받은 토큰이 있는 상태
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
    }

    static async _getNewToken(oAuth2Client) { //인증 코드를 발급받고, 이를 이용해 엑세스 토큰을 받는 코드
        const authUrl = oAuth2Client.generateAuthUrl({ //사용자에게 로그인 및 권한을 요청하는 창의 URL을 생성한다.
            access_type: 'offline', //refresh token을 받는다
            scope: SCOPES //scope 배열을 전달한다.
        });

        console.log('다음 URL을 브라우저에서 열어 인증을 진행하세요', authUrl);

        const rl = readline.createInterface({ //키보드 입력 대기
            input: process.stdin,
            output: process.stdout
        });

        const code = await new Promise((resolve) => {
            rl.question('인증이 완료되어 발급된 코드를 여기에 붙여넣으세요: ', (code) => {
                resolve(code);
            });
        });
        
        rl.close();

        //인증 토큰 발급
        const resp = await oAuth2Client.getToken(code);
        return resp.tokens;
    }
}

module.exports = SheetApiClientFactory;