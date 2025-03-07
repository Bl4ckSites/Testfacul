/* script.js */

/* ======================================================
   Módulo de Encapsulamento Geral
   (evita conflitos no escopo global e organiza os módulos)
======================================================== */
(function() {
  console.log("Iniciando módulo encapsulado");

  /* ----- Módulo: Tema (Versão 1: 'tema-claro' / 'tema-escuro') ----- */
  function toggleTheme() {
    console.log("toggleTheme() chamado");
    const body = document.body;
    const temaButton = document.getElementById('temaButton');
    if (body.classList.contains('tema-claro')) {
      body.classList.remove('tema-claro');
      body.classList.add('tema-escuro');
      temaButton.innerHTML = '&#9788;'; // ícone: sol
      localStorage.setItem('theme', 'escuro');
      console.log("Tema alterado para escuro");
    } else {
      body.classList.remove('tema-escuro');
      body.classList.add('tema-claro');
      temaButton.innerHTML = '&#9790;'; // ícone: lua
      localStorage.setItem('theme', 'claro');
      console.log("Tema alterado para claro");
    }
  }
  window.toggleTheme = toggleTheme;

  function initializeTheme() {
    console.log("initializeTheme() chamado");
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const temaButton = document.getElementById('temaButton');
    if (savedTheme === 'claro') {
      body.classList.add('tema-claro');
      temaButton.innerHTML = '&#9790;';
      console.log("Tema inicial: claro");
    } else {
      body.classList.add('tema-escuro');
      temaButton.innerHTML = '&#9788;';
      console.log("Tema inicial: escuro");
    }
  }
  window.initializeTheme = initializeTheme;

  /* ----- Módulo: Animação dos Botões de Navegação ----- */
  function animateNavButtons() {
    console.log("animateNavButtons() chamado");
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach((btn, index) => {
      btn.style.opacity = 0;
      btn.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        btn.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        btn.style.opacity = 1;
        btn.style.transform = 'translateY(0)';
        console.log(`Botão ${index} animado`);
      }, index * 100);
    });
  }

  /* ----- Módulo: Submenu de Informações Básicas ----- */
  function toggleSubmenu() {
    console.log("toggleSubmenu() chamado");
    const submenu = document.getElementById('submenu-basicas');
    if (submenu.style.display === 'flex') {
      submenu.style.animation = 'fadeOut 0.5s';
      console.log("Submenu ocultando (fadeOut)");
      setTimeout(() => {
        submenu.style.display = 'none';
        console.log("Submenu ocultado");
      }, 500);
    } else {
      submenu.style.display = 'flex';
      submenu.style.animation = 'fadeIn 0.5s';
      console.log("Submenu exibido (fadeIn)");
    }
  }
  window.toggleSubmenu = toggleSubmenu;

  /* ----- Módulo: Modal de Conteúdo (para textos, vídeos etc.) ----- */
  function openModal(contentTitle) {
    console.log("openModal() chamado com título:", contentTitle);
    const modal = document.getElementById('contentModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `<h2>${contentTitle}</h2>
                           <p>Conteúdo para ${contentTitle}. Aqui você pode adicionar mais detalhes, vídeos, áudios ou imagens relacionados ao tema.</p>`;
    modal.style.display = 'flex';
    const modalContent = document.getElementById('modalContent');
    modalContent.classList.remove('fadeOutModal');
    modalContent.classList.add('fadeInModal');
    console.log("Modal de conteúdo aberto com efeito fadeIn");
  }
  window.openModal = openModal;

  function closeModalContent() {
    console.log("closeModal() chamado para modal de conteúdo");
    const modal = document.getElementById('contentModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.classList.remove('fadeInModal');
    modalContent.classList.add('fadeOutModal');
    setTimeout(() => {
      modal.style.display = 'none';
      modalContent.classList.remove('fadeOutModal');
      console.log("Modal de conteúdo fechado");
    }, 500);
  }
  window.closeModal = closeModalContent;

  /* ----- Módulo: Organização de Pastas ----- */
  function toggleFolder(element) {
    console.log("toggleFolder() chamado para elemento:", element);
    element.classList.toggle('active');
    const nested = element.nextElementSibling;
    if (nested) {
      if (nested.style.display === 'block') {
        nested.style.animation = 'slideUp 0.3s';
        console.log("Pasta recolhendo (slideUp)");
        setTimeout(() => {
          nested.style.display = 'none';
          console.log("Pasta recolhida");
        }, 300);
      } else {
        nested.style.display = 'block';
        nested.style.animation = 'slideDown 0.3s';
        console.log("Pasta expandindo (slideDown)");
      }
    }
  }
  window.toggleFolder = toggleFolder;

  /* ----- Fechar Modal de Conteúdo ao clicar fora ----- */
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('contentModal');
    if (e.target === modal) {
      console.log("Clique fora do modal de conteúdo detectado");
      closeModalContent();
    }
  });

  /* ----- DOMContentLoaded Inicial (Tema e Animação) ----- */
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded: Inicializando tema e animação dos botões de navegação");
    initializeTheme();
    animateNavButtons();
  });
})(); // Fim do IIFE encapsulado

/* ======================================================
   Módulo: Alternar Modo Claro/Escuro (Versão 2: 'light-mode' / 'dark-mode')
   (Esta funcionalidade é disparada por elemento com id "toggle-mode")
======================================================== */
const toggleModeBtn = document.getElementById('toggle-mode');
if (toggleModeBtn) {
  toggleModeBtn.addEventListener('click', function() {
    console.log("toggle-mode clicado");
    const body = document.body;
    if (body.classList.contains('light-mode')) {
      body.classList.replace('light-mode', 'dark-mode');
      this.textContent = 'Modo Claro';
      console.log("Modo alterado para dark-mode");
    } else {
      body.classList.replace('dark-mode', 'light-mode');
      this.textContent = 'Modo Escuro';
      console.log("Modo alterado para light-mode");
    }
  });
}

/* ======================================================
   Módulo: Navegação e Exibição de Seções
======================================================== */
const menuButtons = document.querySelectorAll('.menu-btn');
menuButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = btn.getAttribute('data-target');
    console.log("Menu-btn clicado, target:", targetId);
    document.getElementById('main-menu').classList.add('hidden');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      targetEl.classList.add('fade-in');
      console.log("Exibindo seção:", targetId);
      setTimeout(() => {
        targetEl.classList.remove('fade-in');
      }, 500);
    }
  });
});

const subButtons = document.querySelectorAll('.sub-btn');
subButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log("Sub-btn clicado, data-target:", btn.getAttribute('data-target'));
    const container = btn.closest('.content-container');
    const innerContents = container.querySelectorAll('.inner-content');
    innerContents.forEach(content => content.classList.add('hidden'));
    const targetId = btn.getAttribute('data-target');
    const targetContent = container.querySelector('#' + targetId);
    if (targetContent) {
      targetContent.classList.remove('hidden');
      targetContent.classList.add('slide-in');
      console.log("Exibindo conteúdo interno:", targetId);
      setTimeout(() => {
        targetContent.classList.remove('slide-in');
      }, 500);
    }
  });
});

// Função unificada para exibir uma seção (merge dos vários showSection)
function showSection(targetId) {
  console.log("showSection() chamado para targetId:", targetId);
  document.querySelectorAll('.content-container').forEach(section => {
    section.classList.remove('active');
  });
  const section = document.getElementById(targetId);
  if (section) {
    section.classList.add('active');
    console.log("Seção", targetId, "exibida");
  }
  document.getElementById('main-menu').style.display = 'none';
  console.log("Menu principal ocultado");
}
window.showSection = showSection;

// Eventos para botões "Voltar"
const backButtons = document.querySelectorAll('.back-btn');
backButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log("Botão Voltar clicado");
    // Versão com animação fade-out
    const container = btn.closest('.content-container');
    container.classList.add('fade-out');
    setTimeout(() => {
      container.classList.add('hidden');
      container.classList.remove('fade-out');
      const innerContents = container.querySelectorAll('.inner-content');
      innerContents.forEach(content => content.classList.add('hidden'));
      document.getElementById('main-menu').classList.remove('hidden');
      console.log("Retornou ao menu principal (fade-out finalizado)");
    }, 500);
    // Também foi definida outra versão (simples) abaixo; como duplicada, as duas executam.
    document.querySelectorAll('.content-container').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById('main-menu').style.display = 'block';
    console.log("Menu principal exibido (código duplicado de back-btn)");
  });
});

/* ======================================================
   Módulo: Modais para Exibição de Arquivos
   Existem duas “versões” de openFile:
   (1) Versão que utiliza o modal com id "fileModal" (renomeada aqui para openFileModal)
   (2) Versão que utiliza o modal com id "modalOverlay" (mantida como openFileViewer)
======================================================== */

/* (1) Modal para arquivos – usando "fileModal" */
function openFileModal(fileUrl, fileType) {
  console.log("openFileModal() chamado com fileUrl:", fileUrl, "e fileType:", fileType);
  const modal = document.getElementById('fileModal');
  const modalBody = document.getElementById('fileModalBody');
  let content = '';
  if (fileType === 'image') {
    content = `<img src="${fileUrl}" alt="Imagem" class="modal-image">`;
  } else if (fileType === 'audio') {
    content = `<audio controls><source src="${fileUrl}" type="audio/mpeg">Seu navegador não suporta áudio.</audio>`;
  } else if (fileType === 'video') {
    content = `<video controls class="modal-video"><source src="${fileUrl}" type="video/mp4">Seu navegador não suporta vídeos.</video>`;
  } else {
    content = `<p>Arquivo não suportado para visualização. <a href="${fileUrl}" download>Baixar arquivo</a></p>`;
  }
  modalBody.innerHTML = content + `<a href="${fileUrl}" download class="download-btn">Baixar</a>`;
  modal.style.display = 'flex';
  console.log("Modal de arquivo (fileModal) aberto");
}
window.openFileModal = openFileModal;

function closeFileModal() {
  console.log("closeFileModal() chamado");
  const modal = document.getElementById('fileModal');
  modal.style.display = 'none';
  console.log("Modal de arquivo (fileModal) fechado");
}
window.closeFileModal = closeFileModal;

/* (2) Modal para arquivos – usando "modalOverlay", "modalViewer" e "downloadLink" */
function openFileViewer(file, type) {
  console.log("openFileViewer() chamado com file:", file, "e type:", type);
  const modalOverlay = document.getElementById('modalOverlay');
  const modalViewer = document.getElementById('modalViewer');
  const downloadLink = document.getElementById('downloadLink');
  
  if (type === 'pdf') {
    modalViewer.innerHTML = `<iframe src="${file}" allowfullscreen></iframe>`;
  } else {
    // Inclui loading="lazy" para otimizar dispositivos móveis
    modalViewer.innerHTML = `<img src="${file}" alt="Visualização" loading="lazy">`;
  }
  downloadLink.href = file;
  modalOverlay.style.display = 'flex';
  console.log("Modal de visualização (modalOverlay) aberto");
}
window.openFileViewer = openFileViewer;

// Versão duplicada (mantida sem alterações, renomeada para evitar sobrescrita)
function openFileViewerDuplicate(file, type) {
  console.log("openFileViewerDuplicate() chamado com file:", file, "e type:", type);
  const modalOverlay = document.getElementById('modalOverlay');
  const modalViewer = document.getElementById('modalViewer');
  const downloadLink = document.getElementById('downloadLink');
  
  if (type === 'pdf') {
    modalViewer.innerHTML = '<iframe src="' + file + '" allowfullscreen></iframe>';
  } else {
    modalViewer.innerHTML = '<img src="' + file + '" alt="Visualização">';
  }
  downloadLink.href = file;
  modalOverlay.style.display = 'flex';
  console.log("openFileViewerDuplicate: Modal de visualização aberto");
}
window.openFileViewerDuplicate = openFileViewerDuplicate;

// Fechar modal de visualização (usando "modalOverlay")
function closeModalViewer() {
  console.log("closeModalViewer() chamado");
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'none';
  document.getElementById('modalViewer').innerHTML = '';
  console.log("Modal de visualização (modalOverlay) fechado");
}
window.closeModalViewer = closeModalViewer;
document.getElementById('closeModal')?.addEventListener('click', closeModalViewer);
document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
  if (e.target === this) {
    console.log("Clique fora do modalViewer detectado");
    closeModalViewer();
  }
});

/* ======================================================
   Módulo: Manipulação de Grades e Modal para Grades
======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded: Configurando eventos para Grades");

  // Manipulação das grades: inserir imagem no container alvo a partir do data-img
  document.querySelectorAll('.sub-btn[data-img]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      const imgSrc = button.dataset.img;
      const downloadLink = button.dataset.download;
      console.log("Grade sub-btn clicado – inserindo imagem:", imgSrc);
      target.innerHTML = `
        <img src="${imgSrc}" class="grade-image" 
             data-download="${downloadLink}" 
             alt="Grade ${button.textContent}">
      `;
    });
  });

  // Evento para abrir modal ao clicar em uma imagem de grade
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('grade-image')) {
      console.log("Imagem de grade clicada:", e.target.src);
      const modal = document.getElementById('modalOverlay');
      const modalImg = document.getElementById('modalImage');
      const downloadLink = document.getElementById('downloadLink');
      modalImg.src = e.target.src;
      downloadLink.href = e.target.dataset.download;
      modal.style.display = 'flex';
      console.log("ModalOverlay aberto para imagem de grade");
    }
    if (e.target.closest('.modal-overlay')) {
      console.log("Clique fora do modalOverlay (grade) detectado – fechando modal");
      document.getElementById('modalOverlay').style.display = 'none';
    }
  });
});

/* ======================================================
   Módulo: Manipulação Personalizada para Links de Download
======================================================== */
function showToast(message) {
  console.log("showToast() chamado com mensagem:", message);
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    console.log("Toast removido");
  }, 2000);
}

document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("Link de download personalizado clicado, URL:", this.href);
    const url = this.href;
    showToast("baixando...");
    setTimeout(() => {
      showToast("baixo!");
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.download = '';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      console.log("Download iniciado para:", url);
    }, 2000);
  });
});
// Alternar entre modo claro e escuro
document.getElementById('toggle-mode').addEventListener('click', function() {
  const body = document.body;
  if(body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    this.textContent = 'Modo Claro';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    this.textContent = 'Modo Escuro';
  }
});
<!-- Trecho do modal permanece igual -->
<div class="modal-overlay" id="modalOverlay">
  <div class="modal-content">
    <button class="close-modal" id="closeModal">X</button>
    <div id="modalViewer"></div>
    <a id="downloadLink" class="download-icon" download>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    </a>
  </div>
</div>

  // Função para abrir o modal com o conteúdo do arquivo (PDF ou imagem)
  // Agora aceita um terceiro parâmetro "downloadUrl" que deve ser o link direto (ex: do Dropbox)
  function openFile(file, type, downloadUrl = file) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalViewer = document.getElementById('modalViewer');
    const downloadLink = document.getElementById('downloadLink');

    if(type === 'pdf') {
      modalViewer.innerHTML = '<iframe src="' + file + '" allowfullscreen></iframe>';
    } else {
      modalViewer.innerHTML = '<img src="' + file + '" alt="Visualização">';
    }
    // Configura o link de download – utilize o link direto (Dropbox com ?dl=1) se disponível
    downloadLink.href = downloadUrl;

    // Remove event listeners anteriores (se houver) e adiciona o listener para tratar o download
    downloadLink.removeEventListener('click', handleDownload);
    downloadLink.addEventListener('click', handleDownload);

    // Exibe o modal
    modalOverlay.style.display = 'flex';
  }

  // Função para tratar o clique no botão de download
  function handleDownload(e) {
    e.preventDefault();
    e.stopPropagation();

    const downloadLink = e.currentTarget;
    const originalContent = downloadLink.innerHTML;

    // Exibe o aviso "Baixando..."
    downloadLink.innerHTML = "Baixando...";

    // Cria um link temporário para forçar o download do arquivo
    const tempLink = document.createElement('a');
    tempLink.href = downloadLink.href;
    tempLink.setAttribute('download', '');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Restaura o conteúdo original do botão após alguns segundos (ex.: 2 segundos)
    setTimeout(() => {
      downloadLink.innerHTML = originalContent;
    }, 2000);
  }

  // Função para fechar o modal
  function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modalViewer').innerHTML = '';
  }
  document.getElementById('closeModal').addEventListener('click', closeModal);
  // Fecha o modal ao clicar fora do conteúdo
  document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal();
    }
  });