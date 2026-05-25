---
sidebar_position: 1
title: 前端对接
---

# 快手小游戏 SDK 前端对接

## 引入 SDK

```javascript
var mht = require('./mhtSdk_ks');
var mhtSDK = new mht();
console.log(mht, mhtSDK, 'mht');
mhtSDK.init();
mhtSDK.getDomainEnv(0);
mhtSDK.getGameState(0);
```

## 初始化和环境控制

### 实例化 SDK

```javascript
var mhtSDK = new mht();
```

### 初始化

```javascript
mhtSDK.init();
```

### 环境域名切换 `getDomainEnv(val)`

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| val | 测试和正式环境切换 | `0` 正式，`1` 测试 |

### 游戏状态切换 `getGameState(val)`

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| val | 测试和正式 appid | `0` 正式，`1` 测试 |

## 登录 `mhtSDK.login()`

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| callBack | 登录的回调 | Function |
| data | 渠道参数 Obj（冷启动获取的参数） | ks.getLaunchOptionsSync() 获得 |

```javascript
mhtSDK.login((res) => {
  console.log(res, '登陆成功');
}, {
  jumpUrlQueryParam: jumpUrlQueryParam,
});
```

## 支付 `mhtSDK.creatOrder()`

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| data | 支付所需参数 | Object |
| callBack | 支付的回调函数 | Function |

### data 参数详情

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| cpParam | CP 透传参数 | String |
| payMoney | 应付金额，单位分（例如 1 元就传 100） | Number |
| pay_item | 道具名称 | String |
| roleId | 角色 ID | String |
| serverId | 区服 ID | String |
| serverName | 区服名称 | String |
| goods_category | 商品类目 | String |
| goods_name | 道具名称 | String |

```javascript
let obj = {
  cpParam: 'ceshi',
  payMoney: 100,
  pay_item: 'cess',
  serverName: "s1",
  roleId: '1006',
  serverId: 's1',
  goods_category: '10041',
  goods_name: '购买道具'
};

mhtSDK.creatOrder(obj, res => {
  console.log('支付成功', res);
}, err => {
  console.log('支付失败', err);
});
```

商品类目获取：[快手开放平台](https://open.kuaishou.com/platform/controllCenter/game/pay_goods_detail)

## 添加快捷方式 `mhtSDK.addShortcut()`

添加小游戏快捷方式到手机桌面上。

| 字段名 | 类型 | 描述 |
|--------|------|------|
| success | function | 接口调用成功的回调函数 |
| fail | function | 接口调用失败的回调函数 |
| complete | function | 接口调用结束的回调函数（调用成功、失败都会执行） |

## 视频激励广告 `mhtSDK.videoAd()`

| 字段名 | 类型 | 描述 |
|--------|------|------|
| data | Object | 广告参数 |
| callback | Function | 回调函数 |

### data 参数详情

| 字段名 | 描述 | 可用值 |
|--------|------|--------|
| adUnitId | 广告 ID，必传 | String |
| multiton | 是否开启再得广告模式（只支持安卓系统的快手和快手极速版） | Boolean |
| multitonRewardMsg | 再得广告的奖励文案，玩家每看完一个广告会展示，如【再看1个获得xx】，按顺序依次展示，单个文案最大长度为 7；multiton 为 true 时必填 | String |
| multitonRewardTimes | 额外观看广告的次数，合法的数据范围为 1-4，multiton 为 true 时必填 | Number |
