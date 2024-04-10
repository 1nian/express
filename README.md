### devDependencies
开发环境需要的依赖
```sh
npm i 包名 --save-dev
npm i 包名 -D
```
### dependencies
生产环境需要的依赖

### peerDependencies
编写插件时，依赖的包

### 项目说明
- 基于Express框架，编写的一些案例。
- 案例：
    - 文件切片 - /upload 目录 
    ```sh
    cd /upload
    http-server -p 3000
    ```