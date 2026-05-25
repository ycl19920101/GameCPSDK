---
sidebar_position: 2
title: 接口加签说明
---

# 接口加签说明

所有小游戏平台的服务端接口均使用相同的加签规则。

## 签名规则

### 秘钥

1. 生产环境秘钥在猕猴桃运营部门发送的出包邮件中提供
2. 测试环境联调使用的秘钥为：`fad6dc91b80a27ab89cf5e755e5d17f7`

### 签名生成规则

1. 去除参数中键（key）为 `null`、`""` 的元素
2. 去除参数中值（value）为 `null`、`""`、`"null"` 的元素
3. 将参数键值对以 key 的升序排序
4. 将排序后的键值对以 `key1=value1&key2=value2&key3=value3` 的格式拼接为**参数字符串**
5. 计算签名伪代码：`MD5(MD5(参数字符串) + 秘钥)`

### 在参数中携带签名

1. 目前交互接口都是 POST 方法，以 JSON 方式传参
2. 在 JSON 中添加 `sign` 字段：`{key1: value1, key2: value2, sign: SIGN}`

### 注意事项

1. 测试环境与生产环境的秘钥不同
2. 不同游戏的秘钥不同

## 签名 Demo

### MD5 校验

`"123456"` 计算出的 MD5 值为 `"e10adc3949ba59abbe56e057f20f883e"`

### 完整签名示例

**加签前 JSON 参数：**

```json
{
  "packageCode": "51d29599b7fff6d29b082dd967e0f453",
  "userId": "163035574128435200"
}
```

**排序拼接后参数字符串：**

```
packageCode=51d29599b7fff6d29b082dd967e0f453&userId=163035574128435200
```

**使用测试秘钥：** `a07b7c2a96da502ae04a7885705a9fcb`

**加签后 JSON 参数：**

```json
{
  "packageCode": "51d29599b7fff6d29b082dd967e0f453",
  "userId": "163035574128435200",
  "sign": "6a007a089cc3f2f06c7a8133f361611f"
}
```

## Java 示例代码

```java
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.crypto.SecureUtil;
import org.springframework.util.StringUtils;

import java.util.Map;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toMap;

public class SignUtil {

    /**
     * 使用秘钥，计算【MAP】类型的参数签名
     */
    public static String signOfMap(Map<String, String> paramMap, String secretKey) {
        String paramString = buildParamString(paramMap);
        return SecureUtil.md5(SecureUtil.md5(paramString) + secretKey);
    }

    /**
     * 使用秘钥，计算【对象】类型的参数签名
     */
    public static <T> String signOfBean(T param, String secretKey) {
        Map<String, Object> objectMap = BeanUtil.beanToMap(param);
        Map<String, String> paramMap = objectMap.entrySet().stream()
            .collect(toMap(it -> it.getKey(), it -> String.valueOf(it.getValue())));
        String paramString = buildParamString(paramMap);
        return SecureUtil.md5(SecureUtil.md5(paramString) + secretKey);
    }

    /**
     * 按规则拼接参数
     */
    private static String buildParamString(Map<String, String> paramMap) {
        paramMap.remove("sign");
        return paramMap.entrySet().stream()
            .filter(it -> StringUtils.hasText(it.getKey()))
            .filter(it -> StringUtils.hasText(it.getValue()) && !"null".equals(it.getValue()))
            .map(it -> it.getKey() + "=" + it.getValue())
            .sorted(String::compareTo)
            .collect(joining("&"));
    }
}
```
