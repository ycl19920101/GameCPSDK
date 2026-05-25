---
sidebar_position: 1
title: 快速开始
---

# 快速开始

本指南帮助您快速集成 MHT 海外 iOS SDK。

## 1. SDK获取和导入

将以下 SDK 文件夹拖入 Xcode 工程：

| 文件夹 | 内容 |
| --- | --- |
| MhtSdk | AbroadMhtSdk.framework、MHTSdkBundle.bundle |
| FaceBook | FBSDKLoginKit、FBSDKShareKit、FBSDKCoreKit、FBSDKGamingServicesKit |
| Firebase_Analytics | GoogleAppMeasurement、FirebaseCore、FirebaseAnalytics、GoogleUtilities、nanopb |
| DeepKown | DeepKnowSDK.framework |

拖入时勾选 **Copy items if needed**、**Create groups** 和 **Add to targets**。

## 2. Xcode项目配置

### 2.1 添加系统框架

在 **Build Phases -> Link Binary With Libraries** 中添加以下框架：

| 框架 | 用途 |
| --- | --- |
| AdSupport.framework | 数据统计 |
| Social.framework | 系统支持 |
| SafariServices.framework | 浏览器支持 |
| AuthenticationServices.framework | 苹果授权登录 |

### 2.2 Linker Flags

在 **Build Settings -> Other Linker Flags** 中添加：

```
-ObjC
```

### 2.3 权限配置

在 `info.plist`（以 Source Code 形式打开）中添加以下权限：

```xml
<!-- 相册权限 -->
<key>NSPhotoLibraryAddUsageDescription</key>
<string>請允許APP保存圖片到相册，方便應用保留您的帳號資訊，以備您後續使用</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>請允許APP訪問您的相册，方便應用保留您的帳號資訊，以備您後續使用</string>

<!-- IDFA 权限 -->
<key>NSUserTrackingUsageDescription</key>
<string>请协助游戏获取IDFA标记权限，向您提供更优质、安全的个性服务及内容。</string>

<!-- 禁用 ATS -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### 2.4 Facebook配置

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

## 3. AppDelegate中初始化代码

在 `AppDelegate.m` 中导入头文件并初始化SDK：

```objectivec
#import <AbroadMhtSdk/mhtframework.h>
```

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // 初始化第三方SDK
    [[OverseasSdkCreat shareInstance] initThird_protectingPartySDK:application
        didFinishLaunchingWithOptions:launchOptions
        WithAppsFlyerDevKey:@"你的AppsFlyerDevKey"
        andAppsFlyerAppId:@"你的AppsFlyerAppId"
        andAdjustToken:@"你的AdjustToken"
        andDeepKnowAppId:@"你的DeepKnowAppId"
        andAdjustEnvironment:@"1"];

    // 初始化MHT SDK
    [[OverseasSdkCreat shareInstance] chushihuaSdk_protectingCreateAppid:@"你的AppId"
        channelId:@"MHT"
        successBlock:^(NSString * _Nullable code) {
            NSLog(@"初始化返回状态:%@", code);
        }
        andRegistBlock:^(NSString * _Nullable code) {
            NSLog(@"注册返回状态:%@", code);
        }];

    return YES;
}
```

添加 Facebook 授权回调：

```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
        openURL:url
        sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
        annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
    return handled;
}
```

## 4. 基本登录调用

### 方式一：选择登录方式（弹出登录视图）

```objectivec
[[OverseasSdkCreat shareInstance] LoginWith_warmingCompletionBlock:^(NSString * _Nullable code, NSString * _Nullable token, NSString * _Nullable uid) {
    if ([code isEqualToString:@"200"]) {
        NSLog(@"登录成功 token:%@ uid:%@", token, uid);
        // 将 token 和 uid 传给CP服务端进行验证
    }
} andCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"退出状态:%@", code);
}];
```

### 方式二：快速登录

```objectivec
// 游客登录
[[OverseasSdkCreat shareInstance] SteploginMethodWithCompletionBlock:^(NSString * _Nullable code, NSString * _Nullable token, NSString * _Nullable uid) {
    NSLog(@"登录状态:%@ token:%@ uid:%@", code, token, uid);
} andCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"退出状态:%@", code);
}];

// 苹果登录
[[OverseasSdkCreat shareInstance] quickAppleloginMethodWithCompletionBlock:^(NSString * _Nullable code, NSString * _Nullable token, NSString * _Nullable uid) {
    NSLog(@"登录状态:%@ token:%@ uid:%@", code, token, uid);
} andCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"退出状态:%@", code);
}];

// Facebook登录
[[OverseasSdkCreat shareInstance] quickFbloginMethodWithCompletionBlock:^(NSString * _Nullable code, NSString * _Nullable token, NSString * _Nullable uid) {
    NSLog(@"登录状态:%@ token:%@ uid:%@", code, token, uid);
} andCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"退出状态:%@", code);
}];
```

## 5. 支付调用

```objectivec
// 设置角色信息（支付前需先设置角色）
MHTSDKRoleData *roleData = [[MHTSDKRoleData alloc] initWithAreaName:@"区服id"
    appRoleName:@"角色名称"
    appRoleGrade:@"角色等级"];

[[OverseasSdkCreat shareInstance] SetRoleData_warmingWithRoleData:roleData
    CompletionBlock:^(NSString * _Nullable code) {
        NSLog(@"设置角色返回:%@", code);
    }];

// 创建支付模型并发起支付
MHTSDKPay *sdkPay = [[MHTSDKPay alloc] initMhtPayModelWithPayMoney:@"6.00"
    orderDetail:@"订单详情"
    consumerId:@"玩家id"
    consumerName:@"玩家名称"
    productId:@"商品id"];

[[OverseasSdkCreat shareInstance] Yap_warmingIAPWithPay:sdkPay
    withIAPCompletionBlock:^(int code) {
        NSLog(@"内购状态:%d", code);
        // 200: 成功, 301: 取消, 302: 重复购买, 303: 操作中断, 304: 验证失败, 500: 网络错误
    }];
```

---

## 下一步

- 查看 [完整对接文档](./integration-guide.md) 了解所有配置细节
- 查看 [常见问题](./faq.md) 解决集成中的问题
