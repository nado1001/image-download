## 1.関連パッケージのインストール

`npm i`

## 2.使用方法

1.対象のURLを入れる  
`const url = ""`

2.必要に応じてユーザーエージェントを変更  
`// PC`  
`const userAgent = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';`

`// iPhone`  
`// const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4';`

`// Android`  
`// const userAgent = 'Mozilla/5.0 (Linux; Android 4.4.2; SH-01F Build/SA090) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36';`

3.不要な画像を省きたいときはquerySelectorにタグ名 or class名を入れる  
`await page.evaluate(() => {document.querySelector('header').remove()});`

4.以下のコマンドを実行  
`npm start`