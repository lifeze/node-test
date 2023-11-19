# 使用 Node.js 官方镜像作为基础镜像
FROM node:latest
 
# 设置工作目录
WORKDIR /usr/src/app
 
# 将 package.json 和 package-lock.json 复制到工作目录
# COPY package*.json ./

# 将项目文件复制到工作目录
COPY . ./
 
# 安装依赖
RUN npm install

RUN npm run build
 
# 暴露应用端口
# EXPOSE 3000
 
# 运行 NestJS 应用
CMD npm run start:prod