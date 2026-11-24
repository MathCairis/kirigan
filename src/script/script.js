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

  // --- MÁSCARAS DE CNPJ E TELEFONE (CADASTRO E CONTATO) ---
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

  // --- VALIDAÇÃO DO FORMULÁRIO DE CADASTRO ---
  const registerForm = document.getElementById('registerForm');
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

  // --- PÁGINA DE PRODUTOS DINÂMICA (CARROSSEL, CORES E DESCRIÇÕES COMPLETAS) ---
  const productTitleEl = document.getElementById('productTitle');
  if (productTitleEl) {
    const productsCatalog = {
      'dual-matte': {
        id: 'dual-matte',
        title: 'Sleeves Dual Matte Kirigan c/100 unidades',
        shortTitle: 'Dual Matte Sleeves',
        mainThumb: 'src/images/Dual Matte/Leque de cores.png',
        images: [
          'src/images/Dual Matte/Leque de cores.png',
          'src/images/Dual Matte/Dual Matte.png',
          'src/images/Dual Matte/Camadas.jpg',
          'src/images/Dual Matte/Eitqueta Kirigan Shiro White FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Kage Black FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Akai Red FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Yami Purple FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Green FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Sora Blue FP.jpg',
          'src/images/Dual Matte/LY Kirigan Etiqueta Shogun Gold FP.jpg',
          'src/images/Dual Matte/Sleeve Kirigan Matsu Katana Silver FP.jpg'
        ],
        colors: [
          { name: 'Shiro White', hex: '#e5e5e5', imgIndex: 4 },
          { name: 'Kage Black', hex: '#1c1c1c', imgIndex: 5 },
          { name: 'Matsu Akai Red', hex: '#8b1e24', imgIndex: 6 },
          { name: 'Yami Purple', hex: '#6a2c91', imgIndex: 7 },
          { name: 'Matsu Green', hex: '#147a55', imgIndex: 8 },
          { name: 'Sora Blue', hex: '#00b4d8', imgIndex: 9 },
          { name: 'Shogun Gold', hex: '#c9a227', imgIndex: 10 },
          { name: 'Katana Silver', hex: '#b0b0b0', imgIndex: 11 }
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
        mainThumb: 'src/images/Perfect fit.png',
        images: [
          'src/images/Perfect fit.png',
          'src/images/Tecnologia de Coextrusão em Três Camadas.png',
          'src/images/Dual matte.png'
        ],
        colors: [],
        descriptionHTML: `
          <h3>PROTEÇÃO FORJADA PARA GRANDES BATALHAS</h3>
          <p>Como uma lâmina forjada para resistir, seus cards merecem uma proteção à altura. Desenvolvidos para jogadores e colecionadores exigentes. Com engenharia de ponta global e proteção superior, os <strong>Sleeves Perfect Fit Kirigan</strong> entregam o ajuste milimétrico ideal, blindando suas cartas contra poeira, umidade e o desgaste interno antes mesmo de entrarem no sleeve principal.</p>

          <h3>POR QUE O PERFECT FIT KIRIGAN É DIFERENTE?</h3>
          <ul>
            <li><strong>Ajuste Inteligente de 64,5 x 89,5 mm</strong><br>Enquanto a maioria dos modelos tradicionais do mercado utiliza 64 mm de largura — o que costuma esmagar ou dificultar o encaixe de cartas mais grossas (como <em>foils</em> especiais ou de jogos com maior gramatura) —, nossa medida de 64,5 mm foi projetada sob medida para acomodar cartas espessas com precisão, sem folgar nas cartas comuns.</li>
            <li><strong>Espessura Superior de 100 Microns</strong><br>Com 100 microns de densidade, oferece uma proteção consideravelmente acima dos <em>perfect fit</em> comuns do mercado, garantindo rigidez, durabilidade e uma barreira impenetrável.</li>
            <li><strong>Soldagem Ultrassônica de Alta Resistência</strong><br>Bordas seladas por ultrassom de alta intensidade, criando uma estrutura coesa que suporta a pressão constante de inserções e manuseios sem abrir ou esgarçar.</li>
            <li><strong>Engenharia de Camada Interna Ultra-Transparente</strong><br>Filme de alta claridade que garante visibilidade absoluta da arte e dos detalhes da carta, sem distorções visuais ou perda de brilho.</li>
            <li><strong>100% Livre de PVC e Ácidos</strong><br>Materiais de grau arquivístico que protegem a integridade das cartas a longo prazo, evitando reações químicas, amarelamento ou danos ao seu acervo.</li>
          </ul>

          <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
          <ul>
            <li><strong>Quantidade por Caixa:</strong> 100 Sleeves por embalagem.</li>
            <li><strong>Tamanho:</strong> Inner Size / Perfect Fit (64,5 x 89,5 mm) — Desenvolvido para proteção interna (<em>Double-Sleeve</em>) em <em>Magic: The Gathering, Pokémon TCG, Lorcana, One Piece TCG</em> e outros.</li>
            <li><strong>Espessura:</strong> 100 µm de alta densidade.</li>
            <li><strong>Material:</strong> 100% Polipropileno (PP) Virgem de Alta Claridade.</li>
            <li><strong>Proteção:</strong> Barreira total contra poeira, umidade e atrito interno.</li>
          </ul>
          <p><strong>Guarde seu deck. Domine o campo de batalha.</strong></p>
        `
      },
      'outer-sleeves': {
        id: 'outer-sleeves',
        title: 'Outer Sleeves Kirigan c/100 unidades',
        shortTitle: 'Outer Sleeves',
        mainThumb: 'src/images/Outer Sleeve.png',
        images: [
          'src/images/Outer Sleeve.png',
          'src/images/Ensaio de Tração de Filme Plástico Teal.png',
          'src/images/Caixas KIRIGAN com Leques Texturizados.png'
        ],
        colors: [],
        descriptionHTML: `
          <h3>PROTEÇÃO EXTERNA BLINDADA PARA O SEU DECK</h3>
          <p>A camada final de defesa para baralhos que exigem o nível máximo de segurança. Desenvolvidos especificamente para revestir baralhos que já utilizam o sistema de proteção dupla (Inner Sleeve + Standard Sleeve), os <strong>Sleeves Outer Kirigan</strong> garantem o encaixe perfeito sem folgas excessivas, blindando suas cartas contra poeira, umidade, líquidos e o desgaste severo de campeonatos de alto nível.</p>

          <h3>POR QUE O OUTER SLEEVE KIRIGAN É DIFERENTE?</h3>
          <ul>
            <li><strong>Dimensão Exata de 69 x 94,2 mm</strong><br>Projetados milimetricamente no tamanho ideal para sobreposição (<em>outer size</em>), vestindo perfeitamente o seu deck principal sem sobras incômodas de plástico, mantendo a firmeza e o manuseio impecáveis.</li>
            <li><strong>Espessura Superior de 230 Microns</strong><br>Com 230 microns de alta densidade, oferecem uma rigidez e proteção consideravelmente acima dos protetores externos comuns do mercado, criando uma verdadeira armadura contra rasgos e amassados.</li>
            <li><strong>Traseira Texturizada para Shuffle Feel Superior</strong><br>Verso com acabamento texturizado tridimensional de toque suave, desenvolvido para eliminar o deslize indesejado e proporcionar um embaralhamento (<em>shuffle</em>) incrivelmente fluido, macio e preciso na mesa.</li>
            <li><strong>Soldagem Ultrassônica de Alta Resistência</strong><br>Bordas seladas por ultrassom de alta intensidade, criando uma estrutura coesa que suporta a pressão constante de embaralhamentos intensos sem abrir ou esgarçar.</li>
            <li><strong>Transparência Cristalina de Alta Definição</strong><br>Filme frontal com claridade impecável que assegura visibilidade total da arte dos sleeves internos e das cartas, sem nenhum efeito embaçado.</li>
            <li><strong>100% Livre de PVC e Ácidos</strong><br>Materiais de grau arquivístico que protegem a integridade das cartas a longo prazo, evitando reações químicas, amarelamento ou danos ao seu acervo.</li>
          </ul>

          <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
          <ul>
            <li><strong>Quantidade por Caixa:</strong> 100 Sleeves por embalagem.</li>
            <li><strong>Tamanho:</strong> Outer Size / Protetor Externo (69 x 94,2 mm) — Desenvolvido para revestir baralhos já protegidos com Standard Sleeves em <em>Magic: The Gathering, Pokémon TCG, Lorcana, One Piece TCG</em> e outros.</li>
            <li><strong>Espessura:</strong> 230 µm de alta densidade.</li>
            <li><strong>Material:</strong> 100% Polipropileno (PP) Virgem de Alta Resistência.</li>
            <li><strong>Proteção:</strong> Barreira externa total contra líquidos, poeira, sujeira e atrito severo.</li>
          </ul>
          <p><strong>Guarde seu deck. Domine o campo de batalha.</strong></p>
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
    document.getElementById('productDescriptionContent').innerHTML = currentProduct.descriptionHTML;

    const quoteBtn = document.getElementById('quoteBtn');
    if (quoteBtn) {
      quoteBtn.href = 'contato.html';
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
        });
        colorSwatchesEl.appendChild(swatch);
      });
    } else {
      colorGroupEl.style.display = 'none';
    }

    // Mostrar mais / Mostrar menos da Descrição
    const descContentEl = document.getElementById('productDescriptionContent');
    const toggleDescBtn = document.getElementById('toggleDescriptionBtn');
    toggleDescBtn.addEventListener('click', () => {
      const isCollapsed = descContentEl.classList.toggle('collapsed');
      toggleDescBtn.textContent = isCollapsed ? 'Mostrar mais' : 'Mostrar menos';
    });

    // Produtos Relacionados (sem preços)
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
        `;
        relatedGridEl.appendChild(cardLink);
      });
  }

  // --- PÁGINA DE CONTATO (DÚVIDAS DA EMPRESA) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const duvidasInput = document.getElementById('duvidas');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const cnpjDigits = cnpjInput ? cnpjInput.value.replace(/\D/g, '') : '';
      const email = document.getElementById('email').value.trim();
      const responsavel = document.getElementById('responsavel').value.trim();
      const telefoneDigits = telefoneInput ? telefoneInput.value.replace(/\D/g, '') : '';
      const duvidas = duvidasInput ? duvidasInput.value.trim() : '';

      if (nome.length < 2) {
        alert('Por favor, informe a razão social da empresa.');
        return;
      }

      if (cnpjDigits.length > 0 && cnpjDigits.length !== 14) {
        alert('Se informado, o CNPJ deve conter exatamente 14 dígitos numéricos.');
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

      if (telefoneDigits.length < 10 || telefoneDigits.length > 11) {
        alert('Por favor, informe um número de telefone/WhatsApp válido com DDD.');
        return;
      }

      if (duvidas.length < 5) {
        alert('Por favor, escreva a sua dúvida antes de enviar.');
        return;
      }

      alert('Mensagem enviada com sucesso! Em breve nossa equipe responderá à sua dúvida.');
      contactForm.reset();
    });
  }
});