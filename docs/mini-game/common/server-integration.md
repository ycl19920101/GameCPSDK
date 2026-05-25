---
sidebar_position: 1
title: 服务端对接
---

# 服务端对接

本文档描述 CP 与猕猴桃平台之间的服务端接口对接规范。

## 接口概览

| 序号 | 方向 | 接口名称 |
|------|------|----------|
| 1 | CP --> 猕猴桃 | 玩家登录验证 |
| 2 | CP --> 猕猴桃 | 发送订阅消息（需加签） |
| 3 | CP --> 猕猴桃 | 同步玩家账号数据 |
| 4 | 猕猴桃 --> CP | 内购订单发货 |

---

## 一、玩家登录验证（CP --> 猕猴桃）

验证玩家登录身份，获取猕猴桃玩家 ID。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/login-valid`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

### Header 参数

| Header 名称 | 参数说明 | 是否必须 | 数据类型 | 备注 |
|-------------|----------|----------|----------|------|
| Authorization | CP 授权码（从 SDK 客户端获取 cpToken，半小时内有效） | true | string | |

### 响应示例

```json
{
    "code": 100000,
    "message": "操作成功！",
    "timestamp": "1718258234510",
    "data": {
        "mhtUserId": "65895938"
    }
}
```

### 响应参数

| 参数名称 | 参数说明 | 类型 | 备注 |
|----------|----------|------|------|
| code | 错误码 | integer(int32) | |
| data | 数据内容 | json | |
| data.mhtUserId | 猕猴桃玩家 ID | string | |
| message | 错误提示 | string | |
| timestamp | 当前时间戳 | string | |

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 100000 | 操作成功！ |
| 100506 | token 不存在 |
| 100507 | token 超时 |
| 100508 | token 验证失败 |
| 100500 | 系统异常！ |

---

## 二、发送订阅消息（CP --> 猕猴桃，需加签）

向玩家发送微信订阅消息。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/send-subscribe`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

**接口描述：** 参考[微信订阅消息文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

### 请求示例

```json
{
  "data": {},
  "lang": "",
  "mhtAppId": "",
  "miniprogram_state": "",
  "page": "",
  "salt": "",
  "sign": "",
  "template_id": "",
  "touser": ""
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 | 备注 |
|----------|----------|----------|----------|------|
| data | 模板内容，格式形如 `{ "key1": { "value": any }, "key2": { "value": any } }`，不参与验签 | true | object | |
| lang | "进入小程序查看"的语言类型，支持 `zh_CN`（简体中文）、`en_US`（英文）、`zh_HK`（繁体中文）、`zh_TW`（繁体中文），默认为 `zh_CN` | false | string | |
| mhtAppId | 猕猴桃 appId | true | string | |
| miniprogram_state | 跳转小程序类型：`developer` 为开发版；`trial` 为体验版；`formal` 为正式版；默认为正式版 | false | string | |
| page | 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数（示例：`index?foo=bar`）。该字段不填则模板无跳转 | false | string | |
| salt | 盐（当前时间戳或随机字符串） | true | string | |
| sign | 签名，详见[接口加签说明](./signing.md) | true | string | |
| template_id | 所需下发的订阅模板 id | true | string | |
| touser | 用户的 OpenID | true | string | |

### 响应示例

```json
{
    "code": 0,
    "data": {
        "errcode": 0,
        "errmsg": ""
    },
    "message": "",
    "timestamp": ""
}
```

### 响应参数

| 参数名称 | 参数说明 | 类型 |
|----------|----------|------|
| code | 错误码 | integer(int32) |
| data | 数据内容 | json |
| data.errcode | 错误码 | integer(int32) |
| data.errmsg | 错误信息 | string |
| message | 错误提示 | string |
| timestamp | 当前时间戳 | string |

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 100000 | 操作成功！ |
| 其他 | 返回猕猴桃的错误码，由 CP 定义错误提示 |

---

## 三、同步玩家账号数据（CP --> 猕猴桃）

同步玩家的 CP 账号数据到猕猴桃平台。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/sync-player-info`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

### 请求示例

```json
{
  "cpUcId": "",
  "mhtAppId": "",
  "salt": "",
  "sign": "",
  "wxOpenId": ""
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cpUcId | CP 账号 ID | true | string |
| mhtAppId | 猕猴桃 appId | true | string |
| salt | 盐（当前时间戳或随机字符串） | true | string |
| sign | 签名，详见[接口加签说明](./signing.md) | true | string |
| wxOpenId | 微信 OpenID | true | string |

### 响应示例

```json
{
    "code": 0,
    "data": {},
    "message": "",
    "timestamp": ""
}
```

### 响应参数

| 参数名称 | 参数说明 | 类型 |
|----------|----------|------|
| code | 错误码 | integer(int32) |
| data | 数据内容 | json |
| message | 错误提示 | string |
| timestamp | 当前时间戳 | string |

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 100000 | 操作成功！ |
| 其他 | 返回猕猴桃的错误码，由 CP 定义错误提示 |

---

## 四、内购订单发货（猕猴桃 --> CP）

猕猴桃平台在玩家内购支付成功后，调用 CP 提供的回调接口完成发货。

**接口地址：** `[CP_URL]`（由 CP 提供给猕猴桃）

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

### 请求示例

```json
{
  "cpParamFirst": "",
  "cpParamSecond": "",
  "orderCurrency": 0,
  "orderId": "",
  "salt": "",
  "sign": ""
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cpParamFirst | CP 自定义透传参数 1 | true | string |
| cpParamSecond | CP 自定义透传参数 2 | true | string |
| orderCurrency | 订单金额 | true | number |
| orderId | 猕猴桃订单编号 | true | string |
| salt | 盐（当前时间戳或随机字符串） | true | string |
| sign | 签名，详见[接口加签说明](./signing.md) | true | string |

### 响应示例

```json
{
    "code": 0,
    "data": {},
    "message": "",
    "timestamp": ""
}
```

### 响应参数

| 参数名称 | 参数说明 | 类型 |
|----------|----------|------|
| code | 错误码 | integer(int32) |
| data | 数据内容 | object |
| message | 错误提示 | string |
| timestamp | 当前时间戳 | string |

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 100000 | 操作成功！ |
| 其他 | 由 CP 定义的错误码和错误提示 |
