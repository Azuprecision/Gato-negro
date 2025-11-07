
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchBar = document.getElementById('search-bar');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2025-11-05T10:00:00');

    talksToRender.forEach((talk, index) => {
      if (index === 3) {
        const breakElement = createBreakElement(currentTime);
        scheduleContainer.appendChild(breakElement);
        currentTime.setHours(currentTime.getHours() + 1);
      }

      const talkElement = createTalkElement(talk, currentTime);
      scheduleContainer.appendChild(talkElement);
      currentTime.setHours(currentTime.getHours() + 1);
      currentTime.setMinutes(currentTime.getMinutes() + 10);
    });
  }

  function createTalkElement(talk, time) {
    const div = document.createElement('div');
    div.classList.add('talk');

    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    div.innerHTML = `
      <h3>${timeString}</h3>
      <h2>${talk.title}</h2>
      <div class="speakers">${talk.speakers.join(', ')}</div>
      <p>${talk.description}</p>
      <div class="category">
        ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
      </div>
    `;
    return div;
  }

  function createBreakElement(time) {
    const div = document.createElement('div');
    div.classList.add('break');
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `<h3>${timeString}</h3><h2>Almuerzo</h2>`;
    return div;
  }
});
