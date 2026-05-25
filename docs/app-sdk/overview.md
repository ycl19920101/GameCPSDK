---
sidebar_position: 1
title: APP SDK 概览
---

# APP SDK 概览

猕猴桃 APP SDK 提供 iOS 应用对接方案，分为**海外版**和**国内版**两个版本。

:::caution 注意
海外版和国内版的 SDK 工程配置、API 接口有较大差异，请根据您的目标市场选择对应版本。
:::

## 版本对比

| 特性 | 海外版 | 国内版 |
|------|--------|--------|
| 登录方式 | 游客、Apple、Facebook | 微信登录 |
| 支付方式 | Apple IAP + 第三方支付(PayPal等) | Apple IAP |
| 第三方集成 | AppsFlyer、Adjust、Firebase、Facebook SDK | 引力引擎、微信 SDK |
| Linker Flags | `-ObjC` | `-ObjC` + `-all_load` |
| 特有功能 | FB绑定、Apple绑定、客服页面 | 用户中心、关键行为上报 |
| Associated Domains | 不需要 | 需要（微信 Universal Links） |

## 海外版

适用于面向海外市场的 iOS 应用。

- [快速开始](./overseas/quick-start.md) — 5分钟完成基本对接
- [完整对接文档](./overseas/integration-guide.md) — 详细的配置和接口说明
- [常见问题](./overseas/faq.md) — 集成中的常见问题解答

## 国内版

适用于面向国内市场的 iOS 应用。V1.5 新增微信登录、用户中心等功能。

- [完整对接文档](./domestic/integration-guide.md) — 详细的配置和接口说明
- [常见问题](./domestic/faq.md) — 集成中的常见问题解答
