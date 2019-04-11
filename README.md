# vue-ip-input
An ip input component
Vue写的IP输入框组件，提供ip输入
1. 限制输入范围为0-255的数字
2. 父组件数据为数组，支持多个IP输入框，通过传入数据的索引idx，在子组件数据更新后同步到父组件
3. 键盘判断，tab，right arrow，enter自动跳转下一个地址。
4. 输入完成自动跳转下一个地址（输入三位255，或者输入大于25）
5. focus自动select
6. blur时未设置值，自动填充默认255.
7. 修复中文输入法下键盘码识别问题

# 使用
请看main.js中 ipInput配置
