let allGlobalData ;
let allCountriesData ;
let data;
const Data = async() => {
    let response = await fetch('https://api.covid19api.com/summary')
     data = await response.json();
    allGlobalData = data.Global
    allCountriesData = data.Countries.slice(0, 99)
   // console.log(allGlobalData)
   // console.log(allCountriesData)
   // console.log(allCountriesData[1].Country);
    showHeadingData()
    showTableData()
    return allCountriesData ,allGlobalData

}
Data()
const showHeadingData = () => {
    let heading = {
        newConfirmed: allGlobalData.NewConfirmed,
        totalConfirmed: allGlobalData.TotalConfirmed,
        newDeaths: allGlobalData.NewDeaths,
        totalDeaths: allGlobalData.TotalDeaths,
        newRecovered: allGlobalData.NewRecovered,
        totalRecovered: allGlobalData.TotalRecovered,
        updateDate: allGlobalData.Date
    };
     //check on console
    for (const property in heading) {
        let allHead =[]
      allHead+= (`${ property }: ${heading[property]}`);
      console.log(allHead)
      // show in dom 
      let head = document.querySelector('#head') 
     head.innerHTML+= `<br>${allHead} `
    }
}

const createMyElement = (parent, element, text = false) => {
    myElement = document.createElement(element)
    parent.appendChild(myElement)
    if (text) myElement.textContent = text
    return myElement
}
const showTableData = () => {
   // for check on console
   allCountriesData.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
        console.log(`${key} ${value}`);
    });
  console.log('-------------------');
});
// for show in dom
for(var i in allCountriesData){
//console.log(allCountriesData[i].Country)
let tbody = document.querySelector('#TableData')     
let tr = createMyElement(tbody, 'tr')
createMyElement(tr, 'td', allCountriesData[i].ID)
createMyElement(tr, 'td', allCountriesData[i].Country)
createMyElement(tr, 'td', allCountriesData[i].NewConfirmed)
createMyElement(tr, 'td', allCountriesData[i].TotalConfirmed)
createMyElement(tr, 'td', allCountriesData[i].NewDeaths)
createMyElement(tr, 'td', allCountriesData[i].TotalDeaths)
createMyElement(tr, 'td', allCountriesData[i].NewRecovered)
createMyElement(tr, 'td', allCountriesData[i].TotalRecovered)
createMyElement(tr, 'td', allCountriesData[i].Date)
}
}
showTableData()
    




