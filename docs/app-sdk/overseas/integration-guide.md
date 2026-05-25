---
sidebar_position: 2
title: 完整对接文档
---

# MHT海外SDK iOS对接文档

| 版本 | 作者 | 修改内容 | 时间 |
| --- | --- | --- | --- |
| V1.7 | 胡双斐 | 1.更新FacebookSDK，去除UIWebview | 2021/3/30 |
| V2.0 | 胡双斐 | 1.混淆版本完成；新版接口植入； | 2021/05/31 |
| V3.0 | 姚春林 | 1、深知支付验证2、新增苹果和fb快速登录3、加入第三方支付（PayPal，雷蛇） | 2022/03/28 |

## 1. 环境搭建

- **开发环境**: Xcode 9.0 及以上
- **语言环境**: Objective-C
- **设备支持**: iPhone iOS 8.0 及以上

### 1.1 引入SDK库

#### 1.1.1 SDK内容

| SDK文件夹 | 包含文件 |
| --- | --- |
| MhtSdk | AbroadMhtSdk.framework、MHTSdkBundle.bundle |
| FaceBook | FBSDKLoginKit.framework、FBSDKShareKit.framework、FBSDKCoreKit.framework、FBSDKGamingServicesKit.framework |
| Analytics | GoogleAppMeasurement.framework、FirebaseCore.framework、FirebaseAnalytics.framework、GoogleUtilities.framework、nanopb.framework |
| DeepKown | DeepKnowSDK.framework |

#### 1.1.2 手动导入SDK库

向工程包中依次拖入提供的三个文件夹：**MhtSdk**、**FaceBook**、**Firebase_Analytics**、**DeepKown**。出现对话框时，请勾选第一、二、四项。

### 1.2 配置工程

#### 1.2.1 确认关联文件

左侧目录选中工程名，在 **Build Phases -> Link Binary With Libraries** 中点击 "+" 按钮，在弹出的窗口中点击 "Add Other" 按钮，选择猕猴桃SDK中包含的 framework 文件添加到工程中。

需要导入的库：

| 导入库 | 作用 |
| --- | --- |
| AdSupport.framework | 数据统计支持库 |
| Social.framework | 系统支持库 |
| SafariServices.framework | 浏览器支持库 |
| FBSDKGamingServicesKit.framework | Facebook支持库 |
| FBSDKLoginKit.framework | Facebook支持库 |
| FBSDKShareKit.framework | Facebook支持库 |
| FBSDKCoreKit.framework | Facebook支持库 |
| GoogleAppMeasurement.framework | Firebase支持库 |
| FirebaseCore.framework | Firebase支持库 |
| FirebaseAnalytics.framework | Firebase支持库 |
| GoogleUtilities.framework | Firebase支持库 |
| nanopb.framework | Firebase支持库 |
| AbroadMhtSdk.framework | MHTSDK支持库 |
| MHTSdkBundle.bundle | MHTSDK资源文件 |

#### 1.2.2 工程包权限配置

| 权限说明 | 配置 |
| --- | --- |
| 内购权限 | 必要 |
| 苹果授权登陆 | 必要 |
| GameCenter | 必要 |
| 推送 | 非必要(看游戏是否需要) |
| 其他 | 暂无 |

导入苹果授权支持库：`AuthenticationServices.framework`

#### 1.2.3 添加属性

在 **TARGETS -> Build Settings -> Other Linker Flags**（选中ALL视图）中添加 `-ObjC`，字母O和C大写，符号 `-` 请勿忽略。

#### 1.2.4 添加访问权限

**方式一**：在 `info.plist` 文件中添加相应的 key 和 value。

**方式二**：右键点击以 Source Code 形式打开，添加如下：

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>請允許APP保存圖片到相册，方便應用保留您的帳號資訊，以備您後續使用</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>請允許APP訪問您的相册，方便應用保留您的帳號資訊，以備您後續使用</string>
<key>NSUserTrackingUsageDescription</key>
<string>请协助游戏获取IDFA标记权限，向您提供更优质、安全的个性服务及内容，未经您的同意，我们不会用于其他目的；开启后，您也可以前往"设置-隐私"中随时关闭。</string>
```

#### 1.2.5 配置Facebook权限

将以下代码复制并粘贴到工程的 `info.plist` 文件中（右键打开 info.plist 文件，选择 Source Code 形式打开）：

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>fb2105766152853089</string>
        </array>
    </dict>
</array>
<key>CFBundleVersion</key>
<string>1.2</string>
<key>FacebookAppID</key>
<string>2105766152853089</string>
<key>FacebookDisplayName</key>
<string>mht_sdk</string>
<key>FacebookClientToken</key>
<string>13f68c9563e8922bd615b2f7b9d6c2ab</string>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>fb</string>
    <string>fbapi</string>
    <string>fbapi20130214</string>
    <string>fbapi20130410</string>
    <string>fbapi20130702</string>
    <string>fbapi20131010</string>
    <string>fbapi20131219</string>
    <string>fbapi20140410</string>
    <string>fbapi20140116</string>
    <string>fbapi20150313</string>
    <string>fbapi20150629</string>
    <string>fbapi20160328</string>
    <string>fbauth</string>
    <string>fb-messenger-share-api</string>
    <string>fbauth2</string>
    <string>fbshareextension</string>
</array>
```

:::caution 注意
在配置Facebook权限过程中，具体参数例如 `2105766152853089`、`13f68c9563e8922bd615b2f7b9d6c2ab` 应该替换为您在Facebook后台申请应用的 **AppId** 和 **Token**。
:::

#### 1.2.6 Facebook新版SDK配置

##### 1.2.6.1 添加 Copy Files 依赖

操作流程：
1. 选择 **TARGETS -> Build Phases**
2. 选择 **Copy Files**
3. 在 Destination 中选择 **Frameworks**
4. 将提供的 FacebookSDK 中相关 framework 依次添加

##### 1.2.6.2 配置 Run Script

由于Facebook新版本SDK支持 `[x86_64, i386]` 架构的CPU，但是提审时会不支持此类配置，导致 "Unsupported Architectures" 理由的驳回。需要进行以下配置：

操作流程：
1. 选择 **TARGETS -> Build Phases**
2. 点击上方 "+" 添加按钮
3. 选择 **New Run Script Phase**

在 Run Script 中配置以下代码：

```bash
APP_PATH="${TARGET_BUILD_DIR}/${WRAPPER_NAME}"

# This script loops through the frameworks embedded in the application and
# removes unused architectures.
find "$APP_PATH" -name '*.framework' -type d | while read -r FRAMEWORK
do
FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)
FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"
echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"

EXTRACTED_ARCHS=()

for ARCH in $ARCHS
do
echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"
lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"
EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")
done

echo "Merging extracted architectures: ${ARCHS}"
lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "${EXTRACTED_ARCHS[@]}"
rm "${EXTRACTED_ARCHS[@]}"

echo "Replacing original executable with thinned version"
rm "$FRAMEWORK_EXECUTABLE_PATH"
mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"

done
```

### 1.3 设置代理服务

#### 1.3.1 在当前类上方引入支持库

在工程入口类方法中（AppDelegate.m），导入以下头文件：

```objectivec
#import <AbroadMhtSdk/mhtframework.h>
```

#### 1.3.2 在 didFinishLaunchingWithOptions 方法中，实现如下代码

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[OverseasSdkCreat shareInstance] initThird_protectingPartySDK:application
        didFinishLaunchingWithOptions:launchOptions
        WithAppsFlyerDevKey:@"ikX5vSJM9ELLcwSEDGHqUX"
        andAppsFlyerAppId:@"1503152682"
        andAdjustToken:@"eky8sp8yc8ao"
        andDeepKnowAppId:@"932e0a3808a903cc8a93aeb18d30a059"
        andAdjustEnvironment:@"1"];

    return YES;
}
```

在入口类中（AppDelegate.m），加入 Facebook 登陆授权协议方法：

```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
        openURL:url
        sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
        annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
    return handled;
}
```

以及如下方法（适配 iOS 13 以上版本）：

```objectivec
- (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts API_AVAILABLE(ios(13.0)){
    UIOpenURLContext *openURLContext = URLContexts.allObjects.firstObject;
    if (openURLContext) {
        [[FBSDKApplicationDelegate sharedInstance] application:UIApplication.sharedApplication
            openURL:openURLContext.URL
            sourceApplication:openURLContext.options.sourceApplication
            annotation:openURLContext.options.annotation];
    }
}
```

在使用SDK的代码前声明：

```objectivec
#import <AbroadMhtSdk/mhtframework.h>
```

---

## 2. SDK 接口调用

### 2.1 初始化

调用海外iOS SDK时，首先要调用的方法为初始化方法。

```objectivec
- (void)chushihuaSdk_protectingCreateAppid:(NSString *)appid
                                 channelId:(NSString *)channelId
                              successBlock:(MHTSDKCreateReturnInfoBlock)returnInfoBlock
                             andRegistBlock:(MHTSDKRegistCompletionBlock)registBlock;
```

**调用示例：**

```objectivec
/*
 初始化接口
 AppId: 猕猴桃平台分配给用户的AppId
 channelId: MHT(默认)
 */
[[OverseasSdkCreat shareInstance] chushihuaSdk_protectingCreateAppid:@"***"
    channelId:@"MHT"
    successBlock:^(NSString * _Nullable code) {
        NSLog(@"-初始化返回状态:%@", code);
    }
    andRegistBlock:^(NSString * _Nullable code) {
        NSLog(@"-注册返回状态:%@", code);
    }];
```

**接口参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| appId | NSString | 平台对应的游戏id（由猕猴桃平台提供） |
| channelId | NSString | 平台对应的游戏渠道id（由猕猴桃平台提供） |

**监听返回参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| status | NSString | 初始化状态码；成功: 200；其他均为失败 |

### 2.2 登录

#### 2.2.1 快速登录

**游客登录：**

```objectivec
- (void)SteploginMethodWithCompletionBlock:(MHTSDKLoginCompletionBlock)loginCompletionBlock
                        andCompletionBlock:(MHTSDKLogoutCompletionBlock)logoutCompletionBlock;
```

**苹果登录：**

```objectivec
- (void)quickAppleloginMethodWithCompletionBlock:(MHTSDKLoginCompletionBlock)loginCompletionBlock
                              andCompletionBlock:(MHTSDKLogoutCompletionBlock)logoutCompletionBlock;
```

:::info 提示
苹果登录需要在苹果证书中配置允许 **Sign in with Apple** 的选项。
:::

**Facebook登录：**

```objectivec
- (void)quickFbloginMethodWithCompletionBlock:(MHTSDKLoginCompletionBlock)loginCompletionBlock
                           andCompletionBlock:(MHTSDKLogoutCompletionBlock)logoutCompletionBlock;
```

#### 2.2.2 选择登录方式

```objectivec
- (void)LoginWith_warmingCompletionBlock:(MHTSDKLoginCompletionBlock)loginCompletionBlock
                    andCompletionBlock:(MHTSDKLogoutCompletionBlock)logoutCompletionBlock;
```

**调用示例：**

```objectivec
/*
 登录接口
 */
[[OverseasSdkCreat shareInstance] LoginWith_warmingCompletionBlock:^(NSString * _Nullable code, NSString * _Nullable token, NSString * _Nullable uid) {
    NSLog(@"切换账号 登录状态code:%@ token：%@  uid：%@", code, token, uid);
    // 在CP服务端与mht服务端的登录验证中，需要传入mht初始化packagecode与返回的token
} andCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"退出状态%@", code);
}];
```

调用登录接口，SDK会弹出登录视图。

**监听返回参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| status | NSString | 状态码；成功: 200；其他均为失败；已登录: 999；网络连接失败: 500 |
| Token | NSString | 猕猴桃平台Sid，用于登录成功后传递给CP的参数 |
| Uid | NSString | 猕猴桃平台userId，用于登录成功后传递给CP的参数 |
| Code | NSString | 切换账号退出监听 |

### 2.3 设置角色

游戏接入角色设置接口，向平台上传游戏玩家信息。

```objectivec
- (void)SetRoleData_warmingWithRoleData:(MHTSDKRoleData *)roleData
                        CompletionBlock:(MHTSDKSetRoleDataCompletionBlock)completionBlock;
```

**调用示例：**

```objectivec
/*
 设置角色信息模型
 areaName    : 区服id
 appRoleName : 角色名称
 appRoleGrade: 角色等级
 */
MHTSDKRoleData *roleData = [[MHTSDKRoleData alloc] initWithAreaName:@"***"
    appRoleName:@"***"
    appRoleGrade:@"***"];

/*
 设置角色接口
 roleData : 以上建立的MHTSDKRoleData数据模型
 */
[[OverseasSdkCreat shareInstance] SetRoleData_warmingWithRoleData:roleData
    CompletionBlock:^(NSString * _Nullable code) {
        NSLog(@"设置角色接口返回:%@", code);
    }];
```

**接口参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| areaName | NSString | 区服id |
| appRoleName | NSString | 角色名称 |
| appRoleGrade | NSString | 角色等级 |
| roleData | MHTSDKRoleData | 角色数据模型 |

**监听返回参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| status | NSString | 状态码；成功: 200；其他均为失败；未登录: -999；网络连接失败: 500 |

### 2.4 支付

#### 2.4.1 内购

```objectivec
- (void)Yap_warmingIAPWithPay:(MHTSDKPay *)pay
         withIAPCompletionBlock:(MHTIAPPayCompletionBlock)completionBlock;
```

支付接口调用后，会弹出苹果内购界面。

:::caution 注意
1. 测试时输入苹果后台配置好的沙盒测试员账号及密码
2. 生产环境下输入用户 APPStore 账号密码
:::

**调用示例：**

```objectivec
/*
 设置支付数据模型
 moneyAmt    : 支付金额
 orderDetail : 订单详情
 consumerId  : 透传参数1
 consumerName: 透传参数2
 productId   : 商品id（计费点）
 */
MHTSDKPay *sdkPay = [[MHTSDKPay alloc] initMhtPayModelWithPayMoney:@"***"
    orderDetail:@"***"
    consumerId:@"***"
    consumerName:@"***"
    productId:@"***"];

/*
 IAP 苹果内购-调起支付
 pay : 以上设置的支付数据模型
 */
[[OverseasSdkCreat shareInstance] Yap_warmingIAPWithPay:sdkPay
    withIAPCompletionBlock:^(int code) {
        NSLog(@"内购状态:%d", code);
    }];
```

**接口参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| moneyAmt | NSString | 支付金额 |
| orderDetail | NSString | 订单详情 |
| consumerId | NSString | 透传参数1 |
| consumerName | NSString | 透传参数2 |
| productId | NSString | 商品id（计费点） |
| pay | MHTSDKPay | 支付数据模型 |

**监听返回参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| status | NSString | 状态码；200: 成功；301: 取消；302: 重复购买；303: 操作中断；304: 验证失败；500: 网络连接失败 |

#### 2.4.2 三方支付

第三方支付由后台开关控制，整体接入流程和内购一致。支付后需要手动上报：

```objectivec
// 三方支付上报
- (void)thirdSendEventWithOrderNo:(NSString *)orderNo;
```

### 2.5 退出

游戏退出时调用的接口。

```objectivec
- (void)LogoutWith_warmingCompletionBlock:(MHTSDKLogoutCompletionBlock)completionBlock;
```

**调用示例：**

```objectivec
/*
 退出接口
 */
[[OverseasSdkCreat shareInstance] LogoutWith_warmingCompletionBlock:^(NSString * _Nullable code) {
    NSLog(@"-退出监听:%@", code);
}];
```

**监听返回参数：**

| 参数 | 类型 | 定义 |
| --- | --- | --- |
| status | NSString | 状态码；成功: 200；其他均为失败；未登录: -999；网络连接失败: 500 |

### 2.6 埋点方法

#### 2.6.1 自定义埋点

在初始化后，可自定义上报统计事件，可以完成在 Facebook、Firebase 以及 AppsFlyer 等统计平台的事件上报。

```objectivec
- (void)Custombury_protectingPointWithEventName:(NSString *)eventName
                                     eventType:(NSString *)type
                                  eventContent:(NSString *)content;
```

**调用示例：**

```objectivec
[[OverseasSdkCreat shareInstance] Custombury_protectingPointWithEventName:@"mht_quit"
    eventType:@"3"
    eventContent:@"custom"];
```

#### 2.6.2 应用内广告埋点

```objectivec
// 应用内广告展示时调用
- (void)eventAdImpression;

// 应用内广告被点击时调用
- (void)eventAdClick;
```

### 2.7 服务

#### 2.7.1 客服页面

```objectivec
- (void)callForthcustomer_serviceView;
```

#### 2.7.2 服务条款

```objectivec
- (void)callServiceProtocolView;
```

#### 2.7.3 FB关注

```objectivec
- (void)fbFocus;
```

### 2.8 三方账号绑定

**FB绑定：**

```objectivec
/*
 唤起FB授权页面
 FBAuthSuccessBlock
 code = 200 表示fb绑定成功
 code = 401 fb取消授权
 code = 402 fb绑定失败
 */
- (void)callFbAuthViewWithFBSuccessBlock:(FBAuthSuccessBlock)completionBlock;
```

**Apple绑定：**

```objectivec
/*
 唤起Apple授权页面
 */
- (void)callAPAuthViewWithFBSuccessBlock:(APAuthSuccessBlock)completionBlock;
```

---

## 3. SDK对象

### 3.1 接口对象

| 对象名 | 初始化 | 方法 | 说明 |
| --- | --- | --- | --- |
| OverseasSdkCreat | shareManager | chushihuaSdk_protectingCreateAppid | 初始化 |
| | | LoginWith_warmingCompletionBlock | 登陆 |
| | | SetRoleData_warmingWithRoleData | 角色设置 |
| | | LogoutWith_warmingCompletionBlock | 退出 |
| | | Yap_warmingIAPWithPay | 内购 |

### 3.2 角色对象

| 对象名 | 方法 | 参数 | 说明 |
| --- | --- | --- | --- |
| MHTSDKRoleData | initWithAreaName | areaName | 区服id |
| | | appRoleName | 角色名称 |
| | | appRoleGrade | 角色等级 |

### 3.3 支付对象

| 对象名 | 方法 | 参数 | 说明 |
| --- | --- | --- | --- |
| MHTSDKPay | initMhtPayModelWithPayMoney | moneyAmt | 支付金额 |
| | | orderDetail | 订单详情 |
| | | consumerId | 游戏玩家标记id |
| | | consumerName | 游戏玩家标记名称 |
| | | productId | 商品id（计费点） |

---

## 4. 常见问题

### Q1: 网络协议配置

禁用 ATS，使用 HTTPS 网络协议，工程的 `info.plist` 文件增加如下配置。右键选择 **Open as -> Source Code**：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```
