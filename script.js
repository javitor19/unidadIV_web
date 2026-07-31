document.querySelectorAll('.accordion-item').forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');

  trigger.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach((otherItem) => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value.trim();

    if (usuario === 'admin@correo.com' && clave === '1234') {
      document.body.classList.add('logged-in');
      localStorage.setItem('sessionState', 'active');
      loginForm.reset();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });
}

const menuToggle = document.getElementById('menuToggle');
const userMenu = document.getElementById('userMenu');
const closeMenu = document.getElementById('closeMenu');
const themeToggle = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');
const saveNameBtn = document.getElementById('saveNameBtn');
const nameInput = document.getElementById('nameInput');
const userNameLabel = document.getElementById('userNameLabel');
const navLinks = document.querySelectorAll('.top-nav a');

const applyTheme = (isDark) => {
  document.body.classList.toggle('dark-mode', isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
  }
  localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
};

const loadPreferences = () => {
  const savedTheme = localStorage.getItem('themeMode');
  const savedName = localStorage.getItem('userName');
  const savedSession = localStorage.getItem('sessionState');

  if (savedTheme === 'dark') {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (savedName) {
    if (userNameLabel) userNameLabel.textContent = savedName;
    if (nameInput) nameInput.value = savedName;
  }

  if (savedSession === 'active' && document.body) {
    document.body.classList.add('logged-in');
  }
};

menuToggle?.addEventListener('click', () => {
  userMenu?.classList.toggle('open');
});

closeMenu?.addEventListener('click', () => {
  userMenu?.classList.remove('open');
});

themeToggle?.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  applyTheme(isDark);
});

logoutBtn?.addEventListener('click', () => {
  document.body.classList.remove('logged-in', 'dark-mode');
  localStorage.removeItem('sessionState');
  localStorage.setItem('themeMode', 'light');
  if (themeToggle) themeToggle.textContent = '🌙 Modo oscuro';
  userMenu?.classList.remove('open');
  window.location.reload();
});

saveNameBtn?.addEventListener('click', () => {
  const nuevoNombre = nameInput.value.trim() || 'Usuario';
  localStorage.setItem('userName', nuevoNombre);
  if (userNameLabel) userNameLabel.textContent = nuevoNombre;
  userMenu?.classList.remove('open');
});

const updateActiveLink = () => {
  const scrollPosition = window.scrollY + 160;

  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    const section = document.getElementById(targetId);

    if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', () => {
  loadPreferences();
  updateActiveLink();
});
