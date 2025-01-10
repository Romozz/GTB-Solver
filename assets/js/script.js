// Импортируем массив данных с возможными словами
import { arrayData } from './wordlist.js';

const input = document.getElementById('input');
const resultDiv = document.getElementById('result');
const countSpan = document.getElementById('count');
const statsDiv = document.getElementById('stats');
const toast = document.getElementById('toast');

// Обработчик ввода текста
input.addEventListener('input', (e) => {
  const userInput = e.target.value;
  countSpan.textContent = `Количество символов: ${userInput.length}`;
  resultDiv.innerHTML = '';
  statsDiv.innerHTML = '';

  const words = userInput.replace(/_/g, '.');
  const regex = new RegExp(`^${words}$`, 'i');
  
  let foundWords = [];
  let letterCount = {};

  arrayData.forEach(word => {
    if (regex.test(word)) {
      foundWords.push(word);
      
      // Подсчет частоты букв
      for (let letter of word) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
      }

      const wordElement = document.createElement('div');
      wordElement.className = 'word';
      wordElement.textContent = word;
      wordElement.classList.add('show'); // Добавляем анимацию появления слова

      wordElement.addEventListener('click', () => {
        navigator.clipboard.writeText(word);
        showToast();
      });

      resultDiv.appendChild(wordElement);
    }
  });

  // Статистика
  const mostFrequentLetter = Object.entries(letterCount).reduce((max, current) => current[1] > max[1] ? current : max, ['', 0]);
  statsDiv.innerHTML = `Найдено слов: ${foundWords.length} <br>`;

  if (foundWords.length > 0) {
    resultDiv.classList.add('show');
    statsDiv.classList.add('show'); // Плавно показываем статистику
  } else {
    resultDiv.classList.remove('show');
    statsDiv.classList.remove('show');
  }
});

// Функция для отображения уведомления
function showToast() {
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}

// Глобальная функция для очистки ввода
window.clearInput = function() {
  input.value = '';
  resultDiv.classList.remove('show');
  statsDiv.classList.remove('show');
  statsDiv.style.opacity = '0';
  countSpan.textContent = 'Количество символов: 0';
  resultDiv.innerHTML = ''; // Очищаем результаты
  statsDiv.innerHTML = '';  // Очищаем статистику
};
