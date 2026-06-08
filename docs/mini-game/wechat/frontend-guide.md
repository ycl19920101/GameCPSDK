---
sidebar_position: 1
title: 前端对接
---

# 微信小游戏 SDK 前端对接

文档涉及的参数信息和SDK Demo等，请联系我方商务或者运营获取

## 引入 SDK

```javascript
var mht = require('./js/mhtSdk.js');
var mhtSDK = new mht();
```

## 配置 mhtAppId【替换为自己游戏的APPID】

```javascript
// 正式 appid
module.exports.MHTAPPID = '8b9ce0c8053ba2f694c07938a97bf668';
// 测试 appid
module.exports.MHTAPPID_TEST = '938c50183e697f68347573173fe90913';
```

## SDK 接口一览

### 必接接口

**业务逻辑：**

1. 配置环境接口
2. 游戏状态接口
3. 登录接口
4. 支付接口
5. 安全检查方法接口

**上报：**

6. 角色上报接口
7. 上报付费行为
8. 上报收藏行为
9. 上报分享给朋友
10. 上报分享到朋友圈

### 选接接口

**业务逻辑：**

1. 客服接口
2. 游戏圈接口
3. 视频激励广告接口
4. 绑定手机号接口
5. 发送验证码接口

**上报：**

6. 关键行为上报接口
7. 上报创建角色
8. 上报完成新手指引
9. 上报游戏等级提升
10. 上报浏览商城和活动页面
11. 主动分享上报

---

## 必接接口

### 一、配置环境接口 `getDomainEnv(0)`

:::caution 注意
默认都传 `0`，只有需要配合测试时才会改为 `1`。
:::

| 参数 | 描述 | 参考值 |
|------|------|--------|
| 参数一 | 切换 SDK 的接口地址 | `0`：正式环境，`1`：测试环境 |

### 二、配置游戏状态接口 `getGameState(val)`
切换游戏 的生产环境和测试环境。

:::caution 注意
切换游戏的服务器状态。体验版本可传1，正式上线切换为0
:::

| 参数 | 描述 | 参考值 |
|------|------|--------|
| 参数一 | 切换游戏的服务器状态 | `0`：正式服，`1`：提审服 |

### 三、登录接口 `login(callBack, data)`

:::caution 注意
调用登录前，请确保已按顺序完成接口一，二的调用
:::

**示例：**

```javascript
mhtSDK.login((res) => {
  console.log(res, '登陆成功');
}, {
  jumpUrlQueryParam: jumpUrlQueryParam,
  onShowQueryParam: onShowQueryParam,
  scene: scene
});
```

| 参数名称     | 描述   | 参考值      |
| -------- | ---- | -------- |
| callBack | 回调函数 | function |
| data     | 对象   | obj      |

**Data 参数详情：**

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| jumpUrlQueryParam | 渠道参数对象 | obj |
| onShowQueryParam | 非必传，没特殊要求通常不传 | obj |
| scene | 场景值 | number |

**渠道参数获取：**

```javascript
// jumpUrlQueryParam 渠道参数动态获取
const sysres = wx.getLaunchOptionsSync();
jumpUrlQueryParam = sysres.query;

// onShowQueryParam 获取
// 广告主可通过监听 wx.onShow 获取视频号跳转参数
const onShowQueryParam = wx.onShow().query;

// Scene 场景值获取
const sysres = wx.getLaunchOptionsSync();
scene = sysres.scene;
```

**返回值示例：**

```json
{
  "data": {
    "bindingPhone": false,
    "cpToken": "eyJhbGciOiJIUzM4NCJ9...",
    "firstLogin": false,
    "mhtToken": "eyJhbGciOiJIUzM4NCJ9...",
    "userId": "534",
    "openId": "o7kYQ4zPoqw_IVvdJS7lX1mfTNWw",
    "wxSessionKey": "8N1BH+v/wfcg6ZAfwrpuSA==",
    "wxUnionid": "oYPnj6PbsZ1kt1jUM2CbqBOzRnSc"
  },
  "message": "操作成功！",
  "timestamp": "1672390360492"
}
```

**返回字段说明：**

| 字段 | 说明 |
|------|------|
| bindingPhone | 是否绑定了手机号 |
| cpToken | CP 登录验证使用的 token |
| firstLogin | 是否为首次登录 |
| mhtToken | 猕猴桃 token |
| userId | 猕猴桃用户ID |
| openId | 微信 OpenID |
| wxSessionKey | 微信 SessionKey |
| wxUnionid | 微信 UnionID |

### 四、支付接口 `creatOrder(data, bcallBack)`

```javascript
var params = {
  payMoney: 100,           // 金额，单位分
  cpParamFirst: '1',       // CP 透传参数
  pay_item: '30月卡',      // 道具名称
  serverName: '1',         // 区服名称
  cpUcid: '123',           // CP 账号ID
  serverId: '666',         // 区服ID
  roleId: '12151',         // 角色ID
  roleName: '赵日天',       // 角色名称
  roleLevel: 25,           // 角色等级
  roleVip: '0'             // VIP等级，没有即传0，类型为String
};

mhtSDK.creatOrder(params, (res) => {
  console.log(res, '支付回调');
});
```

**支付参数对象明细：**

| 参数名称         | 描述              | 类型     | 是否必传         |
| ------------ | --------------- | ------ | ------------ |
| payMoney     | 金额，单位分          | Int    | 是            |
| cpParamFirst | CP 透传参数         | String | 是            |
| pay_item     | 道具名称            | String | 是            |
| serverName   | 区服名称            | String | 是            |
| cpUcid       | CP 账号ID         | String | 是            |
| serverId     | 区服ID            | String | 是            |
| roleId       | 角色ID            | String | 是            |
| roleName     | 角色名称            | String | 是            |
| roleLevel    | 角色等级            | Int    | ==是（且不能为0）== |
| roleVip      | VIP等级，==没有即传0== | String | 是            |

参考：[微信支付文档](https://developers.weixin.qq.com/minigame/dev/api/midas-payment/wx.requestMidasPayment.html)

### 五、安全检查方法 `checkoutContent(tcontent)`

敏感词汇验证。

```javascript
mhtSDK.checkoutContent({
  content: '检查的内容',
  scene: 2,       // 场景枚举值：1 资料；2 评论；3 论坛；4 社交日志
  signature: '',  // 个性签名，仅在资料类场景有效(scene=1)，需UTF-8编码
}).then(res => {
  console.log(res, '内容检查成功');
}).catch(err => {
  console.log(err, '内容检查失败');
});
```

| 参数名称      | 描述                                    | 参考值                   |
| --------- | ------------------------------------- | --------------------- |
| content   | 检查内容                                  |                       |
| scene     | 场景枚举                                  | 1 资料；2 评论；3 论坛；4 社交日志 |
| signature | 个性签名，该参数仅在资料类场景有效(scene=1)，需使用UTF-8编码 |                       |


**返回值示例：**

```json
{
  "code": 100000,
  "message": "操作成功！",
  "data": {
    "errcode": 0,
    "errmsg": "ok",
    "result": {
      "suggest": "risky",
      "label": 21000,
      "replaced_content": "你哦真是***，不会吧"
    }
  }
}
```

**result.suggest 说明：**

| 值 | 说明 |
|----|------|
| `risky` | 拦截 |
| `pass` | 通过 |
参考：[微信安全检查文档](https://developers.weixin.qq.com/minigame/dev/api-backend/open-api/sec-check/security.msgSecCheck.html)

### 六、角色上报接口 `reportedUser(obj)`

```javascript
mhtSDK.reportedUser({
  "cpUcid": "11111",
  "roleId": "2222",
  "roleLevel": "50",
  "roleName": "sss",
  "roleVip": 2,
  "serverId": "555",
  "serverName": "8888"
});
```

:::tip 提示
每次创建角色上报，等级更新上报（如果等级更新快可10级20级上报，适当控制频率），角色信息更新上报。
:::

### 七、上报付费行为 `reportPay(param)`

:::caution 重要
由于前端检测付费成功会有误差，付费上报方法应通过游戏方服务端发货通知后再进行上报，以确保付费上报的准确性。
:::

```javascript
mhtSDK.reportPay(
{payAmount: '600'}
)
```

| 参数名称      | 描述         | 参考值 |
| --------- | ---------- | --- |
| payAmount | 上报金额（单位：分） | 600 |

### 八、上报收藏行为 `reportOnAddToFavorites(val)`

:::tip
只关注默认收藏上报。
:::

```javascript
mhtSDK.reportOnAddToFavorites('default')
```

| 参数名称 | 描述   | 参考值                                                          |
| ---- | ---- | ------------------------------------------------------------ |
| val  | 收藏类型 | `default`（普通收藏）、`my`（添加到我的小程序）、`desktop`（添加到桌面）、`others`（其他） |

### 九、上报分享给朋友 `shareWay(obj)`

```javascript
let obj = {
  title: '测试',
  imageUrl: 'https://wdgtcdn.ixy68.com/wdgtShare/share.png'
};
mhtSDK.shareWay(obj);
```

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| title | 分享标题 | '测试' |
| imageUrl | 分享图片 | https URL，建议使用 HTTPS |

### 十、上报分享到朋友圈 `shareTimeline(obj)`

```javascript
let obj = {
  title: '测试',
  imageUrl: 'https://wdgtcdn.ixy68.com/wdgtShare/share.png',
  query: 'key1=val1&key2=val2'
};
mhtSDK.shareTimeline(obj);
```

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| title | 分享标题 | '测试' |
| imageUrl | 分享图片 | https URL |
| query | 携带参数 | `key1=val1&key2=val2` |


---

## 选接接口

### 一、客服接口 `jumpService()`

跳转客服。**需要在登录后调用。**

### 二、游戏圈接口 `gameClub()`

跳转游戏圈。

### 三、视频激励广告接口 `videoAd(data, callback)`

```javascript
mhtSDK.videoAd({
  adUnitId: 'adunit-2edb5446a8205a85'
}, res => {
  console.log(res, '*****');
});
```

| 参数名称 | 描述 |
|---------|------|
| data | 广告ID |
| callback | 回调函数 |

**返回值：**

| 值 | 说明 |
|----|------|
| 0 | 播放中途退出 |
| 1 | 播放完成退出 |
| 2 | 视频拉取失败 |

### 四、发送验证码接口 `sendAuthCode(phone)`

```javascript
mhtSDK.sendAuthCode(15539953770);
```

### 五、绑定手机号接口 `bandFhone(phone, vcode, bindCallBack)`

```javascript
mhtSDK.bandFhone(15539953770,123456 , res => {
  console.log(res, '*****');
});
```

| 参数名称 | 描述 |
|---------|------|
| phone | 手机号 |
| vcode | 验证码 |

:::tip 提示
登录接口返回 `bindingPhone` 为 `true` 时表示此账号已绑定过。
:::

### 六、关键行为上报接口 `actionReport(obj)`

```javascript
mhtSDK.actionReport(
{ actionCode: '3'}
);
```

| 参数名称       | 描述     | 参考值  |
| ---------- | ------ | ---- |
| actionCode | 关键行为枚举 | 参考下表 |

![[图片1.png]]

### 七、上报创建角色 `reportCreateRole()`

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| roleName | 角色名称 | '张三' |

### 八、上报完成新手指引 `reportTutorialFinish()`

```javascript
mhtSDK.reportTutorialFinish();
```

### 九、上报游戏等级提升 `reportUpLevel(obj)`

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| level | 等级 | 5 |
| power | 积分 | 600 |

### 十、上报浏览商城/活动页面 `reportViewContent(val)`

| 参数名称 | 描述 | 参考值 |
|---------|------|--------|
| val | 场景 | `Mall`（商城）、`Activity`（活动） |

### 十一、主动拉起分享上报 `activeshowShare()`

主动拉起转发时上报一条分享行为。在 `wx.shareAppMessage()` 调起时使用。

```javascript
mhtSDK.activeshowShare();
```

---
