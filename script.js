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

const requirementThemes = {
  funcionales: {
    title: 'Requisitos funcionales',
    description: 'Se enfocan en las acciones y resultados esperados del sistema.',
    stats: {
      cumplimiento: 88,
      prioridad: 92,
      riesgo: 18,
      esfuerzo: 74
    },
    pie: [
      { label: 'Validación', value: 28, color: '#1d4ed8' },
      { label: 'Autenticación', value: 22, color: '#0ea5e9' },
      { label: 'Reportes', value: 18, color: '#f59e0b' },
      { label: 'Integración', value: 32, color: '#16a34a' }
    ],
    bars: [
      { label: 'Alta', value: 92 },
      { label: 'Media', value: 78 },
      { label: 'Baja', value: 56 },
      { label: 'Seguimiento', value: 84 }
    ],
    detalle: [
      'Validación de formularios y flujos principales.',
      'Autenticación segura para usuarios y administradores.',
      'Generación de reportes con filtros y exportación.',
      'Integración con servicios internos y APIs externas.'
    ]
  },
  noFuncionales: {
    title: 'Requisitos no funcionales',
    description: 'Aseguran rendimiento, seguridad, confiabilidad y escalabilidad.',
    stats: {
      cumplimiento: 82,
      prioridad: 87,
      riesgo: 24,
      esfuerzo: 80
    },
    pie: [
      { label: 'Seguridad', value: 35, color: '#7c3aed' },
      { label: 'Rendimiento', value: 27, color: '#0ea5e9' },
      { label: 'Disponibilidad', value: 23, color: '#16a34a' },
      { label: 'Escalabilidad', value: 15, color: '#f59e0b' }
    ],
    bars: [
      { label: 'Seguridad', value: 90 },
      { label: 'Rendimiento', value: 82 },
      { label: 'Disponibilidad', value: 79 },
      { label: 'Escalabilidad', value: 68 }
    ],
    detalle: [
      'Protección de datos y cumplimiento con políticas de seguridad.',
      'Tiempo de respuesta bajo carga moderada y alta.',
      'Disponibilidad continua para usuarios críticos.',
      'Capacidad de crecer con más clientes y servicios.'
    ]
  },
  negocio: {
    title: 'Requisitos de negocio',
    description: 'Definen objetivos, metas y valor que aporta la solución a la organización.',
    stats: {
      cumplimiento: 91,
      prioridad: 94,
      riesgo: 12,
      esfuerzo: 66
    },
    pie: [
      { label: 'Cobertura', value: 30, color: '#f97316' },
      { label: 'ROI', value: 24, color: '#22c55e' },
      { label: 'Eficiencia', value: 26, color: '#3b82f6' },
      { label: 'Soporte', value: 20, color: '#ec4899' }
    ],
    bars: [
      { label: 'Ingresos', value: 88 },
      { label: 'Eficiencia', value: 93 },
      { label: 'Soporte', value: 81 },
      { label: 'Satisfacción', value: 86 }
    ],
    detalle: [
      'Mejora de procesos para reducir tiempos operativos.',
      'Aumento del valor entregado a clientes y usuarios.',
      'Estándares de calidad acordes con la estrategia del negocio.',
      'Apoyo a la toma de decisiones con indicadores claros.'
    ]
  },
  interfaz: {
    title: 'Requisitos de interfaz',
    description: 'Relacionados con la experiencia de usuario, navegación y accesibilidad.',
    stats: {
      cumplimiento: 85,
      prioridad: 81,
      riesgo: 20,
      esfuerzo: 71
    },
    pie: [
      { label: 'Diseño', value: 29, color: '#f59e0b' },
      { label: 'Accesibilidad', value: 25, color: '#14b8a6' },
      { label: 'Navegación', value: 22, color: '#3b82f6' },
      { label: 'Usabilidad', value: 24, color: '#f43f5e' }
    ],
    bars: [
      { label: 'Diseño', value: 84 },
      { label: 'Acceso', value: 79 },
      { label: 'Navegación', value: 88 },
      { label: 'Clarity', value: 82 }
    ],
    detalle: [
      'Interfaces claras y consistentes para diferenciar módulos.',
      'Accesibilidad con contraste, tamaños legibles y navegación simple.',
      'Flujos intuitivos para evitar errores y confusión.',
      'Diseño adaptable para escritorio, tablet y móvil.'
    ]
  }
};

const drawPieChart = (canvas, data) => {
  const ctx = canvas.getContext('2d');
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  data.forEach((item) => {
    const slice = (item.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, 85, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    start += slice;
  });

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 46, 0, Math.PI * 2);
  ctx.fillStyle = '#f8fafc';
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = '700 15px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Total', canvas.width / 2, canvas.height / 2 - 3);
  ctx.font = '700 20px Segoe UI';
  ctx.fillText(`${total}%`, canvas.width / 2, canvas.height / 2 + 22);
};

const drawBarChart = (canvas, data) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 24;
  const chartHeight = height - 40;
  const barWidth = 46;
  const gap = 28;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i += 1) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(32, y);
    ctx.lineTo(width - 10, y);
    ctx.stroke();
  }

  data.forEach((item, index) => {
    const x = 40 + index * (barWidth + gap);
    const barHeight = (item.value / 100) * (chartHeight - 12);
    const y = height - padding - barHeight;

    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = '#334155';
    ctx.font = '600 11px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(item.label, x + barWidth / 2, height - 8);
    ctx.fillText(`${item.value}%`, x + barWidth / 2, y - 8);
  });
};

const initRequirementDashboard = () => {
  const dashboard = document.getElementById('themeDashboard');

  if (!dashboard) return;

  const buttons = dashboard.querySelectorAll('[data-theme]');
  const title = document.getElementById('requirementTitle');
  const description = document.getElementById('requirementDescription');
  const statCumplimiento = document.getElementById('statCumplimiento');
  const statPrioridad = document.getElementById('statPrioridad');
  const statRiesgo = document.getElementById('statRiesgo');
  const statEsfuerzo = document.getElementById('statEsfuerzo');
  const legend = document.getElementById('chartLegend');
  const detailList = document.getElementById('requirementDetails');
  const pieCanvas = document.getElementById('pieChart');
  const barCanvas = document.getElementById('barChart');

  const renderTheme = (themeKey) => {
    const theme = requirementThemes[themeKey];
    if (!theme) return;

    title.textContent = theme.title;
    description.textContent = theme.description;
    statCumplimiento.textContent = `${theme.stats.cumplimiento}%`;
    statPrioridad.textContent = `${theme.stats.prioridad}%`;
    statRiesgo.textContent = `${theme.stats.riesgo}%`;
    statEsfuerzo.textContent = `${theme.stats.esfuerzo}%`;

    legend.innerHTML = theme.pie.map((item) => `
      <span class="legend-item"><span class="legend-swatch" style="background:${item.color}"></span>${item.label}</span>
    `).join('');

    detailList.innerHTML = theme.detalle.map((item) => `<li>${item}</li>`).join('');

    drawPieChart(pieCanvas, theme.pie);
    drawBarChart(barCanvas, theme.bars);

    buttons.forEach((button) => {
      const isActive = button.dataset.theme === themeKey;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => renderTheme(button.dataset.theme));
  });

  renderTheme('funcionales');
};

window.addEventListener('load', () => {
  loadPreferences();
  updateActiveLink();
  initRequirementDashboard();
});
