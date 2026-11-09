// Função para trocar a imagem principal da galeria ao clicar nas miniaturas
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

// Interatividade do Menu Lateral, Sub-menu e Validações
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

  // --- SUB-MENU (OPÇÃO "SOBRE") ---
  const submenuToggle = document.querySelector('.submenu-toggle');
  if (submenuToggle) {
    submenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = submenuToggle.closest('.has-submenu');
      if (parentLi) {
        parentLi.classList.toggle('open');
      }
    });
  }

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
});