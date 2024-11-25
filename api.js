const cityInput = document.getElementById('city');
const contain = document.querySelector('.container');
const head = document.querySelector(".title");
const infoDiv = document.querySelector('.info1');


        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cityName = cityInput.value.trim();
                if (!cityName) {
                    infoDiv.innerHTML = `<div style="color:red;">Please enter a city name.</div>`;
                    return;
                }
                contain.removeChild(head);
                infoDiv.classList.add('info');
                
                infoDiv.innerHTML = '<h1 style="margin-top: 300px; font-size: 100px; text-align: center; color: white;">Loading...</h1>';

                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=640f78b6c14288fbe26eff753de5406f`)
                    .then(response => {
                        if (!response.ok) throw new Error('City not found');
                        return response.json();
                    })
                    .then(data => {
                        contain.removeChild(cityInput);
                        infoDiv.innerHTML = '';
                        const cityDiv = document.createElement('div');
                        cityDiv.textContent = `${data.name}`;
                        cityDiv.classList.add('name');
                        
                        infoDiv.appendChild(cityDiv);

                        const tempDiv = document.createElement('div');
                        tempDiv.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
                        tempDiv.classList.add('temp');
                        infoDiv.appendChild(tempDiv);

                        const descDiv = document.createElement('div');
                        descDiv.textContent = `Description: ${data.weather[0].description}`;
                        descDiv.classList.add('desc');
                        infoDiv.appendChild(descDiv);

                        const iconDiv = document.createElement('div');
                        const iconImg = document.createElement('img');
                        iconImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                        iconImg.alt = 'Weather icon';
                        iconImg.classList.add('img2');
                        iconDiv.appendChild(iconImg);
                        infoDiv.appendChild(iconDiv);
                    })
                    .catch(error => {
                        infoDiv.innerHTML = `<div style="color:red;">Error: ${error.message}</div>`;
                    });
            }
        });