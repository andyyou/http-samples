# HTTP transaction

Web/API 中 HTTP transaction 常用的資料傳遞格式：

* multipart/form-data
* application/x-www-form-urlencoded
* application/json

若 bodyParse 支援 `x-www-form-urlencoded` 通常會協助轉換資料

```bash
# array 通常會直接轉成 字串
$ curl -X POST -d 'array=[1]'
$ curl -X POST -d 'object={foo: "bar"}'

# 正確的格式 轉成 陣列
$ curl -X POST -d 'array[]=1'
# 物件的用法
$ curl -X POST -d 'object[foo]="bar"'
```

`application/json` 較無疑義，資料會轉成對於型別。

# 使用

```bash
$ npm i
$ npm run dev
```

瀏覽 `http://localhost:3000/ajax` 可觀察各 HTTP Client library 之結果。
API `http://localhost:3000` 可回傳資料經過 bodyParse 的結果與型別。

下面為 Express 搭配 [body-parser](https://github.com/expressjs/body-parser) 針對各種使用情況的解析結果：


# jquery

#### req

```js
$.post('/', {
  arr: ['1'],
  obj: {foo: 'bar'}
}, function (res) {
  console.log('jquery', res)
  document.querySelector('.jquery').innerHTML = JSON.stringify(res, null, 2)
})
```

#### res

```json
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.5",
    "accept-encoding": "gzip, deflate",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest",
    "referer": "http://localhost:3000/ajax",
    "content-length": "28",
    "cookie": "_ga=GA1.1.464076964.1491874291",
    "connection": "keep-alive",
    "cache-control": "max-age=0"
  },
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "params": {},
  "body": {
    "arr": [
      "1"
    ],
    "obj": {
      "foo": "bar"
    }
  },
  "types": {
    "arr": "array",
    "obj": {
      "foo": "string"
    }
  },
  "method": "POST",
  "xhr": true
}
```

# axios

#### req

```js
axios.post('/', {
  arr: ['1'],
  obj: {foo: 'bar'}
}).then(function (res) {
  console.log('axios', res)
  document.querySelector('.axios').innerHTML = JSON.stringify(res, null, 2)
})
```

#### res

```
{
  "data": {
    "status": 200,
    "headers": {
      "host": "localhost:3000",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.5",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json;charset=utf-8",
      "referer": "http://localhost:3000/ajax",
      "content-length": "33",
      "cookie": "_ga=GA1.1.464076964.1491874291",
      "connection": "keep-alive",
      "cache-control": "max-age=0"
    },
    "content-type": "application/json;charset=utf-8",
    "params": {},
    "body": {
      "arr": [
        "1"
      ],
      "obj": {
        "foo": "bar"
      }
    },
    "types": {
      "arr": "array",
      "obj": {
        "foo": "string"
      }
    },
    "method": "POST",
    "xhr": false
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
    "x-powered-by": "Express",
    "access-control-allow-origin": "*",
    "content-type": "application/json; charset=utf-8",
    "content-length": "643",
    "etag": "W/\"283-1xI0lEykHc+ZqZHYJxMg5w\"",
    "date": "Fri, 05 May 2017 06:26:20 GMT",
    "connection": "keep-alive"
  },
  "config": {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8"
    },
    "method": "post",
    "url": "/",
    "data": "{\"arr\":[\"1\"],\"obj\":{\"foo\":\"bar\"}}"
  },
  "request": {}
}
```
# fetch

#### req

```js
fetch('/', {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'default',
  body: JSON.stringify({
    arr: ['1'],
    obj: {foo: 'bar'}
  })
}).then(function (res) {
  return res.json()
}).then(function (data) {
  console.log('fetch', data)
  document.querySelector('.fetch').innerHTML = JSON.stringify(data, null, 2)
})
```

#### res

```json
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.5",
    "accept-encoding": "gzip, deflate",
    "content-type": "application/json",
    "origin": "http://localhost:3000",
    "referer": "http://localhost:3000/ajax",
    "content-length": "33",
    "connection": "keep-alive"
  },
  "content-type": "application/json",
  "params": {},
  "body": {
    "arr": [
      "1"
    ],
    "obj": {
      "foo": "bar"
    }
  },
  "types": {
    "arr": "array",
    "obj": {
      "foo": "string"
    }
  },
  "method": "POST",
  "xhr": false
}
```

# reqwest

#### req

```js
reqwest({
  url: '/',
  type: 'json',
  method: 'post',
  data: {
    arr: ['1'],
    obj: {
      foo: 'bar'
    }
  },
  success: function (res) {
    console.log('reqwest', res)
    document.querySelector('.reqwest').innerHTML = JSON.stringify(ress, null, 2)
  }
})
```

#### res

```json
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
    "accept": "application/json, text/javascript",
    "accept-language": "en-US,en;q=0.5",
    "accept-encoding": "gzip, deflate",
    "x-requested-with": "XMLHttpRequest",
    "content-type": "application/x-www-form-urlencoded",
    "referer": "http://localhost:3000/ajax",
    "content-length": "28",
    "cookie": "_ga=GA1.1.464076964.1491874291",
    "connection": "keep-alive",
    "cache-control": "max-age=0"
  },
  "content-type": "application/x-www-form-urlencoded",
  "params": {},
  "body": {
    "arr": [
      "1"
    ],
    "obj": {
      "foo": "bar"
    }
  },
  "types": {
    "arr": "array",
    "obj": {
      "foo": "string"
    }
  },
  "method": "POST",
  "xhr": true
}
```

# superagent

#### req

```js
superagent.post('/')
.send({
  arr: ['1'], 
  obj: {foo: 'bar'}
}).end(function (err, res) {
  console.log('superagent', res)
  document.querySelector('.superagent').innerHTML = JSON.stringify(res, null, 2)
})

```

#### res

```json
{
  "req": {
    "method": "POST",
    "url": "/",
    "data": {
      "arr": [
        "1"
      ],
      "obj": {
        "foo": "bar"
      }
    },
    "headers": {
      "content-type": "application/json"
    }
  },
  "xhr": {},
  "text": "{\"status\":200,\"headers\":{\"host\":\"localhost:3000\",\"user-agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0\",\"accept\":\"*/*\",\"accept-language\":\"en-US,en;q=0.5\",\"accept-encoding\":\"gzip, deflate\",\"content-type\":\"application/json\",\"referer\":\"http://localhost:3000/ajax\",\"content-length\":\"33\",\"cookie\":\"_ga=GA1.1.464076964.1491874291\",\"connection\":\"keep-alive\",\"cache-control\":\"max-age=0\"},\"content-type\":\"application/json\",\"params\":{},\"body\":{\"arr\":[\"1\"],\"obj\":{\"foo\":\"bar\"}},\"types\":{\"arr\":\"array\",\"obj\":{\"foo\":\"string\"}},\"method\":\"POST\",\"xhr\":false}",
  "statusText": "OK",
  "statusCode": 200,
  "status": 200,
  "statusType": 2,
  "info": false,
  "ok": true,
  "redirect": false,
  "clientError": false,
  "serverError": false,
  "error": false,
  "accepted": false,
  "noContent": false,
  "badRequest": false,
  "unauthorized": false,
  "notAcceptable": false,
  "forbidden": false,
  "notFound": false,
  "headers": {
    "x-powered-by": "Express",
    "access-control-allow-origin": "*",
    "content-type": "application/json; charset=utf-8",
    "content-length": "585",
    "etag": "W/\"249-U2O1c6ASnGJA1jDVcXKwNQ\"",
    "date": "Fri, 05 May 2017 07:02:51 GMT",
    "connection": "keep-alive"
  },
  "header": {
    "x-powered-by": "Express",
    "access-control-allow-origin": "*",
    "content-type": "application/json; charset=utf-8",
    "content-length": "585",
    "etag": "W/\"249-U2O1c6ASnGJA1jDVcXKwNQ\"",
    "date": "Fri, 05 May 2017 07:02:51 GMT",
    "connection": "keep-alive"
  },
  "type": "application/json",
  "charset": "utf-8",
  "links": {},
  "body": {
    "status": 200,
    "headers": {
      "host": "localhost:3000",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.5",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
      "referer": "http://localhost:3000/ajax",
      "content-length": "33",
      "cookie": "_ga=GA1.1.464076964.1491874291",
      "connection": "keep-alive",
      "cache-control": "max-age=0"
    },
    "content-type": "application/json",
    "params": {},
    "body": {
      "arr": [
        "1"
      ],
      "obj": {
        "foo": "bar"
      }
    },
    "types": {
      "arr": "array",
      "obj": {
        "foo": "string"
      }
    },
    "method": "POST",
    "xhr": false
  }
}
```

# curl

## multipart/form-data

#### req

```
curl -X POST -F 'arr=["1"]&obj' http://localhost:3000
```

#### res

```
{"status":200,"headers":{"host":"localhost:3000","user-agent":"curl/7.51.0","accept":"*/*","content-length":"143","expect":"100-continue","content-type":"multipart/form-data; boundary=------------------------1847739f679552e9"},"content-type":"multipart/form-data; boundary=------------------------1847739f679552e9","params":{},"body":{},"types":{},"method":"POST","xhr":false}
```

## application/x-www-form-urlencoded

#### req

```bash
$ curl -X POST -d 'arr=["1"]' http://localhost:3000
$ curl -X POST -d 'arr[]=1' http://localhost:3000
```

#### res

* 沒有轉 array

```json
{"status":200,"headers":{"host":"localhost:3000","user-agent":"curl/7.51.0","accept":"*/*","content-length":"9","content-type":"application/x-www-form-urlencoded"},"content-type":"application/x-www-form-urlencoded","params":{},"body":{"arr":"[\"1\"]"},"types":{"arr":"string"},"method":"POST","xhr":false}
```

* 有轉 array

```json
{"status":200,"headers":{"host":"localhost:3000","user-agent":"curl/7.51.0","accept":"*/*","content-length":"7","content-type":"application/x-www-form-urlencoded"},"content-type":"application/x-www-form-urlencoded","params":{},"body":{"arr":["1"]},"types":{"arr":"array"},"method":"POST","xhr":false}
```

## application/json

#### req

```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"arr": []}' http://localhost:3000
```

#### res

```
{"status":200,"headers":{"host":"localhost:3000","user-agent":"curl/7.51.0","accept":"*/*","content-type":"application/json","content-length":"11"},"content-type":"application/json","params":{},"body":{"arr":[]},"types":{"arr":"array"},"method":"POST","xhr":false}
```
# postman

## multipart/form-data

#### req

```
arr: "['1']"
```

#### res

```
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "139",
    "postman-token": "64cdc091-defb-aeb3-aa36-177afda72baf",
    "cache-control": "no-cache",
    "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
    "content-type": "application/x-www-form-urlencoded",
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
  },
  "content-type": "application/x-www-form-urlencoded",
  "params": {},
  "body": {
    "------WebKitFormBoundaryDj56fhAvxBBTexz1\r\nContent-Disposition: form-data; name": "\"arr\"\r\n\r\n['1']\r\n------WebKitFormBoundaryDj56fhAvxBBTexz1--\r\n"
  },
  "types": {
    "------WebKitFormBoundaryDj56fhAvxBBTexz1\r\nContent-Disposition: form-data; name": "string"
  },
  "method": "POST",
  "xhr": false
}
```

## application/x-www-form-urlencoded

#### req

```
arr: "['1']"
```

#### res

```
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "13",
    "postman-token": "c6dfaab8-3696-b2b7-77e2-f4ea46560f80",
    "cache-control": "no-cache",
    "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
    "content-type": "application/x-www-form-urlencoded",
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
  },
  "content-type": "application/x-www-form-urlencoded",
  "params": {},
  "body": {
    "arr": "['1']"
  },
  "types": {
    "arr": "string"
  },
  "method": "POST",
  "xhr": false
}
```
## application/json

#### req

```
{
	"arr": [1]
}
```

#### res

```
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "15",
    "postman-token": "461dbef0-0937-ef00-8c92-9067157739fe",
    "cache-control": "no-cache",
    "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
    "content-type": "application/json",
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
  },
  "content-type": "application/json",
  "params": {},
  "body": {
    "arr": [
      1
    ]
  },
  "types": {
    "arr": "array"
  },
  "method": "POST",
  "xhr": false
}
```

## application/javascript

#### req

```
{
	"arr": [1]
}
```

#### res

```
{
  "status": 200,
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "15",
    "postman-token": "9badfd5d-d2f3-7173-dfab-6ea00d4e7c39",
    "cache-control": "no-cache",
    "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
    "content-type": "application/javascript",
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
  },
  "content-type": "application/javascript",
  "params": {},
  "body": {},
  "types": {},
  "method": "POST",
  "xhr": false
}
```
