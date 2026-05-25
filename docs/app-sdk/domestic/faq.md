---
sidebar_position: 2
title: 常见问题
---

# 国内版常见问题

## 配置相关

### Q: Other Linker Flags 需要配置什么？

在 **TARGETS -> Build Settings -> Other Linker Flags** 中添加 `-ObjC` 和 `-all_load`。

> V1.5 起新增 `-all_load`。

### Q: Enable Bitcode 怎么配置？

将 **Enable Bitcode** 改为 **NO**。Xcode 16 已废弃此项配置。

### Q: 如何配置微信登录的 Universal Links？

需要在工程中配置 **Associated Domains**，并在 `SceneDelegate.m` 中添加回调：

```objectivec
- (void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
    [[MHTWXManager defaultManager] scene:scene continueUserActivity:userActivity];
}
```

### Q: info.plist 中需要配置哪些 Schemes？

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>mqqapi</string>
    <string>weixin</string>
    <string>weixinULAPI</string>
    <string>weixinURLParamsAPI</string>
</array>
```

### Q: 相册权限不添加会怎样？

iOS 10 及以上不添加相册权限会导致闪退，必须添加。

## 接口调用

### Q: 微信登录时回调数据有什么特殊字段？

微信登录时会多返回一个字段 `wx_cpuid`（微信的 openid）。

### Q: 用户中心功能怎么接入？

V1.5 新增用户中心功能，需要在游戏中新增用户中心按钮，点击后弹出用户中心界面。

## 打包相关

### Q: 打包时有什么需要注意的？

1. **打包名称**: 请将打包名称改为拼音或者英文（可用全拼也可用首字母缩写）
2. **Build号管理**:
   - 同一个版本下，每次打包时 Build 号要比上一次 +1
   - 不同版本时，先将版本号 +1，然后同上
3. **AppleVision**: 若 `info.plist` 中存在 AppleVision 相关配置，需要删除
