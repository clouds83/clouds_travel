function clearSearch() {
  const heroRight = document.querySelector('.hero-right')
  heroRight.innerHTML = ''
  document.getElementById('searchInput').value = ''
}

function fetchData() {
  let searchInputValue = document.getElementById('searchInput').value.toLowerCase()

  fetch('travel_recommendation_api.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }

      return response.json()
    })
    .then((data) => {
      let keys = Object.keys(data)
      let filteredKeys = keys.filter((key) => key.toLowerCase().includes(searchInputValue))

      if (filteredKeys.length === 0) {
        displayData([])
      } else {
        let filteredData = []

        filteredKeys.forEach((key) => {
          filteredData.push(...data[key])
        })

        displayData(filteredData)
      }
    })
    .catch((error) => {
      alert('There has been a problem with your fetch operation:', error)
    })
}

function displayData(filteredData) {
  const heroRight = document.querySelector('.hero-right')
  heroRight.innerHTML = ''

  if (filteredData.length === 0 || filteredData === undefined) {
    const noResultsHtml = '<p align="center">No matching results.</p>'
    heroRight.innerHTML += noResultsHtml
  } else {
    filteredData.forEach((item) => {
      if (item.cities) {
        item.cities.forEach((city) => {
          const html = `
            <div class="destination">
              <div class="destination-image">
                <img src="${city.imageUrl}" alt="${city.name}" />
              </div>
              <div class="destination-content">
                <h2>${city.name}</h2>
                <p>${city.description}</p>
                <button>Visit</button>
              </div>
            </div>
          `
          heroRight.innerHTML += html
        })
      } else {
        const html = `
          <div class="destination">
            <div class="destination-image">
              <img src="${item.imageUrl}" alt="${item.name}" />
            </div>
            <div class="destination-content">
              <h2>${item.name}</h2>
              <p>${item.description}</p>
              <button>Visit</button>
            </div>
          </div>
        `
        heroRight.innerHTML += html
      }
    })
  }
}
