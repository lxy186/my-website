document.addEventListener('DOMContentLoaded', function() {
    // 微信二维码弹窗功能
    const wechatIcon = document.getElementById('wechat');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.querySelector('.close-modal');

    if (wechatIcon && wechatModal && closeModal) {
        wechatIcon.addEventListener('click', function(e) {
            e.preventDefault();
            wechatModal.style.display = 'block';
        });

        closeModal.addEventListener('click', function() {
            wechatModal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target == wechatModal) {
                wechatModal.style.display = 'none';
            }
        });
    }

    // AI聊天相关功能
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');

    if (chatMessages && userInput && sendButton) {
        // 处理发送消息
        function sendMessage() {
            const message = userInput.value.trim();
            if (message) {
                // 添加用户消息到右侧
                addMessage(message, 'user-message');
                
                // 生成AI回复
                const aiResponse = generateAIResponse(message);
                
                // 模拟AI思考时间
                setTimeout(() => {
                    addMessage(aiResponse, 'ai-message');
                }, 1000);
                
                // 清空输入框
                userInput.value = '';
                // 自动调整输入框高度
                adjustTextareaHeight();
            }
        }

        // 生成AI回复的函数
        function generateAIResponse(userMessage) {
            // 将用户消息转换为小写以便匹配
            const lowerMessage = userMessage.toLowerCase();
            
            // 预设的回复模式
            const responses = {
                '你是谁': '我是Lxy个人空间ai助手小L',
                '你叫什么': '我是Lxy个人空间ai助手小L',
                '你的名字': '我是Lxy个人空间ai助手小L',
                '李夏洋': getAboutInfo(),
                '介绍一下李夏洋': getAboutInfo(),
                '介绍一下': getAboutInfo(),
                '项目经历': getProjectInfo(),
                '联系方式': '你可以通过页面底部的社交媒体图标联系我',
                '你好': '你好！我是小L，很高兴为你服务',
                '在吗': '在的，我是AI助手小L，有什么可以帮你的吗？',
                '再见': '再见！如果还有问题随时问我哦',
                '谢谢': '不客气！很高兴能帮到你'
            };

            // 检查用户消息是否包含预设关键词
            for (let key in responses) {
                if (lowerMessage.includes(key)) {
                    return responses[key];
                }
            }

            // 如果没有匹配到预设回复，返回默认回复
            return '抱歉，我可能没有理解你的问题。你可以问我关于个人介绍、项目经历或者联系方式的问题。';
        }

        // 获取关于李夏洋的相关信息
        function getAboutInfo() {
            const aboutSection = document.querySelector('#about');
            if (!aboutSection) return '抱歉，没有找到相关信息';

            const infoLines = aboutSection.querySelectorAll('.info-line p');
            let aboutInfo = '以下是关于李夏洋的相关信息：\n\n';
            
            infoLines.forEach(line => {
                aboutInfo += line.textContent + '\n';
            });

            return aboutInfo.trim();
        }

        // 获取项目经历
        function getProjectInfo() {
            const projects = document.querySelectorAll('.project');
            if (!projects.length) return '抱歉，没有找到项目信息';

            let projectInfo = '以下是项目经历：\n\n';
            
            projects.forEach(project => {
                const title = project.querySelector('h4').textContent;
                const desc = project.querySelector('p').textContent;
                projectInfo += `${title}：\n${desc}\n\n`;
            });

            return projectInfo.trim();
        }

        // 添加消息到聊天界面
        function addMessage(content, className) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${className}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
            
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // 自动调整输入框高度
        function adjustTextareaHeight() {
            userInput.style.height = 'auto';
            userInput.style.height = userInput.scrollHeight + 'px';
        }

        // 发送按钮点击事件
        sendButton.addEventListener('click', sendMessage);

        // 输入框回车发送
        userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // 输入框内容变化时调整高度
        userInput.addEventListener('input', adjustTextareaHeight);
    }

    // 上传功能相关代码
    const uploadButton = document.getElementById('upload-file');
    const uploadModal = document.getElementById('upload-modal');
    const uploadModalClose = document.querySelector('.upload-modal-close');

    // 检查元素是否存在
    if (!uploadButton) {
        console.error('Upload button not found');
        return;
    }
    if (!uploadModal) {
        console.error('Upload modal not found');
        return;
    }
    if (!uploadModalClose) {
        console.error('Upload modal close button not found');
        return;
    }

    // 点击上传按钮显示弹窗
    uploadButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Upload button clicked'); // 调试日志
        uploadModal.style.display = 'block';
    });

    // 点击确定按钮关闭弹窗
    uploadModalClose.addEventListener('click', function() {
        uploadModal.style.display = 'none';
    });

    // 点击弹窗外部区域关闭弹窗
    window.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
        }
    });
}); 