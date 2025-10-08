(() => {
    if (window.__local_demo_chat_loaded) { console.log('Demo chat already loaded'); return; }
    window.__local_demo_chat_loaded = true;
  
    // STYLES
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    
    #localDemoChat { 
      position: fixed; 
      right: 20px; 
      bottom: 20px; 
      width: 380px; 
      max-width: 90vw; 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      z-index: 2147483647; 
    }
    
    #localDemoChat .ldc-toggle { 
      position: absolute; 
      right: 0; 
      top: -60px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff; 
      padding: 12px 16px; 
      border-radius: 50px; 
      cursor: pointer; 
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      border: none;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    #localDemoChat .ldc-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
    }
    
    #localDemoChat .ldc-window { 
      background: #fff; 
      border-radius: 20px; 
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1); 
      overflow: hidden; 
      display: flex; 
      flex-direction: column; 
      height: 500px; 
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    #localDemoChat .ldc-window.show {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    
    #localDemoChat .ldc-header { 
      padding: 16px 20px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff; 
      display: flex; 
      align-items: center; 
      gap: 12px;
      position: relative;
    }
    
    #localDemoChat .ldc-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      pointer-events: none;
    }
    
    #localDemoChat .ldc-header .logo {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    
    #localDemoChat .ldc-header .brand {
      flex: 1;
    }
    
    #localDemoChat .ldc-header .brand h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    #localDemoChat .ldc-header .brand p {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
    }
    
    #localDemoChat .ldc-header .status {
      font-size: 11px;
      opacity: 0.8;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 8px;
      border-radius: 12px;
    }
    
    #localDemoChat .ldc-body { 
      padding: 20px; 
      flex: 1; 
      overflow-y: auto; 
      background: #f8fafc;
      scroll-behavior: smooth;
    }
    
    #localDemoChat .ldc-body::-webkit-scrollbar {
      width: 4px;
    }
    
    #localDemoChat .ldc-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    #localDemoChat .ldc-body::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
    
    #localDemoChat .ldc-input { 
      display: flex; 
      gap: 12px; 
      padding: 16px 20px; 
      border-top: 1px solid #e2e8f0; 
      background: #fff; 
      align-items: center;
    }
    
    #localDemoChat input.ldc-text { 
      flex: 1; 
      padding: 12px 16px; 
      border-radius: 25px; 
      border: 1px solid #e2e8f0; 
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
      background: #f8fafc;
    }
    
    #localDemoChat input.ldc-text:focus {
      border-color: #667eea;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    #localDemoChat .ldc-send {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    #localDemoChat .ldc-send:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    .ldc-msg { 
      margin: 12px 0; 
      display: flex; 
      animation: slideIn 0.3s ease-out;
    }
    
    .ldc-msg.user { 
      justify-content: flex-end; 
    }
    
    .ldc-msg .bubble { 
      max-width: 80%; 
      padding: 12px 16px; 
      border-radius: 18px; 
      background: #fff; 
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      word-wrap: break-word;
    }
    
    .ldc-msg.user .bubble { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff; 
      border-bottom-right-radius: 6px;
    }
    
    .ldc-msg.bot .bubble {
      border-bottom-left-radius: 6px;
    }
    
    .ldc-msg .timestamp {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
      text-align: right;
    }
    
    .ldc-msg.user .timestamp {
      text-align: left;
    }
    
    .ldc-sys { 
      font-size: 13px; 
      color: #64748b; 
      margin: 16px 0;
      padding: 12px 16px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 12px;
      border-left: 3px solid #667eea;
    }
    
    .ldc-suggest { 
      display: flex; 
      gap: 8px; 
      flex-wrap: wrap; 
      margin-top: 12px; 
    }
    
    .ldc-suggest button { 
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 20px; 
      cursor: pointer; 
      font-size: 12px;
      color: #475569;
      transition: all 0.2s ease;
    }
    
    .ldc-suggest button:hover {
      background: #e2e8f0;
      transform: translateY(-1px);
    }
    
    .ldc-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 60px;
    }
    
    .ldc-typing .dot {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }
    
    .ldc-typing .dot:nth-child(1) { animation-delay: -0.32s; }
    .ldc-typing .dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes typing {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .ldc-close {
      position: absolute;
      right: 16px;
      bottom: 16px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }
    
    .ldc-close:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
    }
    `;
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  
    // WIDGET
    const container = document.createElement('div'); container.id = 'localDemoChat';
    container.innerHTML = `
      <div class="ldc-toggle" title="Odpri demo chat">
        <span>💬</span>
        <span>Demo Chat</span>
      </div>
      <div class="ldc-window" style="display:none">
        <div class="ldc-header">
          <div class="logo">🤖</div>
          <div class="brand">
            <h3>VitaminKlinikAI</h3>
            <p>AI asistent</p>
          </div>
          <div class="status">Online</div>
        </div>
        <div class="ldc-body" id="ldc-body">
          <div class="ldc-sys">Zdravo! Piši vprašanje ali napiši <em>help</em> za možnosti.</div>
        </div>
        <div class="ldc-input">
          <input class="ldc-text" placeholder="Start a new message..." />
          <button id="ldc-send">Pošlji</button>
        </div>
      </div>
      <button class="ldc-close" title="Zapri chat" style="display:none">×</button>
    `;
    document.body.appendChild(container);
  
    const toggle = container.querySelector('.ldc-toggle');
    const win = container.querySelector('.ldc-window');
    const body = container.querySelector('#ldc-body');
    const input = container.querySelector('.ldc-text');
    const sendBtn = container.querySelector('#ldc-send');
    const closeBtn = container.querySelector('.ldc-close');
  
    let isOpen = false;
  
    function openChat() {
      isOpen = true;
      win.style.display = 'flex';
      setTimeout(() => {
        win.classList.add('show');
        toggle.style.display = 'none';
        closeBtn.style.display = 'flex';
      }, 10);
      input.focus();
    }
  
    function closeChat() {
      isOpen = false;
      win.classList.remove('show');
      setTimeout(() => {
        win.style.display = 'none';
        toggle.style.display = 'flex';
        closeBtn.style.display = 'none';
      }, 400);
    }
  
    toggle.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
  
    // Simple dataset (edit these entries as needed)
    const FAQS = [
      {k:['kako', 'narocim', 'kako naročiti','kako naročiti'], a: 'Naročilo lahko oddate preko košarice na strani. Če potrebujete pomoč, mi pošljite številko izdelka.'},
      {k:['dostava','koji','kako hitro'], a: 'Dostava običajno traja 2-5 delovnih dni. Standardna cena dostave je 3.99€. Za večje naročilo je možna brezplačna dostava.'},
      {k:['vračilo','refund','vrnjeno'], a: 'Vračila sprejemamo v 14 dneh od prejema izdelka. Pošljite mi številko naročila in vam ustvarim RMA.'},
      {k:['garancija','garanc'], a: 'Garancija velja 24 mesecev, razen pri potrošnih izdelkih. Za več podrobnosti poglejte naše pogoje poslovanja.'}
    ];
  
    const PRODUCTS = [
      {id:'P1001', title:'Magnezij prah 150g', price:'29.90 €', url:'#'},
      {id:'P1002', title:'Vitamin D3 60 kapsul', price:'12.70 €', url:'#'},
      {id:'P1003', title:'Omega 3 120 kapsul', price:'19.90 €', url:'#'}
    ];
  
    // Helper render
    function appendMsg(text, who='bot') {
      const msg = document.createElement('div');
      msg.className = 'ldc-msg ' + (who==='user' ? 'user' : 'bot');
      
      const b = document.createElement('div'); 
      b.className = 'bubble'; 
      b.innerHTML = text;
      msg.appendChild(b);
      
      // Add timestamp
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      const now = new Date();
      const timeStr = now.toLocaleTimeString('sl-SI', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      timestamp.textContent = timeStr;
      msg.appendChild(timestamp);
      
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }
    
    // Typing indicator
    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'ldc-msg bot';
      typing.innerHTML = `
        <div class="ldc-typing">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      `;
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      return typing;
    }
    
    function hideTyping(typingElement) {
      if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
      }
    }
  
    // Simple intent matching
    function handleIncoming(raw) {
      const text = raw.trim();
      if (!text) return;
      appendMsg(escapeHtml(text), 'user');
  
      const lower = text.toLowerCase();
      
      // Show typing indicator
      const typing = showTyping();
      
      // Simulate response delay
      setTimeout(() => {
        hideTyping(typing);
        processResponse(lower, text);
      }, 800 + Math.random() * 1200);
    }
    
    function processResponse(lower, originalText) {
      // help
      if (/\bhelp\b|kaj|možnosti|options/.test(lower)) {
        const helpMsg = `
          <strong>Možnosti:</strong>
          <ul style="margin: 8px 0; padding-left: 16px;">
            <li><strong>status [številka]</strong> — preveri status naročila (simulirano)</li>
            <li><strong>priporočila</strong> — prijedlog izdelkov</li>
            <li><strong>help</strong> — ta meni</li>
            <li>Vprašaj poljubno (npr. vračilo, dostava)</li>
          </ul>
        `;
        appendMsg(helpMsg); return;
      }
  
      // order lookup: match digits like 12345 or ORD123
      const ordMatch = originalText.match(/\b(?:order|narocilo|naročilo|št|#)?\s*([A-Za-z0-9\-]{4,20})\b/i);
      if (ordMatch && /\d/.test(ordMatch[1])) {
        const id = ordMatch[1];
        // simulated response
        const resp = `Najdeno naročilo <strong>${escapeHtml(id)}</strong>: <br>
          Status: <strong>V obdelavi</strong><br>
          Predvidena dostava: 3 dni<br>
          Povezava: <a href="https://example.com/orders/${encodeURIComponent(id)}" target="_blank">https://example.com/orders/${escapeURIComponent(id)}</a>`;
        appendMsg(resp); return;
      }
  
      // recommendations
      if (/\b(priporoč|recommend|predlagaj|iskal)\b/.test(lower)) {
        let html = '<div><strong>Predlagam naslednje izdelke:</strong><div class="ldc-suggest">';
        for (const p of PRODUCTS) {
          html += `<button onclick="window.__local_demo_handle_product && window.__local_demo_handle_product('${p.id}')">${escapeHtml(p.title)} — ${escapeHtml(p.price)}</button>`;
        }
        html += '</div></div>';
        appendMsg(html); return;
      }
  
      // FAQ fuzzy match by keyword
      for (const f of FAQS) {
        for (const kw of f.k) {
          if (lower.includes(kw)) { appendMsg(escapeHtml(f.a)); return; }
        }
      }
  
      // default
      appendMsg('Oprosti, tega ne razumem popolnoma. Napiši <em>help</em> za predloge ali poskusi s "status 12345" ali "priporočila".');
    }
  
    // product button handler (exposed globally so inline onclick works)
    window.__local_demo_handle_product = function(pid) {
      const p = PRODUCTS.find(x=>x.id===pid);
      if (!p) return;
      appendMsg(`<strong>Dodajam predlog:</strong> ${escapeHtml(p.title)} — <a href="${p.url}" target="_blank">Oglej si</a>`);
    };
  
    // escape
    function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
  
    sendBtn.addEventListener('click', ()=>{ 
      if (input.value.trim()) {
        handleIncoming(input.value); 
        input.value=''; 
        input.focus(); 
      }
    });
    
    input.addEventListener('keydown', (e)=>{ 
      if(e.key==='Enter'){ 
        e.preventDefault(); 
        sendBtn.click(); 
      } 
    });
    
    // Auto-open chat after a delay for demo purposes
    setTimeout(() => {
      if (!isOpen) {
        openChat();
        setTimeout(() => {
          appendMsg('Zdravo! Sem VitaminKlinikAI asistent. Kako ti lahko pomagam danes?');
        }, 500);
      }
    }, 2000);
  
  })();
  