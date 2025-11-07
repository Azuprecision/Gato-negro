document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchBox = document.getElementById('search-box');
    let allTalks = [];

    // Función para formatear la hora
    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // Función para renderizar las charlas
    const renderSchedule = (talks) => {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // El evento empieza a las 10:00

        talks.forEach((talk, index) => {
            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule-item');

            const categoriesHTML = talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('');

            scheduleItem.innerHTML = `
                <div class="time-slot">
                    <span>${formatTime(startTime)} - ${formatTime(endTime)}</span>
                </div>
                <div class="talk-details">
                    <h2>${talk.title}</h2>
                    <p class="speakers">Por: ${talk.speakers.join(', ')}</p>
                    <p>${talk.description}</p>
                    <div class="categories">${categoriesHTML}</div>
                </div>
            `;
            scheduleContainer.appendChild(scheduleItem);

            // Actualizar la hora para la siguiente charla
            currentTime = new Date(endTime.getTime());

            // Añadir descanso (break) o almuerzo (lunch)
            if (index === 2) { // Pausa para el almuerzo después de la tercera charla
                const lunchTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
                const breakHTML = `
                    <div class="schedule-item break-item">
                        <div class="time-slot">${formatTime(currentTime)} - ${formatTime(lunchTime)}</div>
                        <div class="talk-details"><h2>Pausa para Almuerzo</h2></div>
                    </div>`;
                scheduleContainer.innerHTML += breakHTML;
                currentTime = lunchTime;
            } else if (index < talks.length - 1) { // Descanso de 10 minutos entre charlas
                const breakTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
                const breakHTML = `
                    <div class="schedule-item break-item">
                         <div class="time-slot">${formatTime(currentTime)} - ${formatTime(breakTime)}</div>
                         <div class="talk-details"><h4>Descanso</h4></div>
                    </div>`;
                scheduleContainer.innerHTML += breakHTML;
                currentTime = breakTime;
            }
        });
    };

    // Cargar los datos de las charlas
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => {
            console.error('Error al cargar las charlas:', error);
            scheduleContainer.innerHTML = '<p>No se pudo cargar el programa. Inténtalo de nuevo más tarde.</p>';
        });

    // Filtrar charlas por categoría
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = allTalks.filter(talk => {
            return talk.categories.some(cat => cat.toLowerCase().includes(searchTerm));
        });
        renderSchedule(filteredTalks);
    });
});
