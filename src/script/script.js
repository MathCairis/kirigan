function changeImage(src) {
  const mainImage = document.getElementById('mainDisplayImage');
  if (mainImage) {
    mainImage.src = src;
  }

  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    if (thumb.src === src) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // --- MENU LATERAL ---
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuOverlay = document.getElementById('sideMenuOverlay');

  function openMenu() {
    sideMenu.classList.add('active');
    sideMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sideMenu.classList.remove('active');
    sideMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (sideMenuOverlay) sideMenuOverlay.addEventListener('click', closeMenu);

  // --- SUB-MENU (SOBRE / PRODUTOS) ---
  const submenuToggles = document.querySelectorAll('.submenu-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = toggle.closest('.has-submenu');
      if (parentLi) {
        parentLi.classList.toggle('open');
      }
    });
  });

  // --- MÁSCARAS E VALIDAÇÕES DO CADASTRO ---
  const registerForm = document.getElementById('registerForm');
  const cnpjInput = document.getElementById('cnpj');
  const telefoneInput = document.getElementById('telefone');

  if (cnpjInput) {
    cnpjInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 14) value = value.slice(0, 14);

      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');

      e.target.value = value;
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)/, '($1');
      }

      e.target.value = value;
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const razaoSocial = document.getElementById('razaoSocial').value.trim();
      const cnpj = cnpjInput.value.replace(/\D/g, '');
      const email = document.getElementById('email').value.trim();
      const responsavel = document.getElementById('responsavel').value.trim();
      const telefone = telefoneInput.value.replace(/\D/g, '');

      if (razaoSocial.length <= 3) {
        alert('A Razão Social deve ter mais de 3 caracteres.');
        return;
      }

      if (cnpj.length !== 14) {
        alert('O CNPJ deve conter exatamente 14 dígitos numéricos.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, informe um endereço de e-mail válido.');
        return;
      }

      if (responsavel.length < 3) {
        alert('O Nome do Responsável deve conter pelo menos 3 caracteres.');
        return;
      }

      if (telefone.length < 10 || telefone.length > 11) {
        alert('Por favor, digite um número de telefone/celular válido com DDD.');
        return;
      }

      alert('Cadastro realizado com sucesso! Em breve nossa equipe entrará em contato.');
      registerForm.reset();
    });
  }

  // --- PÁGINA DE PRODUTOS DINÂMICA (CARROSSEL E CORES SINCRONIZADAS) ---
  const productTitleEl = document.getElementById('productTitle');
  if (productTitleEl) {
    const productsCatalog = {
      'dual-matte': {
        id: 'dual-matte',
        title: 'Sleeves Dual Matte Kirigan c/100 unidades',
        shortTitle: 'Dual Matte Sleeves',
        price: 'R$ 44,57',
        mainThumb: 'src/images/Eitqueta Kirigan Shiro White FP.jpg',
        images: [
          'src/images/Eitqueta Kirigan Shiro White FP.jpg',
          'src/images/Sleeve Kirigan Matsu Kage Black FP.jpg',
          'src/images/Sleeve Kirigan Matsu Akai Red FP.jpg',
          'src/images/Sleeve Kirigan Matsu Yami Purple FP.jpg',
          'src/images/Sleeve Kirigan Matsu Green FP.jpg',
          'src/images/Sleeve Kirigan Matsu Sora Blue FP.jpg',
          'src/images/LY Kirigan Etiqueta Shogun Gold FP.jpg',
          'src/images/Sleeve Kirigan Matsu Katana Silver FP.jpg'
        ],
        colors: [
          { name: 'Shiro White', hex: '#e5e5e5', imgIndex: 0 },
          { name: 'Kage Black', hex: '#1c1c1c', imgIndex: 1 },
          { name: 'Matsu Akai Red', hex: '#8b1e24', imgIndex: 2 },
          { name: 'Yami Purple', hex: '#6a2c91', imgIndex: 3 },
          { name: 'Matsu Green', hex: '#147a55', imgIndex: 4 },
          { name: 'Sora Blue', hex: '#00b4d8', imgIndex: 5 },
          { name: 'Shogun Gold', hex: '#c9a227', imgIndex: 6 },
          { name: 'Katana Silver', hex: '#b0b0b0', imgIndex: 7 }
        ],
        descriptionHTML: `
          <h3>PROTEÇÃO FORJADA PARA GRANDES BATALHAS</h3>
          <p>Como uma lâmina forjada para resistir, seus cards merecem uma proteção à altura. Desenvolvidos para jogadores e colecionadores exigentes. Com engenharia de ponta global e proteção superior, os <strong>Sleeves Dual Matte Kirigan</strong> entregam o equilíbrio perfeito entre <em>shuffle</em> fluido, resistência extrema e conservação absoluta das suas cartas.</p>
          
          <h3>POR QUE O DUAL MATTE KIRIGAN É DIFERENTE?</h3>
          <ul>
            <li><strong>Espessura Superior de 250 Microns</strong><br><strong>10% acima</strong> dos principais padrões do mercado. Proporciona rigidez incomparável, maior durabilidade e blindagem contra o desgaste pesado de torneios e partidas diárias.</li>
            <li><strong>Soldagem Ultrassônica de Alta Resistência</strong><br>Bordas seladas por ultrassom de alta intensidade, criando uma estrutura coesa que suporta a pressão constante de embaralhamentos intensos sem abrir ou esgarçar.</li>
            <li><strong>Traseira em Camada Tripla (Triple-Layer Back)</strong>
              <ul>
                <li><strong>Camada Fosca Tridimensional:</strong> Toque suave e textura otimizada que elimina reflexos e garante um deslize perfeito na mesa.</li>
                <li><strong>Camada de Alta Resistência:</strong> Blindagem avançada contra vincos, rasgos e perfurações acidentais.</li>
                <li><strong>Camada de Bloqueio de Luz:</strong> Opacidade total que impede qualquer transparência no verso, garantindo conformidade absoluta e segurança em torneios oficiais.</li>
              </ul>
            </li>
            <li><strong>100% Livre de PVC e Ácidos</strong><br>Materiais de grau arquivístico que protegem a integridade das cartas a longo prazo, evitando reações químicas, amarelamento ou danos ao seu acervo.</li>
          </ul>

          <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
          <ul>
            <li><strong>Quantidade por Caixa:</strong> 100 Sleeves por embalagem.</li>
            <li><strong>Tamanho:</strong> Standard Size (66,5x91,5mm) — Compatível com <em>Magic: The Gathering, Pokémon TCG, Lorcana, One Piece TCG</em> e outros.</li>
            <li><strong>Espessura Frontal:</strong> 100µm</li>
            <li><strong>Espessura Traseira:</strong> 150µm</li>
            <li><strong>Material:</strong> 100% Polipropileno (PP) Virgem.</li>
            <li><strong>Nível de Opacidade:</strong> 100% Opaco (Aprovado para Torneios).</li>
          </ul>
          <p><strong>Guarde seu deck. Domine o campo de batalha.</strong></p>
        `
      },
      'perfect-fit': {
        id: 'perfect-fit',
        title: 'Perfect Fit Kirigan c/100 unidades',
        shortTitle: 'Perfect Fit',
        price: 'R$ 22,00',
        mainThumb: 'src/images/Perfect fit.png',
        images: [
          'src/images/Perfect fit.png',
          'src/images/Tecnologia de Coextrusão em Três Camadas.png',
          'src/images/Dual matte.png'
        ],
        colors: [],
        descriptionHTML: `
          <h3>CAMADA INTERNA CIRÚRGICA DE ALTA PRECISÃO</h3>
          <p>Projetados para envolver cada carta como uma segunda pele invisível, os <strong>Perfect Fit Kirigan</strong> oferecem ajuste milimétrico para sistemas de <em>Double Sleeving</em>, protegendo contra umidade, poeira e atrito interno.</p>
          
          <h3>POR QUE ESCOLHER O PERFECT FIT KIRIGAN?</h3>
          <ul>
            <li><strong>Ajuste Milimétrico (64x89mm)</strong><br>Desenvolvido para deslizar suavemente para dentro de qualquer sleeve Standard Size sem criar bolhas de ar excessivas ou deformar o card.</li>
            <li><strong>Transparência Cristalina de Alta Definição</strong><br>Preserva o brilho original de cartas <em>Foil</em> e artes especiais sem distorção de cor.</li>
            <li><strong>100% Livre de PVC e Ácidos</strong><br>Polipropileno de grau arquivístico seguro para armazenamento de longo prazo.</li>
          </ul>

          <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
          <ul>
            <li><strong>Quantidade por Pacote:</strong> 100 Inner Sleeves.</li>
            <li><strong>Tamanho:</strong> 64x89mm (Standard Inner Size).</li>
            <li><strong>Espessura:</strong> 60µm de alta flexibilidade e resistência.</li>
            <li><strong>Material:</strong> 100% Polipropileno (PP) Virgem Transparente.</li>
          </ul>
        `
      },
      'outer-sleeves': {
        id: 'outer-sleeves',
        title: 'Outer Sleeves Kirigan c/100 unidades',
        shortTitle: 'Outer Sleeves',
        price: 'R$ 29,90',
        mainThumb: 'src/images/Outer Sleeve.png',
        images: [
          'src/images/Outer Sleeve.png',
          'src/images/Ensaio de Tração de Filme Plástico Teal.png',
          'src/images/Caixas KIRIGAN com Leques Texturizados.png'
        ],
        colors: [],
        descriptionHTML: `
          <h3>ESCUDO EXTERNO REFORÇADO PARA TORNEIOS</h3>
          <p>Criados para proteger sleeves ilustrados, edições limitadas e decks competitivos submetidos a horas intensas de jogo, os <strong>Outer Sleeves Kirigan</strong> funcionam como uma armadura externa de alta durabilidade.</p>
          
          <h3>DIFERENCIAIS DE ENGENHARIA</h3>
          <ul>
            <li><strong>Proteção Externa para Art Sleeves</strong><br>Evita o descascamento, arranhões e desgaste nas bordas dos seus sleeves principais.</li>
            <li><strong>Soldagem Ultrassônica Reforçada</strong><br>Construção estrutural projetada para suportar embaralhamentos contínuos sem rasgar.</li>
            <li><strong>100% Livre de PVC e Ácidos</strong><br>Transparência óptica superior que mantém a nitidez das artes do verso.</li>
          </ul>

          <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
          <ul>
            <li><strong>Quantidade por Embalagem:</strong> 100 Outer Sleeves.</li>
            <li><strong>Tamanho:</strong> 69x94mm (Oversized / Triple Sleeve).</li>
            <li><strong>Material:</strong> 100% Polipropileno (PP) Virgem.</li>
          </ul>
        `
      }
    };

    const productKeys = ['dual-matte', 'perfect-fit', 'outer-sleeves'];
    const urlParams = new URLSearchParams(window.location.search);
    const requestedKey = urlParams.get('produto');
    const currentKey = productsCatalog[requestedKey] ? requestedKey : 'dual-matte';
    const currentProduct = productsCatalog[currentKey];

    document.title = `KIRIGAN - ${currentProduct.shortTitle}`;
    productTitleEl.textContent = currentProduct.title;
    document.getElementById('productPrice').textContent = currentProduct.price;
    document.getElementById('productDescriptionContent').innerHTML = currentProduct.descriptionHTML;

    // Atualiza link do botão "Fazer orçamento" com o produto e a cor selecionada
    const quoteBtn = document.getElementById('quoteBtn');
    function updateQuoteLink() {
      if (!quoteBtn) return;
      const colorText = (currentProduct.colors && currentProduct.colors.length > 0)
        ? ` - Cor: ${document.getElementById('selectedColorName').textContent}`
        : '';
      const assunto = encodeURIComponent(`Orçamento: ${currentProduct.title}${colorText}`);
      quoteBtn.href = `contato.html?assunto=${assunto}`;
    }

    const currentIndex = productKeys.indexOf(currentKey);
    const prevKey = productKeys[(currentIndex - 1 + productKeys.length) % productKeys.length];
    const nextKey = productKeys[(currentIndex + 1) % productKeys.length];
    document.getElementById('prevProductBtn').href = `produtos.html?produto=${prevKey}`;
    document.getElementById('nextProductBtn').href = `produtos.html?produto=${nextKey}`;

    let currentImgIndex = 0;
    const mainImgEl = document.getElementById('productMainImg');
    const thumbsRowEl = document.getElementById('productThumbsRow');

    function updateGalleryImage(index) {
      currentImgIndex = (index + currentProduct.images.length) % currentProduct.images.length;
      mainImgEl.src = currentProduct.images[currentImgIndex];
      
      document.querySelectorAll('.product-thumb-item').forEach((el, idx) => {
        el.classList.toggle('active', idx === currentImgIndex);
      });

      if (currentProduct.colors && currentProduct.colors.length > 0) {
        const matchedColor = currentProduct.colors.find(c => c.imgIndex === currentImgIndex);
        if (matchedColor) {
          document.querySelectorAll('.color-swatch').forEach(s => {
            if (s.title === matchedColor.name) {
              s.classList.add('active');
              document.getElementById('selectedColorName').textContent = matchedColor.name;
            } else {
              s.classList.remove('active');
            }
          });
        }
      }
      updateQuoteLink();
    }

    thumbsRowEl.innerHTML = '';
    currentProduct.images.forEach((imgSrc, idx) => {
      const thumbDiv = document.createElement('div');
      thumbDiv.className = `product-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumbDiv.innerHTML = `<img src="${imgSrc}" alt="Miniatura ${idx + 1}">`;
      thumbDiv.addEventListener('click', () => updateGalleryImage(idx));
      thumbsRowEl.appendChild(thumbDiv);
    });
    updateGalleryImage(0);

    document.getElementById('galleryPrevBtn').addEventListener('click', () => updateGalleryImage(currentImgIndex - 1));
    document.getElementById('galleryNextBtn').addEventListener('click', () => updateGalleryImage(currentImgIndex + 1));

    const colorGroupEl = document.getElementById('colorSelectorGroup');
    const colorSwatchesEl = document.getElementById('colorSwatches');
    const selectedColorNameEl = document.getElementById('selectedColorName');

    if (currentProduct.colors && currentProduct.colors.length > 0) {
      colorGroupEl.style.display = 'block';
      colorSwatchesEl.innerHTML = '';
      currentProduct.colors.forEach((color, idx) => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = `color-swatch ${idx === 0 ? 'active' : ''}`;
        swatch.style.backgroundColor = color.hex;
        swatch.title = color.name;
        swatch.setAttribute('aria-label', color.name);

        swatch.addEventListener('click', () => {
          document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          selectedColorNameEl.textContent = color.name;
          if (typeof color.imgIndex === 'number') {
            updateGalleryImage(color.imgIndex);
          }
          updateQuoteLink();
        });
        colorSwatchesEl.appendChild(swatch);
      });
    } else {
      colorGroupEl.style.display = 'none';
    }

    updateQuoteLink();

    // Mostrar mais / Mostrar menos da Descrição (Em Português)
    const descContentEl = document.getElementById('productDescriptionContent');
    const toggleDescBtn = document.getElementById('toggleDescriptionBtn');
    toggleDescBtn.addEventListener('click', () => {
      const isCollapsed = descContentEl.classList.toggle('collapsed');
      toggleDescBtn.textContent = isCollapsed ? 'Mostrar mais' : 'Mostrar menos';
    });

    // Produtos Relacionados
    const relatedGridEl = document.getElementById('relatedProductsGrid');
    relatedGridEl.innerHTML = '';
    productKeys
      .filter(key => key !== currentKey)
      .forEach(key => {
        const item = productsCatalog[key];
        const cardLink = document.createElement('a');
        cardLink.href = `produtos.html?produto=${item.id}`;
        cardLink.className = 'related-card';
        cardLink.innerHTML = `
          <div class="related-card-img">
            <img src="${item.mainThumb}" alt="${item.shortTitle}">
          </div>
          <h4>${item.shortTitle}</h4>
          <span>${item.price}</span>
        `;
        relatedGridEl.appendChild(cardLink);
      });
  }
});

// --- PÁGINA DE CONTATO E ORÇAMENTO ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const addProductBtn = document.getElementById('addProductBtn');
    const productSelect = document.getElementById('productSelect');
    const productQtyInput = document.getElementById('productQtyInput');
    const descricaoPedido = document.getElementById('descricaoPedido');

    // Se o usuário veio da página de produtos clicando em "Fazer orçamento", captura na URL
    const urlParams = new URLSearchParams(window.location.search);
    const assuntoUrl = urlParams.get('assunto');
    if (assuntoUrl && descricaoPedido) {
      descricaoPedido.value = decodeURIComponent(assuntoUrl) + '\n';
    }

    // Botão Adicionar produto na caixa de texto
    if (addProductBtn && productSelect && productQtyInput && descricaoPedido) {
      addProductBtn.addEventListener('click', () => {
        const productName = productSelect.value;
        const qty = productQtyInput.value;
        const itemLine = `${qty}x ${productName}\n`;

        if (descricaoPedido.value.trim() === '') {
          descricaoPedido.value = itemLine;
        } else {
          descricaoPedido.value += itemLine;
        }

        productQtyInput.value = '1';
      });
    }

    // Validação e Envio do Pedido
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const responsavel = document.getElementById('responsavel').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const descricao = descricaoPedido.value.trim();

      if (nome.length < 2) {
        alert('Por favor, informe seu nome ou razão social.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, informe um endereço de e-mail válido.');
        return;
      }

      if (responsavel.length < 2) {
        alert('Por favor, informe o nome do contato responsável.');
        return;
      }

      if (telefone.length < 10) {
        alert('Por favor, informe um número de telefone/WhatsApp válido com DDD.');
        return;
      }

      if (descricao.length < 5) {
        alert('Por favor, adicione pelo menos um produto ou detalhe na descrição do pedido.');
        return;
      }

      alert('Pedido / Orçamento enviado com sucesso! Nossa equipe entrará em contato em breve.');
      contactForm.reset();
    });
  }