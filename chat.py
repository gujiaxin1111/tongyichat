st.markdown("""<style>
    .stApp {
        max-width: 1000px;  /* 限制应用最大宽度为1000像素 */
        margin: 0 auto;  /* 设置水平居中 */
    }
    
    /* 隐藏Streamlit默认的菜单和页脚，使界面更简洁 */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* 设置标题居中显示，并使用深灰蓝色 */
    h1 {
        text-align: center;
        color: #1a2a3a;
    }
    
    /* 设置副标题样式，使用灰色并添加底部间距 */
    .subtitle {
        text-align: center;
        color: #6b7280;
        margin-bottom: 2rem;
    }
</style>""", unsafe_allow_html=True)

def create_openai_client():
   return OpenAI(
        api_key="sk-214a4ede5bc44e90bb3ef713b66e2113",  
          base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",  # 指向阿里云通义千问的API地址
        timeout=180.0  
 
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "assistant",
            "content": "你好！我是三亚学院的智能助手，基于阿里云通义千问大模型。请问有什么我可以帮助你的吗？"
        }
    ]
