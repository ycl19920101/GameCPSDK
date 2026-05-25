---
sidebar_position: 1
title: 完整对接文档
---

# MHT iOS-SDK 国内版对接文档

| 版本 | 作者 | 修改内容 | 时间 |
| --- | --- | --- | --- |
| V1.0 | 未知 | 初版 | 2022.8 |
| V1.1 | 姚春林 | 增加切换账号通知及回调 | 2022.10 |
| V1.2 | 姚春林 | 增加关键行为上报功能 | 2023.1 |
| V1.3 | 姚春林 | 添加注意事项 | 2024.10 |
| V1.4 | 姚春林 | 新增caid，新增引力引擎 | 2025.7 |
| V1.5 | 姚春林 | 接入微信登录 | 2026.1 |

## 1. 引入SDK和资源文件（静态库）

将 SDK 提供的静态库文件引入到 Xcode 工程中。

## 2. 配置工程

### 2.1 Other Linker Flags

在 **TARGETS -> Build Settings -> Other Linker Flags** 中添加 `-ObjC` 和 `-all_load`。

> **[V1.5 修改]** 新增 `-all_load` 配置。

### 2.2 Enable Bitcode

将 **Enable Bitcode** 改为 **NO**。

> Xcode 16 已废弃此项配置。

### 2.3 配置 Associated Domains

> **[V1.5 新增]**

配置 Associated Domains，用于微信登录的通用链接（Universal Links）支持。

### 2.4 添加 AppTrackingTransparency 框架

在 `info.plist` 中添加：

```xml
<key>NSUserTrackingUsageDescription</key>
<string>请允许APP获取广告标识符，以提供更好的服务</string>
```

### 2.5 配置相册权限

添加相册权限保存截图（不添加 iOS 10 及以上会闪退）：

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>请允许APP保存图片到相册</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>请允许APP访问您的相册</string>
```

### 2.6 info.plist 配置

> **[V1.5 新增]**

在 `info.plist` 中添加相关配置（具体参考 Demo）。

### 2.7 配置 Schemes

> **[V1.5 修改]**

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>mqqapi</string>
    <string>weixin</string>
    <string>weixinULAPI</string>
    <string>weixinURLParamsAPI</string>
</array>
```

### 2.8 横竖屏配置

根据游戏需求配置横竖屏方向。

### 2.9 添加 Swift 文件

添加 Swift 文件，点击生成桥接文件。

### 2.10 去掉 AppleVision 适配

若 `info.plist` 中存在 AppleVision 相关配置，需要删除。

### 2.11 AppDelegate.m 配置

> **[V1.5 新增，可从 Demo 拷贝]**

在 `AppDelegate.m` 中进行 SDK 初始化相关配置（具体参考 Demo）。

### 2.12 SceneDelegate.m 配置

> **[V1.5 新增，若有则须配置]**

```objectivec
- (void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
    [[MHTWXManager defaultManager] scene:scene continueUserActivity:userActivity];
}
```

## 3. 第三方库注册

### 三方注册调用

在工程入口类中调用第三方库的注册方法（具体参考 Demo）。

### 调用实例

具体参考 Demo。

## 4. 初始化

### 4.1 初始化回调通知注册

注册初始化相关的回调通知。

### 4.2 初始化接口调用

调用 SDK 初始化接口（具体参考 Demo）。

### 4.3 初始化服务端数据回调

处理初始化返回的服务端数据。

## 5. 展示SDK主界面

### 5.1 登录回调通知注册

注册登录成功通知。

### 5.2 展示主界面

调用接口展示 SDK 的主界面（包含登录等功能）。

### 5.3 调用实例

具体参考 Demo。

### 5.4 登录服务端数据回调

> **[V1.5 修改]**

处理登录成功后服务端返回的数据。

:::caution 注意
微信登录时会多返回一个字段 `wx_cpuid`（微信的 openid）。
:::

## 6. 切换账号

### 6.1 切换账号注册

注册切换账号的通知监听。

### 6.2 切换账号回调

处理切换账号的回调。

## 7. 支付

### 7.1 支付回调通知注册

注册支付结果通知。

### 7.2 支付接口调用

调用支付接口发起支付流程。

### 7.3 充值接口调用实例

具体参考 Demo。

### 7.4 支付服务端数据回调

处理支付完成后服务端返回的回调数据。

## 8. 用户中心

> **[V1.5 新增]**

需要在游戏中新增用户中心按钮，点击后弹出用户中心。

## 9. 事件上报

### 9.1 事件上报接口调用

上报自定义事件。

### 9.2 调用实例

具体参考 Demo。

## 10. 关键行为上报

### 10.1 关键行为接口

上报关键行为事件。

### 10.2 调用实例

具体参考 Demo。

## 11. 注意事项

1. **打包名称**: 请将打包名称改为拼音或者英文（可用全拼也可用首字母缩写）
2. **Build号管理**:
   - 同一个版本下，每次打包时记得 Build 号要比上一次 +1
   - 不同版本时，先将版本号 +1，然后同上

### 示意流程图

```
初始化SDK -> 展示主界面(登录) -> 设置角色 -> 游戏内操作 -> 支付/退出
```
