---
sidebar_position: 3
title: 数据上报
---

# 数据上报

猕猴桃智能化系统提供以下数据上报接口，所有平台通用。

**加密秘钥：** `0afcd2bc1w7e6c15qw1684a3e03af19`

> 秘钥由接口文档提供，不同环境、不同游戏秘钥不同。

---

## 1. 角色信息实时上报

用户中心需要维护游戏用户信息，实现用户关怀、用户召回等业务。玩家登录选择区服后，CP 调用此接口实时上报角色信息。

**接口地址：** `https://mhtpt.ixy68.com/mht-platform/uc/cp-report/role-info`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

**Header 参数：** 无

### 请求示例

```json
{
    "userId": "1001",
    "ucid": 10086,
    "game": "XXX游戏",
    "distsId": 1001,
    "distsName": "艾欧尼亚",
    "roleName": "麦可尔",
    "roleLevel": 120,
    "vipLevel": 8,
    "amount": "100.05",
    "paymentType": "MHT",
    "registerDate": "2022-01-01",
    "type": "wx",
    "rechargeNum": 100,
    "onlineTime": 1.5,
    "checkPoint": "1002",
    "sign": "e3eaa7489d52c2b83f1b26062fe5e802"
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| userId | 用户ID，猕猴桃用户ID | true | string |
| ucid | 角色ID | true | int |
| game | 游戏名称 | true | string |
| type | 平台类型：`app`（端版） / `wx`（微信小游戏） / `bytedance`（抖音小游戏） / `ks`（快手小游戏） | true | string |
| distsId | 区服ID | true | int |
| distsName | 区服名 | true | string |
| roleName | 玩家角色名 | true | string |
| roleLevel | 角色等级，没有则填写0 | true | int |
| vipLevel | VIP等级 | true | int |
| amount | 充值总金额，单位元 | true | string |
| paymentType | 支付类型 | false | string |
| registerDate | 注册日期 (yyyy-mm-dd) | true | string |
| rechargeNum | 充值次数 | true | int |
| onlineTime | 在线时长，单位小时 | true | float |
| checkPoint | 关卡进度 | true | string |
| sign | 签名 | true | string |

### 响应示例

```json
{
    "code": 100000,
    "data": null,
    "message": "操作成功",
    "timestamp": 1662016719013
}
```

---

## 2. 角色充值信息更新

玩家充值支付完成后，CP 调用此接口实时更新角色总充值、等级、VIP等级信息。

**接口地址：** `https://mhtpt.ixy68.com/mht-platform/uc/cp-report/role-recharge`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

**Header 参数：** 无

### 请求示例

```json
{
    "ucid": 10086,
    "game": "XXX游戏",
    "type": "wx",
    "roleLevel": 120,
    "vipLevel": 8,
    "amount": "100.05",
    "sign": "e3eaa7489d52c2b83f1b26062fe5e802"
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| ucid | 角色ID | true | int |
| game | 游戏名称 | true | string |
| type | 平台类型：`app` / `wx` / `bytedance` / `ks` | true | string |
| roleLevel | 角色等级，没有则填写0 | true | int |
| vipLevel | VIP等级 | true | int |
| amount | 充值总金额，单位元 | true | string |
| sign | 签名 | true | string |

### 响应示例

```json
{
    "code": 100000,
    "data": null,
    "message": "操作成功",
    "timestamp": 1662016719013
}
```

---

## 3. 每日区服数据上报

每天凌晨 7 点前，定时批量上报前一天所有区服总充值数据，用于 GS 团队报表分析。

**接口地址：** `https://mhtpt.ixy68.com/mht-platform/uc/cp-report/distData`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

**Header 参数：** 无

### 请求示例

```json
{
    "list": [
        {
            "pf": "XXX游戏",
            "pfType": "wx",
            "dist": "701139",
            "amount": 100.20,
            "roleNum": 99,
            "stime": "2022-08-01"
        },
        {
            "pf": "XXX游戏",
            "pfType": "wx",
            "dist": "701143",
            "amount": 100.20,
            "roleNum": 99,
            "stime": "2022-08-01"
        }
    ],
    "ts": 123,
    "sign": "e425199ad3a91e8fbe575dae73623744"
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| list | 账单数据集合，总条数不大于3000，不参与验签 | true | object |
| ts | 时间戳 | true | long |
| sign | 签名 | true | string |

### list 集合内参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| pf | 游戏名称 | true | string |
| pfType | 平台类型，混服时不传 | false | string |
| dist | 区服名称 | true | string |
| roleNum | 创角数，区服总角色数量 | true | integer |
| amount | 充值金额，单位元 | true | decimal |
| stime | 开服日期 (yyyy-MM-dd)，相同区服每天上报相同 | true | string |

### 响应示例

```json
{
    "code": 100000,
    "data": null,
    "message": "操作成功",
    "timestamp": 1662016719013
}
```

---

## 4. 角色聊天敏感信息监控

区服充值 >= 10000 的玩家，当聊天内容包含敏感词（不想玩、弃坑、不想充钱、卸载、没意思、玩别的游戏去）时，CP 调用此接口实时推送。

**接口地址：** `https://mhtpt.ixy68.com/mht-platform/uc/cp-report/chatMonitor`

**请求方式：** POST

**请求数据类型：** `application/json`

**响应数据类型：** `application/json`

**Header 参数：** 无

### 请求示例

```json
{
    "ucid": 10086,
    "game": "我的宫廷",
    "type": "wx",
    "serverId": 120,
    "serverName": "1区",
    "content": "不想玩辣",
    "sign": "e3eaa7489d52c2b83f1b26062fe5e802"
}
```

### 请求参数

| 参数名称 | 参数说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| game | 游戏名称 | true | string |
| type | 平台类型：`wx` / `app` / `bytedance` / `ks` | true | string |
| serverId | 区服ID | true | long |
| serverName | 区服名称 | true | long |
| ucid | 角色ID | true | long |
| content | 聊天内容 | true | string |
| sign | 签名 | true | string |

### 响应示例

```json
{
    "code": 100000,
    "data": null,
    "message": "操作成功",
    "timestamp": 1662016719013
}
```

---

## 通用响应错误码

以下错误码适用于所有数据上报接口：

| 状态码 | 说明 |
|--------|------|
| 100000 | 操作成功 |
| 100505 | 签名-参数为空 |
| 100504 | 签名-验证不通过 |
| 100400 | 参数异常 |
