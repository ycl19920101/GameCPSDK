---
sidebar_position: 2
title: 服务端差异说明
---

# 抖音小游戏服务端差异说明

抖音平台的服务端接口仅有内购订单发货回调，结构与通用[服务端对接](../common/server-integration.md)一致。

## 内购订单发货（猕猴桃 → CP）

**接口地址：** `[CP_URL]`（由 CP 提供给猕猴桃）

**请求方式：** POST

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|---------|---------|---------|---------|
| cpParam | CP 自定义透传参数 | true | string |
| orderCurrency | 订单金额 | true | number |
| orderId | 猕猴桃订单编号 | true | string |
| salt | 盐（当前时间戳或随机字符串） | true | string |
| sign | 签名，详见[接口加签说明](../common/signing.md) | true | string |

### 请求示例

```json
{
  "cpParam": "",
  "orderCurrency": 0,
  "orderId": "",
  "salt": "",
  "sign": ""
}
```

### 响应示例

```json
{
  "code": 0,
  "data": {},
  "message": "",
  "timestamp": 0
}
```

### 状态码

| 状态码 | 说明 |
|-------|------|
| 100000 | 操作成功 |
| 其他 | 由 CP 定义的错误码和错误提示 |
