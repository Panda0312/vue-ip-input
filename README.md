# vue-ip-input
An ip input component

This IPInput consists of 4 input element and seperates by a span with configurable content.(see the structure in template config)

Vue写的IP输入框组件，提供ip输入
1. 限制输入范围为0-255的数字
2. 父组件数据为数组，支持多个IP输入框，通过传入数据的索引idx，在子组件数据更新后同步到父组件
3. 键盘判断，tab，right arrow，enter自动跳转下一个地址。
4. 输入完成自动跳转下一个地址（输入三位数字范围在0-255，或者输入大于25, 或者输入25且第三个数字大于5）
5. focus自动select
6. blur时未设置值，自动填充默认255.
7. 修复中文输入法下键盘码识别问题

1. input value limit to 0-255
2. support mutiple ip input synchronising data with parent
3. key press checking, the key 'tab','right arrow','enter' will trigger focus event of next input while 'left arrow','backspace' when input value is empty will trigger focus event of previous input
4. auto checking the end of input. (input three digits value within 0-255, input two digits value > 25, or input 25 and press any digits with the value over 5) 
5. auto select all digits of the focused input when focus
6. set default value when blur(lost focus)
7. fix the keyCode issue of the digits key press always return the keyCode of 229 when system input is set to Chinese.

# 使用
请看main.js中 ipInput配置
