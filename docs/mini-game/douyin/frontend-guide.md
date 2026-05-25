---
sidebar_position: 1
title: 前端对接
---

# 抖音小游戏 SDK 前端对接

## 引入 SDK

```javascript
var mht = require('./mhtSdk_yinli');
var mhtSDK = new mht();
```

## 参数配置

在 `mht` 文件夹中的 `ttAppIdConfig.js` 中配置游戏标识（联系运营获取）。

## 初始化

```javascript
// 环境切换：0 正式环境，1 测试环境
mhtSDK.getDomainEnv(0);

// 游戏状态切换：0 正式服，1 提审服
mhtSDK.getGameState(0);
```

## 登录

```javascript
mhtSDK.login((res) => {
  console.log(res, '登录回调');
}, {
  jumpUrlQueryParam: jumpUrlQueryParam
});
```

**渠道参数获取：**

```javascript
var sysres = tt.getLaunchOptionsSync();
jumpUrlQueryParam = sysres.query;
```

### 参数说明

| 参数名称 | 参数说明 | 参数类型 | 是否必传 |
|---------|---------|---------|---------|
| callBack | 登录回调函数 | Function | 是 |
| jumpUrlQueryParam | 渠道参数 | Object | 是 |

:::warning 注意
如需使用用户唯一性操作，请使用 `openId` 作为唯一标识，请勿使用 `userId`。
:::

## 支付

```javascript
mhtSDK.creatOrder(params, fun);
```

### 参数说明

| 参数名称 | 参数说明 | 参数类型 | 是否必传 |
|---------|---------|---------|---------|
| params | 支付参数对象 | Object | 是 |
| fun | 支付回调函数 | Function | 是 |

### params 参数详情

| 参数名称 | 参数说明 | 参数类型 | 是否必传 | 示例 |
|---------|---------|---------|---------|------|
| payMoney | 金额（单位：分） | Number | 是 | 600 |
| cpParam | CP 透传参数 | String | 是 | '测试' |
| pay_item | 道具名称 | String | 是 | '30月卡' |
| serverName | 区服名称 | String | 是 | '1服' |
| roleId | 角色ID | String | 是 | '123' |

参考：[抖音虚拟支付文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/api/payment/tt-request-game-payment)

## 客服消息 `openCustomerService()`

强烈建议通过 `openCustomerService` 判断枚举是否可用，再进行按钮绘制或回调拉起客服界面。

### 参数说明

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| type | number | 3 | 是 | 1：小6客服；2：抖音IM客服（仅支持抖音）；3：抖音客服平台（基础库 3.41.0 开始支持） |
| successCallback | Object | | 否 | 接口调用成功的回调函数 |
| failCallback | Object | | 否 | 接口调用失败的回调函数 |

参考：[抖音客服文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/user-ops/user-service/bytehi-im)

### 创建客服按钮 `createServiceBtn()`

参考：[抖音客服按钮文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/open-capability/customer-contact/tt-create-contact-button)

## 视频激励广告播放状态上报 `adEndNotice()`

| 参数名称 | 参数说明 | 参数类型 | 是否必传 |
|---------|---------|---------|---------|
| adUnitId | 广告ID | String | 是 |
| isEnded | 播放状态 | Boolean | 是 |

`isEnded` 说明：`true` 表示用户在视频播放完后关闭，`false` 表示播放过程中关闭。

此方法在 `onClose` 的回调函数中调用即可。

## 天赋升级上报 `updateTalent()`

```javascript
let obj = {
  attrEnum: 'TALENT',
  attrValue: '2'
};
mhtSDK.updateTalent(obj);
```

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| attrEnum | 枚举：天赋 TALENT，不为 null | 'TALENT' |
| attrValue | 升级的值，不为 null | '1' |
