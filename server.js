import express from 'express'; // 导入 Express 框架，用于构建 Web 服务器
import cors from 'cors'; // 导入 CORS 中间件，用于处理跨域请求
import OpenAI from 'openai'; // 导入 OpenAI 官方库，用于与 OpenAI API 交互
import { fileURLToPath } from 'url'; // 导入 url 模块的 fileURLToPath 函数，用于将文件 URL 转换为路径
import { dirname, join } from 'path'; // 导入 path 模块的 dirname 和 join 函数，用于处理文件和目录路径

console.log("---------------服务器初始化开始----------");

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

console.log(`当前路径：${_dirname}`);

const app = express();
const port = process.env.PORT || 3000;

console.log(`当前端口：${port}`);

app.use(cors());
app.use(express.json());
app.use(express.static(join(_dirname, 'public')));

console.log("中间层配置成功");

// 创建OpenAI 实例，配置API 密钥和基础URL
const openai = new OpenAI({
    apiKey: "sk-214a4ede5bc44e90bb3ef713b66e2113",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});
console.log("OpenAI实例创建成功");

// 定义一个POST 路由，处理/api/chat 接口的请求
app.post('/api/chat', async (req, res) => {
    console.log("==========收到聊天请求==========");
    console.log(`请求时间: ${new Date().toLocaleString()}`);

    try {
        const { messages } = req.body;

        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                ...messages
            ]
        });

        console.log("AI接口调用成功");

        const aiResponse = completion.choices[0].message.content;
        const aiRole = completion.choices[0].message.role;

        console.log(`AI回复内容: ${aiRole}: ${aiResponse.substring(0, 50)}...`); 
        res.json({
            message: aiResponse,
            role: aiRole
        }); 

        console.log("AI回复已发送给用户浏览器");

    } catch (error) {
        console.error("AI接口调用失败:", error);
    }
});
app.listen(port, () => {
    console.log(`服务器正在监听端口 ${port}`);
    console.log(`地址: http://localhost:${port}`);
});