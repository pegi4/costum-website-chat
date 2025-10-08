(() => {
    if (window.__local_demo_chat_loaded) { console.log('Demo chat already loaded'); return; }
    window.__local_demo_chat_loaded = true;
  
    // Styles are now loaded from external styles.css file
  
    // WIDGET
    const container = document.createElement('div'); container.id = 'localDemoChat';
    container.innerHTML = `
      <div class="suggestion-chips" role="group" aria-label="Quick question suggestions">
      </div>
      <div class="ldc-toggle" title="Odpri demo chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 58 69" fill="none">
          <g clip-path="url(#clip0_1050_2013)">
            <path d="M29.5277 1.05386L58 17.7474V51.7427C48.3333 57.4047 38.6667 63.0722 29 68.7451C19.3333 63.0722 9.66667 57.4047 0 51.7427V17.7474L29 0.745117L29.5277 1.05499V1.05386ZM30.0637 3.85465V32.7765C30.5184 31.0532 31.0482 29.3786 31.6529 27.7528C33.9609 21.4826 37.5614 15.7685 42.2205 10.9815L30.0626 3.85352L30.0637 3.85465ZM30.0637 49.6883V49.78C31.1366 45.6538 32.726 41.6797 34.7942 37.9521C39.1952 30.0743 45.7817 23.5522 54.7787 18.3452L44.1253 12.0993C39.4881 16.7499 35.9117 22.3497 33.6423 28.5143C31.2287 35.3109 30.0181 42.4767 30.0648 49.6895L30.0637 49.6883ZM27.934 32.7753V3.85465L15.7771 10.9827C20.4357 15.77 24.0363 21.484 26.3448 27.754C26.9496 29.379 27.4793 31.0532 27.934 32.7765V32.7753ZM55.8703 20.1931C47.1947 25.204 40.8576 31.4672 36.6398 39.0154C33.1917 45.3765 31.0871 52.379 30.4569 59.5881C32.3192 55.133 34.8824 51.0051 38.0492 47.3611C43.1231 41.7293 49.1574 37.0451 55.8703 33.5274V20.1931ZM55.8703 35.9882C49.7712 39.2932 44.2833 43.6199 39.6453 48.7805C35.5022 53.5595 32.4487 59.184 30.6971 65.2629L55.869 50.5031V35.9859L55.8703 35.9882ZM2.12855 33.5205C8.84297 37.0379 14.8786 41.7225 19.9532 47.3553C23.1161 50.9957 25.6768 55.1188 27.5384 59.5684C26.9067 52.3665 24.803 45.3712 21.3579 39.0165C17.1413 31.4718 10.8019 25.2039 2.12855 20.1942V33.5205ZM27.3076 65.2699C25.5558 59.1868 22.5011 53.5584 18.3558 48.776C13.7169 43.6144 8.2279 39.2867 2.12742 35.9812V50.5077L27.3076 65.2699ZM3.21903 18.3463C12.216 23.5522 18.8025 30.0697 23.2035 37.9534C25.2692 41.6777 26.8573 45.6477 27.9305 49.7695C27.9859 42.531 26.7764 35.3385 24.3566 28.5167C22.0868 22.352 18.5101 16.752 13.8724 12.1016L3.21903 18.3474V18.3463Z" fill="white"></path>
          </g>
          <defs>
            <clipPath id="clip0_1050_2013">
              <rect width="58" height="68" fill="white" transform="translate(0 0.745117)"></rect>
            </clipPath>
          </defs>
        </svg>
        <span>Potrebujete pomoč?</span>
      </div>
      <div class="ldc-window" style="display:none">
        <div class="ldc-header">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 58 69" fill="none">
              <g clip-path="url(#clip0_1050_2013)">
                <path d="M29.5277 1.05386L58 17.7474V51.7427C48.3333 57.4047 38.6667 63.0722 29 68.7451C19.3333 63.0722 9.66667 57.4047 0 51.7427V17.7474L29 0.745117L29.5277 1.05499V1.05386ZM30.0637 3.85465V32.7765C30.5184 31.0532 31.0482 29.3786 31.6529 27.7528C33.9609 21.4826 37.5614 15.7685 42.2205 10.9815L30.0626 3.85352L30.0637 3.85465ZM30.0637 49.6883V49.78C31.1366 45.6538 32.726 41.6797 34.7942 37.9521C39.1952 30.0743 45.7817 23.5522 54.7787 18.3452L44.1253 12.0993C39.4881 16.7499 35.9117 22.3497 33.6423 28.5143C31.2287 35.3109 30.0181 42.4767 30.0648 49.6895L30.0637 49.6883ZM27.934 32.7753V3.85465L15.7771 10.9827C20.4357 15.77 24.0363 21.484 26.3448 27.754C26.9496 29.379 27.4793 31.0532 27.934 32.7765V32.7753ZM55.8703 20.1931C47.1947 25.204 40.8576 31.4672 36.6398 39.0154C33.1917 45.3765 31.0871 52.379 30.4569 59.5881C32.3192 55.133 34.8824 51.0051 38.0492 47.3611C43.1231 41.7293 49.1574 37.0451 55.8703 33.5274V20.1931ZM55.8703 35.9882C49.7712 39.2932 44.2833 43.6199 39.6453 48.7805C35.5022 53.5595 32.4487 59.184 30.6971 65.2629L55.869 50.5031V35.9859L55.8703 35.9882ZM2.12855 33.5205C8.84297 37.0379 14.8786 41.7225 19.9532 47.3553C23.1161 50.9957 25.6768 55.1188 27.5384 59.5684C26.9067 52.3665 24.803 45.3712 21.3579 39.0165C17.1413 31.4718 10.8019 25.2039 2.12855 20.1942V33.5205ZM27.3076 65.2699C25.5558 59.1868 22.5011 53.5584 18.3558 48.776C13.7169 43.6144 8.2279 39.2867 2.12742 35.9812V50.5077L27.3076 65.2699ZM3.21903 18.3463C12.216 23.5522 18.8025 30.0697 23.2035 37.9534C25.2692 41.6777 26.8573 45.6477 27.9305 49.7695C27.9859 42.531 26.7764 35.3385 24.3566 28.5167C22.0868 22.352 18.5101 16.752 13.8724 12.1016L3.21903 18.3474V18.3463Z" fill="white"></path>
              </g>
              <defs>
                <clipPath id="clip0_1050_2013">
                  <rect width="58" height="68" fill="white" transform="translate(0 0.745117)"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="brand">
            <h3>VitaminKlinikAI</h3>
            <p>AI asistent</p>
          </div>
          <div class="status">Online</div>
        </div>
        <div class="ldc-body" id="ldc-body">
        </div>
        <div class="ldc-input">
          <input class="ldc-text" placeholder="Začnite novo sporočilo..." />
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
    const suggestionChips = container.querySelector('.suggestion-chips');
  
    let isOpen = false;
    let openedViaSuggestion = false;
    
    // Suggestion chips configuration
    const suggestionConfig = {
      texts: [
        "Kako zmanjšati stres?",
        "Kateri vitamini so najboljši?",
        "Kako izboljšati imunost?",
        "Kaj je najboljše za energijo?",
        "Kako se osredotočiti bolje?",
        "Kateri dodatek za sklepe?",
        "Kako izboljšati prebavo?"
      ],
      currentIndex: 0,
      visibleCount: 2
    };
    
    // Create suggestion chips
    function createSuggestionChips() {
      suggestionChips.innerHTML = '';
      const startIndex = suggestionConfig.currentIndex;
      
      for (let i = 0; i < suggestionConfig.visibleCount; i++) {
        const textIndex = (startIndex + i) % suggestionConfig.texts.length;
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = suggestionConfig.texts[textIndex];
        chip.setAttribute('role', 'button');
        chip.setAttribute('tabindex', '0');
        chip.setAttribute('aria-label', `Ask: ${suggestionConfig.texts[textIndex]}`);
        
        chip.addEventListener('click', () => handleSuggestionClick(suggestionConfig.texts[textIndex]));
        chip.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSuggestionClick(suggestionConfig.texts[textIndex]);
          }
        });
        
        suggestionChips.appendChild(chip);
      }
    }
    
    // Handle suggestion chip click
    function handleSuggestionClick(text) {
      if (!isOpen) {
        openedViaSuggestion = true;
        openChat();
        setTimeout(() => {
          input.value = text;
          handleIncoming(text);
          input.value = '';
        }, 700);
      }
    }
    
    // Show suggestion chips with animation
    function showSuggestionChips() {
      if (!isOpen) {
        suggestionChips.classList.add('show');
      }
    }
    
    // Hide suggestion chips
    function hideSuggestionChips() {
      suggestionChips.classList.remove('show');
    }
    
    // Rotate suggestion texts
    function rotateSuggestions() {
      suggestionConfig.currentIndex = (suggestionConfig.currentIndex + suggestionConfig.visibleCount) % suggestionConfig.texts.length;
      createSuggestionChips();
    }
  
    function openChat() {
      isOpen = true;
      
      // Hide suggestion chips immediately
      hideSuggestionChips();
      
      // Start hiding toggle button with smooth fade-out (no movement)
      toggle.classList.add('hide');
      
      // Wait longer before showing chat window to prevent conflicts
      setTimeout(() => {
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
          // Add initial bot message only if not opened via suggestion
          if (!openedViaSuggestion) {
            appendMsg('Zdravo! Sem VitaminKlinikAI asistent. Kako ti lahko pomagam danes?');
          }
        }, 600);
      }, 300); // Increased delay to prevent jumping effect
    }
  
    function closeChat() {
      isOpen = false;
      openedViaSuggestion = false; // Reset flag when closing
      
      // Start hiding close button first
      closeBtn.classList.remove('show');
      
      // Start hiding window
      win.classList.remove('show');
      
      // Complete cleanup after window animation
      setTimeout(() => {
        win.style.display = 'none';
        closeBtn.style.display = 'none';
      }, 500);
      
      // Wait longer before showing toggle button to prevent jumping
      setTimeout(() => {
        toggle.classList.remove('hide');
        
        // Show suggestion chips after toggle button appears smoothly
        setTimeout(() => {
          showSuggestionChips();
        }, 300);
      }, 800); // Increased delay to prevent jumping effect
    }
  
    toggle.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    
    // Initialize suggestion chips
    createSuggestionChips();
    
    // Show suggestion chips after a delay
    setTimeout(() => {
      if (!isOpen) {
        showSuggestionChips();
      }
    }, 2000);
    
    // Add pulse animation to toggle button after a delay
    setTimeout(() => {
      if (!isOpen) {
        toggle.classList.add('pulse');
      }
    }, 3000);
    
    // Rotate suggestions every 8 seconds
    setInterval(() => {
      if (!isOpen && suggestionChips.classList.contains('show')) {
        rotateSuggestions();
      }
    }, 8000);
  
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
      
      // Add bot logo for bot messages
      if (who === 'bot') {
        const logo = document.createElement('div');
        logo.className = 'bot-logo';
        logo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 58 69" fill="none">
          <g clip-path="url(#clip0_1050_2013)">
            <path d="M29.5277 1.05386L58 17.7474V51.7427C48.3333 57.4047 38.6667 63.0722 29 68.7451C19.3333 63.0722 9.66667 57.4047 0 51.7427V17.7474L29 0.745117L29.5277 1.05499V1.05386ZM30.0637 3.85465V32.7765C30.5184 31.0532 31.0482 29.3786 31.6529 27.7528C33.9609 21.4826 37.5614 15.7685 42.2205 10.9815L30.0626 3.85352L30.0637 3.85465ZM30.0637 49.6883V49.78C31.1366 45.6538 32.726 41.6797 34.7942 37.9521C39.1952 30.0743 45.7817 23.5522 54.7787 18.3452L44.1253 12.0993C39.4881 16.7499 35.9117 22.3497 33.6423 28.5143C31.2287 35.3109 30.0181 42.4767 30.0648 49.6895L30.0637 49.6883ZM27.934 32.7753V3.85465L15.7771 10.9827C20.4357 15.77 24.0363 21.484 26.3448 27.754C26.9496 29.379 27.4793 31.0532 27.934 32.7765V32.7753ZM55.8703 20.1931C47.1947 25.204 40.8576 31.4672 36.6398 39.0154C33.1917 45.3765 31.0871 52.379 30.4569 59.5881C32.3192 55.133 34.8824 51.0051 38.0492 47.3611C43.1231 41.7293 49.1574 37.0451 55.8703 33.5274V20.1931ZM55.8703 35.9882C49.7712 39.2932 44.2833 43.6199 39.6453 48.7805C35.5022 53.5595 32.4487 59.184 30.6971 65.2629L55.869 50.5031V35.9859L55.8703 35.9882ZM2.12855 33.5205C8.84297 37.0379 14.8786 41.7225 19.9532 47.3553C23.1161 50.9957 25.6768 55.1188 27.5384 59.5684C26.9067 52.3665 24.803 45.3712 21.3579 39.0165C17.1413 31.4718 10.8019 25.2039 2.12855 20.1942V33.5205ZM27.3076 65.2699C25.5558 59.1868 22.5011 53.5584 18.3558 48.776C13.7169 43.6144 8.2279 39.2867 2.12742 35.9812V50.5077L27.3076 65.2699ZM3.21903 18.3463C12.216 23.5522 18.8025 30.0697 23.2035 37.9534C25.2692 41.6777 26.8573 45.6477 27.9305 49.7695C27.9859 42.531 26.7764 35.3385 24.3566 28.5167C22.0868 22.352 18.5101 16.752 13.8724 12.1016L3.21903 18.3474V18.3463Z" fill="white"></path>
          </g>
          <defs>
            <clipPath id="clip0_1050_2013">
              <rect width="58" height="68" fill="white" transform="translate(0 0.745117)"></rect>
            </clipPath>
          </defs>
        </svg>`;
        msg.appendChild(logo);
      }
      
      const b = document.createElement('div'); 
      b.className = 'bubble'; 
      b.innerHTML = text;
      msg.appendChild(b);
      
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }
    
    // Typing indicator
    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'ldc-msg bot';
      
      // Add bot logo
      const logo = document.createElement('div');
      logo.className = 'bot-logo';
      logo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 58 69" fill="none">
        <g clip-path="url(#clip0_1050_2013)">
          <path d="M29.5277 1.05386L58 17.7474V51.7427C48.3333 57.4047 38.6667 63.0722 29 68.7451C19.3333 63.0722 9.66667 57.4047 0 51.7427V17.7474L29 0.745117L29.5277 1.05499V1.05386ZM30.0637 3.85465V32.7765C30.5184 31.0532 31.0482 29.3786 31.6529 27.7528C33.9609 21.4826 37.5614 15.7685 42.2205 10.9815L30.0626 3.85352L30.0637 3.85465ZM30.0637 49.6883V49.78C31.1366 45.6538 32.726 41.6797 34.7942 37.9521C39.1952 30.0743 45.7817 23.5522 54.7787 18.3452L44.1253 12.0993C39.4881 16.7499 35.9117 22.3497 33.6423 28.5143C31.2287 35.3109 30.0181 42.4767 30.0648 49.6895L30.0637 49.6883ZM27.934 32.7753V3.85465L15.7771 10.9827C20.4357 15.77 24.0363 21.484 26.3448 27.754C26.9496 29.379 27.4793 31.0532 27.934 32.7765V32.7753ZM55.8703 20.1931C47.1947 25.204 40.8576 31.4672 36.6398 39.0154C33.1917 45.3765 31.0871 52.379 30.4569 59.5881C32.3192 55.133 34.8824 51.0051 38.0492 47.3611C43.1231 41.7293 49.1574 37.0451 55.8703 33.5274V20.1931ZM55.8703 35.9882C49.7712 39.2932 44.2833 43.6199 39.6453 48.7805C35.5022 53.5595 32.4487 59.184 30.6971 65.2629L55.869 50.5031V35.9859L55.8703 35.9882ZM2.12855 33.5205C8.84297 37.0379 14.8786 41.7225 19.9532 47.3553C23.1161 50.9957 25.6768 55.1188 27.5384 59.5684C26.9067 52.3665 24.803 45.3712 21.3579 39.0165C17.1413 31.4718 10.8019 25.2039 2.12855 20.1942V33.5205ZM27.3076 65.2699C25.5558 59.1868 22.5011 53.5584 18.3558 48.776C13.7169 43.6144 8.2279 39.2867 2.12742 35.9812V50.5077L27.3076 65.2699ZM3.21903 18.3463C12.216 23.5522 18.8025 30.0697 23.2035 37.9534C25.2692 41.6777 26.8573 45.6477 27.9305 49.7695C27.9859 42.531 26.7764 35.3385 24.3566 28.5167C22.0868 22.352 18.5101 16.752 13.8724 12.1016L3.21903 18.3474V18.3463Z" fill="white"></path>
        </g>
        <defs>
          <clipPath id="clip0_1050_2013">
            <rect width="58" height="68" fill="white" transform="translate(0 0.745117)"></rect>
          </clipPath>
        </defs>
      </svg>`;
      typing.appendChild(logo);
      
      // Add typing animation
      const typingDiv = document.createElement('div');
      typingDiv.className = 'ldc-typing';
      typingDiv.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      `;
      typing.appendChild(typingDiv);
      
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
          if (lower.includes(kw)) { 
            appendMsg(f.a); // Don't escape HTML for FAQ answers
            return; 
          }
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
    
  
  })();
  