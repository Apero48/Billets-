// Intersection Observer pour les cartes
const cards = document.querySelectorAll('.destination-card');

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

cards.forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'all 0.5s ease-out';
  observer.observe(card);
});

// Animation du bouton CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('mouseover', () => {
    ctaButton.style.transform = 'scale(1.1)';
  });

  ctaButton.addEventListener('mouseout', () => {
    ctaButton.style.transform = 'scale(1)';
  });
}

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Animation du formulaire
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message envoyé avec succès!');
    form.reset();
  });
}



// Auto-suggestion pour la destination
const suggestions = ['Paris', 'New York', 'Tokyo', 'Londres', 'Rome', 'Dubai'];

function displaySuggestions(query) {
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '';

  if (query.length < 3) {
    return;
  }

  const apiUrl = `https://autocomplete.travelpayouts.com/places2?term=${query}&locale=fr&token=f8b3a993a1b5eef4f349932a17b92706`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      suggestionsList.innerHTML = '';

      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.name; // Adaptez en fonction des données exactes
          li.onclick = () => selectSuggestion(item.name);
          suggestionsList.appendChild(li);
        });
      } else {
        suggestionsList.innerHTML = '<li>Aucune suggestion trouvée</li>';
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des suggestions:', error);
      suggestionsList.innerHTML = '<li>Impossible de récupérer les suggestions</li>';
    });
}

function selectSuggestion(suggestion) {
  document.getElementById('destination-input').value = suggestion;
  document.getElementById('suggestions-list').innerHTML = '';
}

// Afficher le calendrier
function showCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.style.display = 'block';
  calendar.innerHTML = '<p>(Intégration d\'un calendrier ici)</p>'; // Remplace par un plugin de calendrier
}

