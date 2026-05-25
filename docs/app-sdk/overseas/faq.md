---
sidebar_position: 3
title: 常见问题
---

# 海外版常见问题

## 网络与协议

### Q: 如何配置网络协议（禁用ATS）？

使用 HTTPS 网络协议需要在工程的 `info.plist` 文件中禁用 ATS。右键点击 `info.plist`，选择 **Open as -> Source Code**，添加以下配置：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

## 权限与配置

### Q: 需要配置哪些必选权限？

| 权限 | 是否必要 | 说明 |
| --- | --- | --- |
| 内购权限 | 必要 | 用于苹果内购支付 |
| 苹果授权登陆 | 必要 | 用于 Sign in with Apple |
| GameCenter | 必要 | 用于游戏中心功能 |
| 推送 | 非必要 | 根据游戏需求决定 |
| 相册权限 | 必要 | iOS 10 及以上不添加会闪退 |
| IDFA 权限 | 必要 | 用于数据统计 |

### Q: 如何配置 Facebook 权限？

在 `info.plist` 中以 Source Code 形式添加 Facebook 相关配置。注意将其中的 AppId、Token 等参数替换为您自己在 Facebook 后台申请的值：

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>fb{你的FacebookAppId}</string>
        </array>
    </dict>
</array>
<key>FacebookAppID</key>
<string>{你的FacebookAppId}</string>
<key>FacebookDisplayName</key>
<string>{你的FacebookDisplayName}</string>
<key>FacebookClientToken</key>
<string>{你的FacebookClientToken}</string>
```

### Q: Other Linker Flags 需要配置什么？

在 **TARGETS -> Build Settings -> Other Linker Flags** 中添加 `-ObjC`（字母O和C大写，符号 `-` 请勿忽略）。

## SDK集成

### Q: SDK支持哪些系统版本和开发环境？

- **开发环境**: Xcode 9.0 及以上
- **语言环境**: Objective-C
- **设备支持**: iPhone iOS 8.0 及以上

### Q: Facebook SDK 提审被拒 "Unsupported Architectures" 怎么办？

由于 Facebook 新版 SDK 支持 `[x86_64, i386]` 架构，但提审时不支持。需要在 **Build Phases** 中添加 **Run Script**，在脚本中移除不需要的架构。具体脚本请参考 [完整对接文档](./integration-guide.md#1262-配置-run-script)。

### Q: 苹果登录需要什么前置条件？

苹果登录需要在苹果开发者后台的证书中配置允许 **Sign in with Apple** 的选项。

## 接口调用

### Q: 初始化返回的状态码代表什么？

| 状态码 | 含义 |
| --- | --- |
| 200 | 初始化成功 |
| 其他 | 初始化失败 |

### Q: 登录回调中的参数分别是什么含义？

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| code | NSString | 状态码；200: 成功；999: 已登录；500: 网络连接失败 |
| token | NSString | 猕猴桃平台 Sid，需传给CP服务端做登录验证 |
| uid | NSString | 猕猴桃平台 userId |

### Q: 支付回调中的状态码代表什么？

| 状态码 | 含义 |
| --- | --- |
| 200 | 支付成功 |
| 301 | 取消 |
| 302 | 重复购买 |
| 303 | 操作中断 |
| 304 | 验证失败 |
| 500 | 网络连接失败 |

### Q: 设置角色接口的 -999 状态码是什么意思？

状态码 `-999` 表示当前用户**未登录**，需要先完成登录流程后再设置角色。

## 打包与提审

### Q: 打包时有什么需要注意的？

1. **打包名称**: 请将打包名称改为拼音或者英文
2. **Build号管理**: 同一个版本下，每次打包时 Build 号要比上一次 +1
