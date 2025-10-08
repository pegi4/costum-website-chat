(() => {
    if (window.__local_demo_chat_loaded) { console.log('Demo chat already loaded'); return; }
    window.__local_demo_chat_loaded = true;
  
    // Styles are now loaded from external styles.css file
  
    // WIDGET
    const container = document.createElement('div'); container.id = 'localDemoChat';
    container.innerHTML = `
      <div class="ldc-toggle" title="Odpri demo chat">
        <span>💬</span>
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
      
      // Start hiding toggle button with smooth animation
      toggle.classList.add('hide');
      
      // Show window and start its animation
      win.style.display = 'flex';
      setTimeout(() => {
        win.classList.add('show');
      }, 50);
      
      // Show close button with delay for smooth sequence
      setTimeout(() => {
        closeBtn.style.display = 'flex';
        setTimeout(() => {
          closeBtn.classList.add('show');
        }, 10);
      }, 300);
      
      // Focus input after animations complete
      setTimeout(() => {
        input.focus();
      }, 600);
    }
  
    function closeChat() {
      isOpen = false;
      
      // Start hiding close button first
      closeBtn.classList.remove('show');
      
      // Start hiding window
      win.classList.remove('show');
      
      // Show toggle button after window starts closing
      setTimeout(() => {
        toggle.classList.remove('hide');
      }, 200);
      
      // Complete cleanup after all animations
      setTimeout(() => {
        win.style.display = 'none';
        closeBtn.style.display = 'none';
      }, 500);
    }
  
    toggle.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    
    // Add pulse animation to toggle button after a delay
    setTimeout(() => {
      if (!isOpen) {
        toggle.classList.add('pulse');
      }
    }, 3000);
  
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
        toggle.classList.remove('pulse');
        openChat();
        setTimeout(() => {
          appendMsg('Zdravo! Sem VitaminKlinikAI asistent. Kako ti lahko pomagam danes?');
        }, 800);
      }
    }, 5000);
  
  })();
  