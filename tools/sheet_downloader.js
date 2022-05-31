const fs = require('fs');
const path = require('path');

class SheetDownloader {
    constructor(apiClient) { //구글 시트 API 클라이언트가 전달된다.
        this.apiClient = apiClient;
    }

    /** 
     * 스프레드시트를 읽어 JSON 파일로 변환한다.
     * @param spreadsheetId 스프레드시트 ID
     * @param sheetName 시트 이름
     * @param filePath JSON 파일을 저장 할 경로
     */
    async downloadToJson(spreadsheetId, sheetName, filePath = null) {
        const res = await this.apiClient.spreadsheets.values.get({ //API에 GET request를 보낸다(Google Sheet API)
            spreadsheetId: spreadsheetId,
            range: sheetName
        })

        const rows = res.data.values; //안에 들어있는 내용을 가져온다(return : array)

        if (rows.length === 0) { //아무것도 없는 빈 시트였다...!
            console.error('No data found on the sheet');
            return {}; //빈 JSON 객체를 반환한다.
        }

        const object = this._rowsToObject(rows); //행 데이터들, 즉 내용을 객체로 만든다.

        if (filePath) { //파일 경로를 지정했다면, 그곳에 파일로 저장한다
            const jsonText = JSON.stringify(object, null, 2);

            const directory = path.dirname(filePath); 
            if (!fs.existsSync(directory)) { //전달받은 디렉토리가 존재하지 않는 경우 만든다.
                fs.mkdirSync(directory);
            }
            fs.writeFileSync(filePath, jsonText);
            console.log(`Written to ${filePath}`);
        }

        return object; //내용을 담은 객체를 리턴
    }   

    /**
     * 데이터를 객체로 만든다.
     * @param rows 안에 들은 내용, 즉 2차원 배열
     */

    _rowsToObject(rows) {
        const headerRow = rows.slice(0, 1)[0]; //열 제목을 딴다. [0]은 2차원 배열을 1차원으로 만들기 위한 트릭장치.
        const dataRows = rows.slice(1, rows.length); //나머지 내용을 가져온다

        return dataRows.map((row) => {
            const item = {};
            for (let i = 0; i < headerRow.length; i++) {
                const fieldName = headerRow[i];
                const fieldValue = row[i];
                item[fieldName] = fieldValue;
            }
            return item;
        })
    }
}

module.exports = SheetDownloader;