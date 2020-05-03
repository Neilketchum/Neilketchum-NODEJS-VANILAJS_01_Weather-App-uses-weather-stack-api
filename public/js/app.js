
const search_box = document.querySelector('.searchbox')
const search = document.querySelector('.btn');
const loc = search_box.value;
function UIChange(data){
    const city = document.querySelector('.city')
    const temp = document.querySelector('.temp')
    const date = document.querySelector('.date')
    const descp = document.querySelector('.weather')
    city.innerHTML = search_box.value;
    temp.innerHTML = `${data.Data.current_weather}°c`;
    let now = new Date()
    date.innerText = DateBuilder(now);
    descp.innerHTML = data.Data.weather_decp;
}
function DateBuilder(date){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    return `${date.getDate()} ${day} ${month} ${year}`;
  }
search.addEventListener("click",(e)=>{
    console.log(search_box.value)
    fetch(`/weather?search=${search_box.value}`).then((response) => {
        response.json().then((data) => {
              if (data.error) {
                console.log(data.error)
            } else {
                    console.log(data)
                    UIChange(data);
            }
        })
    })
})


