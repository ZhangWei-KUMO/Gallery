# TS 项目配置

```json
  "compilerOptions": {
    "outDir": "./dists",
    "noImplicitAny": true,
    "module": "esnext",
    "target": "es5",
    "jsx": "react",
    // 允许js文件被编译
    "allowJs": true,
    // 模块引用有classic node两种
    "forceConsistentCasingInFileNames": true,
    // 当函数中的所有代码路径均未返回值时，报告错误。
    "noImplicitReturns": true,
     // 索引对象缺少索引签名，报告错误。
    "suppressImplicitAnyIndexErrors": true,
  },
```