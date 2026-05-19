const navShell = document.querySelector('.nav-shell');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navShell) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navShell.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      navShell.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Ačiū! Forma šioje statinėje versijoje dar nesiunčiama. Prijunkite backend arba formų paslaugą.');
  });
}


// Google Form modal
const dialogFormModal = document.getElementById('dialogFormModal');
const dialogFormOpeners = document.querySelectorAll('[data-open-dialog-form]');
const dialogFormClosers = document.querySelectorAll('[data-close-dialog-form]');

function openDialogForm(event) {
  if (event) event.preventDefault();
  if (!dialogFormModal) return;

  dialogFormModal.classList.add('is-open');
  dialogFormModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeButton = dialogFormModal.querySelector('.form-modal-close');
  if (closeButton) closeButton.focus();
}

function closeDialogForm() {
  if (!dialogFormModal) return;

  dialogFormModal.classList.remove('is-open');
  dialogFormModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

dialogFormOpeners.forEach((opener) => {
  opener.addEventListener('click', openDialogForm);
});

dialogFormClosers.forEach((closer) => {
  closer.addEventListener('click', closeDialogForm);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && dialogFormModal?.classList.contains('is-open')) {
    closeDialogForm();
  }
});
