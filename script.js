const pesoSlider = document.getElementById('peso');
const alturaSlider = document.getElementById('altura');
const pesoVal = document.getElementById('peso-val');
const alturaVal = document.getElementById('altura-val');
const imcValor = document.getElementById('imc-valor');
const imcLabel = document.getElementById('imc-label');
const marcador = document.getElementById('marcador');

const categorias = [
  { max: 18.5, label: 'Abaixo do peso', bg: '#E6F1FB', color: '#0C447C' },
  { max: 25,   label: 'Normal',         bg: '#EAF3DE', color: '#3B6D11' },
  { max: 30,   label: 'Sobrepeso',      bg: '#FAEEDA', color: '#854F0B' },
  { max: 999,  label: 'Obesidade',      bg: '#FCEBEB', color: '#A32D2D' },
];

function calcularPosicao(imc) {
  if (imc <= 15) return 0;
  if (imc >= 40) return 100;
  if (imc < 18.5) return ((imc - 15) / (18.5 - 15)) * 22;
  if (imc < 25)   return 22 + ((imc - 18.5) / (25 - 18.5)) * 33;
  if (imc < 30)   return 55 + ((imc - 25) / (30 - 25)) * 25;
  return 80 + ((imc - 30) / (40 - 30)) * 20;
}

function atualizar() {
  const peso = parseInt(pesoSlider.value);
  const alturaCm = parseInt(alturaSlider.value);
  const alturaM = alturaCm / 100;
  const imc = peso / (alturaM * alturaM);

  pesoVal.textContent = peso + ' kg';
  alturaVal.textContent = alturaCm + ' cm';
  imcValor.textContent = imc.toFixed(1);

  const cat = categorias.find(c => imc < c.max);
  imcLabel.textContent = cat.label;
  imcLabel.style.background = cat.bg;
  imcLabel.style.color = cat.color;

  marcador.style.left = calcularPosicao(imc) + '%';
}

pesoSlider.addEventListener('input', atualizar);
alturaSlider.addEventListener('input', atualizar);

atualizar();
