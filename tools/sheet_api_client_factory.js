const fs = require('fs'); //파일 읽기 및 파일 쓰기 관련 모듈
const readline = require('readline'); //stdin에서 한 줄씩 입력받는 모듈
const { google } = require('googleapis'); //google API

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //필요한 scope(사용자한테 요구할 권한)를 전부 배열에 적는다.
const TOKEN_PATH = 'accessToken.json'; //사용자의 접근 권한 및 토큰을 저장할 파일명

class SheetApiClientFactory {
    static async create() {
        const credential = fs.readFileSync('credentials.json'); //동기적으로 파일을 읽는다
        const auth = await this._authorize(JSON.parse(credential)); //읽은 내용을 바탕으로 OAuth 인증 실행
        return google.sheets({ version: 'v4', auth }) //생성된 OAuth 클라이언트로 구글 시트 API 클라이언트 생성
    }

    static async _authorize(credentials) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;

        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); //구글 OAuth 클라이언트 초기화

        if (!fs.existsSync(TOKEN_PATH)) { //사용자가 한 번도 로그인 한 적 없어서, 가져온 토큰이 없는 경우. 즉 최초상태.
            const token = await this._getNewToken(oAuth2Client);
            oAuth2Client.setCredentials(token);
        }
    }

    static async _getNewToken(oAuth2Client) {
        const authUrl = oAuth2Client.generateAuthUrl({ //사용자에게 로그인 및 권한을 요청하는 창의 URL을 생성한다.
            access_type: 'offline', //refresh token을 받는다
            scopes: SCOPES //scope 배열을 전달한다.
        });

        console.log('다음 URL을 브라우저에서 열어 인증을 진행하세요', authUrl);

        
    }
}