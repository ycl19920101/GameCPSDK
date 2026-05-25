---
sidebar_position: 2
title: 服务端差异说明
---

# 微信小游戏服务端差异说明

微信平台的服务端接口除了通用的[内购订单发货](../common/server-integration.md)外，还包含以下特有接口（CP → 猕猴桃方向）。

## 玩家登录验证

通过 SDK 客户端获取的 cpToken 验证玩家身份，获取猕猴桃玩家 ID。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/login-valid`

**请求方式：** POST

### Header 参数

| Header 名称 | 参数说明 | 是否必须 | 数据类型 |
|-------------|----------|----------|----------|
| Authorization | CP 授权码（从 SDK 获取 cpToken，半小时内有效） | true | string |

### 响应参数

| 参数名称 | 参数说明 | 类型 |
|----------|----------|------|
| code | 错误码 | integer |
| data.mhtUserId | 猕猴桃玩家ID | string |
| message | 错误提示 | string |
| timestamp | 当前时间戳 | string |

### 状态码

| 状态码 | 说明 |
|-------|------|
| 100000 | 操作成功 |
| 100506 | token 不存在 |
| 100507 | token 超时 |
| 100508 | token 验证失败 |
| 100500 | 系统异常 |

## 发送订阅消息

向玩家发送微信订阅消息，需要[加签](../common/signing.md)。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/send-subscribe`

**请求方式：** POST

参考 [微信订阅消息文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

### 请求参数

| 参数名称 | 参数说明 | 是否必须 |
|----------|----------|----------|
| data | 模板内容，不参与验签 | true |
| lang | 语言类型：`zh_CN` / `en_US` / `zh_HK` / `zh_TW`，默认 `zh_CN` | false |
| mhtAppId | 猕猴桃 appId | true |
| miniprogram_state | 跳转类型：`developer` / `trial` / `formal`，默认 `formal` | false |
| page | 点击模板卡片后的跳转页面 | false |
| salt | 盐 | true |
| sign | 签名 | true |
| template_id | 订阅模板 ID | true |
| touser | 用户 OpenID | true |

## 同步玩家账号数据

将 CP 账号数据同步到猕猴桃平台，需要[加签](../common/signing.md)。

**接口地址：** `https://t-minigame.tyu89.wang/sdk-minigame/cp/sync-player-info`

**请求方式：** POST

### 请求参数

| 参数名称 | 参数说明 | 是否必须 |
|----------|----------|----------|
| cpUcId | CP 账号 ID | true |
| mhtAppId | 猕猴桃 appId | true |
| salt | 盐 | true |
| sign | 签名 | true |
| wxOpenId | 微信 OpenID | true |
