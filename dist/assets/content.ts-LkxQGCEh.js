import{j as n,R as L,r as x}from"./index-OoCF2Zy_.js";const R=`
  .subtitle-list {
  margin-top:13px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height:350px;
  }

  .subtitle-list::-webkit-scrollbar {
    width: 2px;
  }

  .subtitle-list::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 3px;
  }

  .subtitle-list::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  .subtitle-list::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  .empty-state {
    text-align: center;
    color: #9ca3af;
    padding: 48px 0;
    font-size: 14px;
  }

  .subtitle-item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    padding: 7px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
  }

  .subtitle-item:hover {
    background-color: #f9fafb;
  }

  .time-badge {
    font-size: 14px;
    color: #9333ea;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .time-badge:hover {
    color: #6b21a8;
  }

  .subtitle-content {
    font-size: 14px;
    color: #1f2937;
    flex: 1;
  }
`;function O({subtitles:e}){const t=o=>{console.log("点击时间戳，跳转到:",o);try{window.postMessage({type:"SEEK_TO_TIME",time:o},"*")}catch(r){console.error("发送跳转消息失败:",r)}};return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:R}),n.jsx("div",{className:"subtitle-list",children:e.length===0?n.jsx("div",{className:"empty-state",children:"暂无字幕数据"}):e.map(o=>n.jsxs("div",{className:"subtitle-item",children:[n.jsx("span",{className:"time-badge",onClick:()=>t(o.duration),title:`跳转到 ${o.startTime}`,children:o.startTime}),n.jsx("span",{className:"subtitle-content",children:o.content})]},o.id))})]})}function D(e){const t=Math.floor(e),o=Math.floor(t/60),r=t%60;return`${o.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`}function M(e){return e.map((t,o)=>({id:`subtitle-${o}`,startTime:D(t.from),endTime:D(t.to),duration:t.from,content:t.content,lang:t.lang}))}const $="b92c703b702e4de9a86dcd8b116cd55a.gyzJV9CBHDlNK3C7",P="https://open.bigmodel.cn/api/paas/v4/";async function _(e){var s,a;if(!e||e.length===0)throw new Error("字幕数据为空");const t=e[e.length-1].to;console.log(e,"subtitles");const o=e.map(i=>`[${i.from.toFixed(2)}s-${i.to.toFixed(2)}s] ${i.content}`).join(`
`),r=`
# Role
您是一位专业的视频内容分析师，擅长从字幕中提取核心主题并生成精确的时间轴章节。

# Task
分析提供的【带时间戳的字幕内容】，出找并提取其核心概念，生成一个包含 4 到 6 个关键词或简短关键短语的列表。
这些关键词或短语能够准确地涵盖所讨论的主要主题，且彼此之间不重叠。
这些关键词将有助于潜在观众快速了解视频的具体重点。
每个关键词的标题（2-4 个字），撰写一句简短描述，并标记准确的开始和结束时间。


# Input Data Format
输入数据包含时间戳和文本，格式如："[0.00s-3.50s] 第一条字幕内容"。
请严格依据输入中的时间戳来确定 startTime 和 endTime。

# Constraints
1. **数量**：必须生成 4 到 6 个主题,绝对不能超出6个。
2. **标题**：每个标题严格限制在 2 到 4 个汉字（或 1-3 个英文单词）之间，必须具体且名词化。
3. **时间准确性**：startTime 和 endTime 必须来源于输入的字幕信息，严禁编造。如果无法确定确切结束时间，可使用下一个章节的开始时间减 1 秒。
4. **覆盖度**：章节应均匀分布，覆盖视频的开头、中间和结尾。
5. **输出格式**：仅输出标准的 JSON 数组，不要包含 markdown 标记（如 \`\`\`json），不要有任何前言后语。

# Output JSON Schema
[
  {
    "title": "字符串 (短标题)",
    "startTime": 数字 (秒),
    "endTime": 数字 (秒),
    "description": "字符串 (一句话描述该章节核心内容)"
  }
]

# Subtitle Content
${o}
`;console.log(o,"subtitleText");try{const i=await fetch(`${P}chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${$}`,"Content-Type":"application/json"},body:JSON.stringify({model:"glm-4-flash",messages:[{role:"system",content:"你是一位专业的视频内容分析师，擅长从字幕中提取主题和关键内容点。"},{role:"user",content:r}],temperature:.7,max_tokens:2e3})});if(!i.ok){const l=await i.text();throw new Error(`API请求失败: ${i.status} - ${l}`)}const d=await i.json();console.log(d,"ai主题");const c=(a=(s=d.choices[0])==null?void 0:s.message)==null?void 0:a.content;if(!c)throw new Error("API返回内容为空");const u=c.match(/\[[\s\S]*\]/);if(!u)throw new Error("无法从返回内容中提取JSON");return JSON.parse(u[0]).map(l=>({...l,startTime:Math.max(0,Math.min(l.startTime,t)),endTime:Math.max(l.startTime,Math.min(l.endTime,t))}))}catch(i){throw console.error("生成视频主题失败:",i),i}}function H(e){const t=Math.floor(e),o=Math.floor(t/60),r=t%60;return`${o.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`}function A({themes:e,onThemeClick:t,isLoading:o,error:r}){return o?n.jsxs("div",{className:"loading-container",children:[n.jsxs("div",{className:"loading-dots",children:[n.jsx("div",{className:"loading-dot"}),n.jsx("div",{className:"loading-dot"}),n.jsx("div",{className:"loading-dot"})]}),n.jsx("div",{className:"loading-text",children:"正在生成主题..."})]}):r?n.jsxs("div",{className:"error-container",children:[n.jsx("div",{className:"error-icon",children:"⚠️"}),n.jsx("div",{className:"error-message",children:r})]}):e.length===0?n.jsxs("div",{className:"empty-container",children:[n.jsx("div",{className:"empty-icon",children:"📝"}),n.jsx("div",{className:"empty-message",children:"暂无主题数据"})]}):n.jsx(n.Fragment,{children:e.map((s,a)=>n.jsxs("div",{className:"theme-item",onClick:()=>t(s.startTime),style:{backgroundColor:B(a)},children:[n.jsxs("div",{className:"theme-row",children:[n.jsx("div",{className:"theme-color-dot",style:{backgroundColor:I(a)}}),n.jsxs("div",{className:"theme-title-wrapper",children:[n.jsx("div",{className:"theme-title",children:s.title}),n.jsx("div",{className:"theme-time-text",children:H(s.startTime)})]})]}),n.jsx("div",{className:"theme-description",children:s.description})]},a))})}function I(e){const t=["#ff9f9f","#9fd9ff","#d9b3ff","#fff2b3","#b3ffb3","#ffd9b3","#c2b3ff"];return t[e%t.length]}function B(e){const t=["#fff2f2","#f2f9ff","#f9f2ff","#fffdf2","#f2fff9","#fffaf2","#f2f2ff"];return t[e%t.length]}function F({tabs:e,activeTab:t,onTabChange:o}){var r,s;return n.jsxs("div",{className:"tabs-container",children:[n.jsx("div",{className:"tabs-list",children:e.map(a=>n.jsx("button",{onClick:()=>o(a.id),className:`tab-button ${t===a.id?"active":""}`,role:"tab","aria-selected":t===a.id,"aria-controls":`tab-panel-${a.id}`,children:a.label},a.id))}),n.jsx("div",{id:`tab-panel-${(r=e.find(a=>a.id===t))==null?void 0:r.id}`,role:"tabpanel",className:"tab-panel",children:(s=e.find(a=>a.id===t))==null?void 0:s.content})]})}function q(){const[e,t]=x.useState("subtitles"),[o,r]=x.useState([]),[s,a]=x.useState([]),[i,d]=x.useState(!1),[c,u]=x.useState(null);x.useEffect(()=>{const h=()=>{chrome.storage.local.get(["subtitleData"],b=>{console.log("=== 侧边栏: 字幕加载调试 ==="),console.log("从 storage 读取的字幕数据:",b.subtitleData);let f=[];if(b.subtitleData){const m=b.subtitleData;Array.isArray(m)?(f=m,console.log("数据格式: 直接数组")):m.data&&Array.isArray(m.data.subtitles)?(f=m.data.subtitles,console.log("数据格式: data.subtitles 数组")):m.body&&m.body.data&&Array.isArray(m.body.data.subtitles)?(f=m.body.data.subtitles,console.log("数据格式: body.data.subtitles 数组")):console.warn("⚠️ 字幕数据格式不匹配:",m)}else console.warn("⚠️ subtitleData 为空或不存在");console.log(`解析出 ${f.length} 条字幕`),f.length>0&&(console.log("前 3 条字幕示例:"),f.slice(0,3).forEach((m,j)=>{console.log(`  ${j+1}. [${m.from}s-${m.to}s] ${m.content.substring(0,50)}...`)})),console.log(`==================
`),r(f)})};h();let S;const E=(b,f)=>{if(f==="local"&&b.subtitleData){const m=JSON.stringify(b.subtitleData.newValue),j=JSON.stringify(b.subtitleData.oldValue);if(m===j){console.log("字幕数据未变化，跳过重新加载");return}console.log("字幕数据已更新，重新加载"),clearTimeout(S),S=setTimeout(()=>{h()},300)}};return chrome.storage.onChanged.addListener(E),()=>{clearTimeout(S),chrome.storage.onChanged.removeListener(E)}},[]);const p=async()=>{if(o.length===0){u("暂无字幕数据，无法生成主题");return}d(!0),u(null);try{const h=await _(o);console.log(h,"generatedThemes"),a(h),chrome.storage.local.set({themeData:h,themeTimestamp:Date.now()},()=>{console.log("主题数据已存储到 chrome.storage")})}catch(h){console.error("生成主题失败:",h),u(h instanceof Error?h.message:"生成主题失败，请稍后重试")}finally{d(!1)}},l=h=>{window.postMessage({type:"SEEK_TO_TIME",time:h},"*")},k=[{id:"subtitles",label:"字幕列表",content:n.jsx("div",{children:o.length?n.jsx("div",{style:{height:"350px"},children:n.jsx(O,{subtitles:M(o)})}):n.jsxs("div",{className:"loading-container",children:[n.jsxs("div",{className:"loading-dots",children:[n.jsx("div",{className:"loading-dot"}),n.jsx("div",{className:"loading-dot"}),n.jsx("div",{className:"loading-dot"})]}),n.jsx("div",{className:"loading-text",children:"加载中..."})]})})},{id:"theme",label:"视频主题",content:n.jsx("div",{className:"theme-panel",children:s.length===0&&!i&&!c?n.jsxs("div",{className:"theme-empty",children:[n.jsx("div",{className:"theme-empty-icon",children:"🎬"}),n.jsx("div",{className:"theme-empty-text",children:"点击下方按钮生成视频主题"}),n.jsx("button",{className:"generate-themes-button",onClick:p,children:"生成主题"})]}):n.jsxs(n.Fragment,{children:[n.jsx(A,{themes:s,onThemeClick:l,isLoading:i,error:c}),!i&&!c&&s.length>0&&n.jsx("button",{className:"regenerate-themes-button",onClick:p,children:"重新生成"}),c&&n.jsx("button",{className:"retry-themes-button",onClick:p,children:"重试"})]})})}];return n.jsx(F,{tabs:k,activeTab:e,onTabChange:t})}let w=null,g=!1;const T=e=>new Promise((t,o)=>{if(!document.body){o(new Error("Document body is not available"));return}const r=document.querySelector(e);if(r){t(r);return}const s=new window.MutationObserver(()=>{const a=document.querySelector(e);a&&(s.disconnect(),t(a))});s.observe(document.body,{childList:!0,subtree:!0})}),J=(e=3e3)=>new Promise(t=>{if(!document.body){console.log("Document body is not available, skipping stability check"),t();return}let o,r=Date.now();const s=new window.MutationObserver(()=>{r=Date.now()});s.observe(document.body,{childList:!0,subtree:!0}),o=setInterval(()=>{Date.now()-r>500&&(clearInterval(o),s.disconnect(),console.log("页面已稳定，准备插入 Shadow DOM"),t())},100)}),X=(e,t=15e3)=>new Promise((o,r)=>{if(e.readyState>=3){console.log("视频已加载完成"),o();return}console.log("等待视频加载完成...");const s=()=>{console.log("视频 canplay 事件触发"),d(),o()},a=()=>{console.log("视频 loadeddata 事件触发"),d(),o()},i=u=>{console.error("视频加载失败:",u),d(),r(new Error("视频加载失败"))},d=()=>{e.removeEventListener("canplay",s),e.removeEventListener("loadeddata",a),e.removeEventListener("error",i),c&&clearTimeout(c)};e.addEventListener("canplay",s),e.addEventListener("loadeddata",a),e.addEventListener("error",i);const c=setTimeout(()=>{console.log("等待视频加载超时，继续执行"),d(),o()},t)}),Y=(e,t)=>new Promise(o=>{console.log(`等待视频播放 ${t/1e3} 秒...`);const r=Date.now(),s=()=>{console.log("视频开始播放")},a=()=>{console.log("视频暂停")},i=()=>{Date.now()-r>=t?(console.log(`视频已播放 ${t/1e3} 秒`),d(),o()):requestAnimationFrame(i)},d=()=>{e.removeEventListener("play",s),e.removeEventListener("pause",a)};e.addEventListener("play",s),e.addEventListener("pause",a),e.currentTime>0&&!e.paused&&console.log("视频已在播放中"),i()});function C(){if(g){console.log("弹幕面板已在创建中，跳过");return}g=!0,(async()=>{try{console.log("开始等待页面元素加载..."),await T(".danmaku-box"),await T(".danmaku-wrap"),await T("video");const t=document.querySelector(".danmaku-box"),o=document.querySelector(".danmaku-wrap"),r=document.querySelector("video");if(!t){console.log("未找到 .danmaku-box 元素"),g=!1;return}if(!o){console.log("未找到 .danmaku-wrap 元素"),g=!1;return}if(!r){console.log("未找到 video 元素"),g=!1;return}if(w&&document.body.contains(w))return console.log("弹幕面板已存在，跳过创建"),g=!1,{shadowHost:w,shadowRoot:w.shadowRoot,updateSubtitle:()=>{console.warn("更新字幕功能在已存在实例中不可用")}};console.log("等待页面稳定..."),await J(5e3),console.log("等待视频加载完成..."),await X(r,15e3),console.log("视频完成"),console.log("等待视频播放5秒..."),await Y(r,5e3),console.log("视频已播放5秒，准备插入DOM");let s;try{s=o.getBoundingClientRect(),(s.width===0||s.height===0)&&(console.warn("弹幕容器尺寸异常，使用默认尺寸"),s={width:400,height:420})}catch(p){console.error("获取弹幕容器尺寸失败，使用默认尺寸:",p),s={width:400,height:420}}const a=document.createElement("div");a.id="danmaku-shadow-host",a.setAttribute("data-extension","learning-assistant"),Object.assign(a.style,{position:"relative",top:"0",left:"0",width:`${s.width}px`,maxHeight:"420px",zIndex:"9999",marginBottom:"20px",visibility:"hidden"});const i=a.attachShadow({mode:"open"}),d=document.createElement("style");d.textContent=`
    :host {
      display: block;
      width: 100%;
    }
    
    #react-root {
      width: 100%;
      height:420px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    #react-root::-webkit-scrollbar {
      width: 6px;
    }
    
    #react-root::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    #react-root::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }
    
    #react-root::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .tabs-container {
      width: 100%;
    }

    .tabs-list {
      position: relative;
      display: flex;
      align-items: center;
      background-color: rgba(243, 244, 246, 0.8);
      border-radius: 0.75rem;
      padding: 0.375rem;
      gap: 0.25rem;
    }

    .tab-button {
      position: relative;
      flex: 1;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: 0.5rem;
      transition: all 0.25s ease-out;
      border: none;
      background: transparent;
      cursor: pointer;
      appearance: none;
      outline: none;
      color: #6b7280;
    }

    .tab-button:hover {
      color: #374151;
      background-color: rgba(229, 231, 235, 0.5);
    }

    .tab-button.active {
      color: #111827;
      background-color: #ffffff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .tab-button:focus-visible {
      outline: 2px solid rgba(59, 130, 246, 0.5);
      outline-offset: 2px;
    }

    .tab-panel {
      margin-top: 1rem;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      gap: 16px;
    }

    .loading-dots {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .loading-dot {
      width: 8px;
      height: 8px;
      background-color: #6366f1;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
    }

    .loading-dot:nth-child(1) {
      animation-delay: 0s;
    }

    .loading-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .loading-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: translateY(0);
        opacity: 0.6;
      }
      40% {
        transform: translateY(-8px);
        opacity: 1;
      }
    }

    .loading-text {
      color: #9ca3af;
      font-size: 14px;
      font-weight: 400;
    }

    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chat-welcome {
      text-align: center;
      padding: 40px 20px;
      color: #6b7280;
      font-size: 14px;
    }

    .message {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.5;
    }

    .message.user {
      align-self: flex-end;
      background: #3b82f6;
      color: white;
    }

    .message.assistant {
      align-self: flex-start;
      background: #f3f4f6;
      color: #1f2937;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px;
      align-self: flex-start;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: typing 1.4s ease-in-out infinite;
    }

    .typing-indicator span:nth-child(1) {
      animation-delay: 0s;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 80%, 100% {
        transform: translateY(0);
        opacity: 0.6;
      }
      40% {
        transform: translateY(-6px);
        opacity: 1;
      }
    }

    .chat-input-container {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid #e5e7eb;
    }

    .chat-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      font-size: 13px;
      outline: none;
    }

    .chat-input:focus {
      border-color: #3b82f6;
    }

    .send-button {
      padding: 8px 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .relevant-subtitles {
      margin-top: 16px;
      padding: 16px;
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      border-radius: 8px;
    }

    .relevant-subtitles-header {
      font-size: 12px;
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 8px;
    }

    .relevant-subtitles-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .relevant-chunk {
      background: white;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #f3e8ff;
    }

    .chunk-time {
      font-size: 11px;
      font-family: monospace;
      color: #7c3aed;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .similarity {
      color: #9ca3af;
      font-size: 10px;
    }

    .chunk-content {
      font-size: 12px;
      color: #374151;
      line-height: 1.6;
    }

    .theme-panel {
      padding: 8px;
      height: 324px;
      overflow-y: auto;
    }

    .theme-panel::-webkit-scrollbar {
      width: 2px;
    }

    .theme-panel::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 2px;
    }

    .theme-panel::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
    }

    .theme-panel::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .theme-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 16px;
    }

    .theme-empty-icon {
      font-size: 48px;
    }

    .theme-empty-text {
      color: #6b7280;
      font-size: 14px;
    }

    .generate-themes-button,
    .regenerate-themes-button,
    .retry-themes-button {
      padding: 10px 24px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .generate-themes-button:hover,
    .regenerate-themes-button:hover,
    .retry-themes-button:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .regenerate-themes-button {
      margin-top: 12px;
      width: 100%;
    }

    .retry-themes-button {
      margin-top: 12px;
      width: 100%;
      background: #ef4444;
    }

    .retry-themes-button:hover {
      background: #dc2626;
    }

    .theme-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px;
    }

    .theme-item {
      border-radius: 12px;
      padding: 10px 11px;
      margin-bottom:11px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%);
      opacity: 0;
      transition: opacity 0.25s;
    }

    .theme-item:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 8px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08);
    }

    .theme-item:hover::before {
      opacity: 1;
    }

    .theme-row {
      display: flex;
      align-items: center;
      gap: 14px;
      position: relative;
      z-index: 1;
    }

    .theme-color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      transition: transform 0.25s;
    }

    .theme-item:hover .theme-color-dot {
      transform: scale(1.15);
    }

    .theme-title-wrapper {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 0;
    }

    .theme-title {
      font-size: 15px;
      font-weight: 600;
      color: #1a1a1a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.3px;
    }

    .theme-time-text {
      font-size: 10px;
      color: #666;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-weight: 500;
      white-space: nowrap;
      padding: 2px 8px;
      border-radius: 6px;
      transition: all 0.25s;
    }

    .theme-item:hover .theme-time-text {
      transform: scale(1.05);
    }

    .theme-description {
      font-size: 10px;
      color: #444;
      margin-top: 8px;
      padding-left: 28px;
      white-space: pre-line;
      position: relative;
      z-index: 1;
      letter-spacing: 0.2px;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 20px;
      gap: 12px;
    }

    .error-icon {
      font-size: 32px;
    }

    .error-message {
      color: #ef4444;
      font-size: 13px;
      text-align: center;
    }

    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 20px;
      gap: 12px;
    }

    .empty-icon {
      font-size: 32px;
    }

    .empty-message {
      color: #6b7280;
      font-size: 13px;
    }
  `;const c=document.createElement("div");c.id="react-root",i.appendChild(d),i.appendChild(c);try{if(o&&o.parentElement)o.insertAdjacentElement("beforebegin",a);else if(t&&t.parentElement)console.warn("danmakuWrap 不可用，尝试插入到 danmakuBox"),t.appendChild(a);else{console.error("无法找到合适的父容器插入 shadowHost"),g=!1;return}}catch(p){console.error("插入 shadowHost 失败，尝试使用 appendChild:",p);try{if(t&&t.parentElement)t.appendChild(a);else{console.error("danmakuBox 也不可用"),g=!1;return}}catch(l){console.error("使用 appendChild 也失败:",l),g=!1;return}}w=a;const u=L.createRoot(c);return u.render(n.jsx(q,{})),setTimeout(()=>{if(a&&document.body.contains(a))try{a.style.visibility="visible"}catch(p){console.error("设置可见性失败:",p)}else console.warn("shadowHost 不存在，无法设置可见性")},100),{shadowHost:a,shadowRoot:i,updateSubtitle:p=>{try{const l=M(p);u.render(n.jsx(O,{subtitles:l}))}catch(l){console.error("更新字幕失败:",l)}}}}catch(t){console.error("创建弹幕面板失败:",t),g=!1}})()}console.log("Content script 开始加载...");console.log("当前页面 URL:",window.location.href);let y=null;function v(e,t){console.log("准备发送数据到 background script:",e,t),chrome.runtime.sendMessage({type:"RESPONSE_BODY",url:e,body:t},o=>{console.log("Background script 响应:",o),chrome.runtime.lastError&&console.error("发送消息失败:",chrome.runtime.lastError)})}chrome.runtime.onMessage.addListener((e,t,o)=>{if(e.type==="GET_RESPONSE_BODY"&&e.url.includes("https://aisubtitle.hdslb.com/bfs/ai_subtitle/prod"))console.log("收到 background 请求响应体:",e.url),o({type:"RESPONSE_BODY",url:e.url,body:y||"No data intercepted"});else if(e.type==="SEEK_TO_TIME"){console.log("收到跳转请求，跳转到:",e.time);const r=document.querySelector("video");r?(r.currentTime=e.time,r.play(),o({success:!0,message:"已跳转到指定时间"})):o({success:!1,message:"未找到视频元素"})}return!0});window.addEventListener("message",e=>{if(e.data&&e.data.type==="SEEK_TO_TIME"){console.log("收到来自影子DOM的跳转请求:",e.data.time);const t=document.querySelector("video");t?(t.currentTime=e.data.time,t.play()):console.error("未找到视频元素")}});const N=window.fetch;window.fetch=async(e,t)=>{const o=typeof e=="string"?e:e.toString();if(!o.includes("https://aisubtitle.hdslb.com/bfs/ai_subtitle/prod"))return N(e,t);console.log("拦截到字幕接口请求:",o);try{const r=await N(e,t);console.log("收到响应:",r);const s=r.clone();console.log("克隆完成，准备读取数据...");const a=await s.json();return console.log("插件拿到真实数据:",a),y=a,v(o,a),r}catch(r){console.error("获取响应数据失败:",r);const s={code:0,message:"success",data:{subtitles:[{from:0,to:3e3,content:"这是一段模拟的字幕内容",lang:"zh"},{from:3e3,to:6e3,content:"这是第二段模拟的字幕内容",lang:"zh"}]}};return y=s,v(o,s),new Response(JSON.stringify(s),{status:200,headers:{"Content-Type":"application/json"}})}};const z=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,t,o,r,s){const a=typeof t=="string"?t:t.toString();if(console.log("XHR 请求:",a),a.includes("https://aisubtitle.hdslb.com/bfs/ai_subtitle/prod")){console.log("拦截到字幕接口请求 (XHR):",a);const i=this.send;this.send=function(d){const c=this.onreadystatechange,u=this.onload;this.onreadystatechange=function(p){if(this.readyState===4&&this.status===200)try{const l=JSON.parse(this.responseText);console.log("XHR 插件拿到真实数据:",l),y=l,v(a,l)}catch(l){console.error("解析 XHR 响应数据失败:",l);const k={code:0,message:"success",data:{subtitles:[{from:0,to:3e3,content:"这是一段模拟的字幕内容",lang:"zh"},{from:3e3,to:6e3,content:"这是第二段模拟的字幕内容",lang:"zh"}]}};y=k,v(a,k)}c&&c.call(this,p)},this.onload=function(p){try{const l=JSON.parse(this.responseText);console.log("XHR onload 插件拿到真实数据:",l),y=l,v(a,l)}catch(l){console.error("解析 XHR onload 响应数据失败:",l)}u&&u.call(this,p)},i.call(this,d)}}return z.call(this,e,t,o??!0,r,s)};console.log("拦截器设置完成");console.log("window.fetch 是否被覆盖:",window.fetch!==N);console.log("XMLHttpRequest.prototype.open 是否被覆盖:",XMLHttpRequest.prototype.open!==z);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{console.log("DOM 加载完成，创建弹幕面板"),C()}):(console.log("DOM 已就绪，直接创建弹幕面板"),C());const V=e=>{console.log("Content script executed",e),console.log("拦截器已设置完成")};export{V as onExecute};
