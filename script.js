// seteo la api key
const api_key = '74dadb5d2e48de62d8faf73a9dc3ad96';

//escucho la accion de boton y paso lo escrito en el input a ciudad. Almaceno ciudad en getCiudadCoordenadas.
document.getElementById('botonBusqueda').addEventListener('click', function() {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if (ciudad) {
        getCiudadCoordenadas(ciudad);
    } 
});

//getCiudadCoordenadas hace el query y recupera del obejeto lat y lon para almacenar en getTiempo
function getCiudadCoordenadas(ciudad) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${api_key}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const { lat, lon } = data[0];
            getTiempo(lat, lon);
        } else {
            alert('Ciudad no encontrada');
        }
    })
    .catch(error => console.error('Error de coordenadas:', error));
}

//getTiempo lanza el query con la info lat, lon y apikey almacenadas y pasa la data a diplayTiempo
function getTiempo(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => response.json())
    .then(data => {
        displayTiempo(data);
    })
    .catch(error => console.error('Error encontrando el tiempo:', error));
}


//displayTiempo muestra los datos seteados en tiempoResultado en el div datosClima creado para la respuesta de la api

function displayTiempo(data) {
                const tiempoResultado = document.getElementById('datosClima');
                const iconoUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            
                tiempoResultado.innerHTML = `
                    <img src="${iconoUrl}" alt="Weather icon">
                    <h2>Tiempo en ${data.name}</h2>
                    <p>Ciudad de: ${data.sys.country}</p>
                    <p><strong>Temperatura: ${Math.floor(data.main.temp)}°C</strong></p>
                    <p><strong>La sensación térmica es de: ${Math.floor(data.main.feels_like)}°C</strong></p>
                    <p>La humedad es del: ${data.main.humidity}%</p>
                    <p>Descripción: ${data.weather[0].description}</p>
                `;
            }