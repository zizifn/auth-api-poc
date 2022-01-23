## oauth

一些需要 oauth2 认证的 APIs. 认为服务使用的 auth0.

1. Get /api/auth0/note
2. Post /api/auth0/note

## session test

/session

## COEP COOP CORP test

1. /corss-origin-header/\*
2. /corss-origin-header/favicon.ico?Cross-Origin-Resource-Policy=same-site
3. GET /corss-origin-header/json
4. POST /corss-origin-header/json

### open tracing enable via opentelemetry

1. /opentrace
   can both tracing browser and node. End to end use `<meta name="traceparent" content="{{traceparent}}">`

## 服务已经使用 action 部署到 heroku 上

https://oauth2-api-note.herokuapp.com

https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/#Set-Up-Express-OpenID-Connect
