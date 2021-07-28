const API = 'da2861549a148937a90434b4280a7ee3'
const ENDPOINT = 'http://api.weatherstack.com/'

onSubmit = (e) => {
    if (typeof e == 'object') {
        e.preventDefault();
        loc = e.target.location.value
    } else loc = e
    url = ENDPOINT + `current?access_key=${API}&query=${loc}`
    document.querySelector('.card').innerHTML = "Loading..."

    fetch(url).then(res => res.json()).then(res => {
        if (res.error) {
            document.querySelector('.card').innerHTML = "Try again with another location!!!"
            return
        }
        data = {
            icon: res.current.weather_icons[0],
            temp: res.current.temperature,
            desc: res.current.weather_descriptions[0],
            loc: res.location.name + ', ' + res.location.region,
            geo: `(${res.location.lat}, ${res.location.lon})`,
        }
        document.querySelector('.card').innerHTML = `
        <img src="${data.icon}" width="100" height="100" alt="${data.desc}">
        <br>
        <div>
            <h2>${data.desc}</h2>
            <h1>${data.temp}&#176; C</h1>
            <h2>${data.loc}</h2>
            <h3>${data.geo}</h3>
        </div>
        `
    })
}
navigator.geolocation.getCurrentPosition((res) => {
    let lat = res.coords.latitude
    let lon = res.coords.longitude
    onSubmit(lat + "," + lon)
})