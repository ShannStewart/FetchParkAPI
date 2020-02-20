const urlBase = 'https://developer.nps.gov/api/v1/parks?';
const apiKey = 'cbKz4jiYcQHjHHnB7OaQLeDhvGw7cLfIvPWFf2A8'
let requestedState = [];
let resultNumber = 10;

const states = [{'name': 'Alabama', 'abb':'AL'},{'name': 'Alaska' , 'abb': 'AK'},{'name': 'Arizona', 'abb': 'AZ'},{'name': 'Arkansas', 'abb': 'AR'},{'name': 'California', 'abb': 'CA'},{'name': 'Colorado', 'abb': 'CO'},{'name': 'Connecticut', 'abb': 'CT'},{'name': 'Delaware', 'abb': 'DE'},{'name': 'Florida', 'abb':'FL'},{'name': 'Georgia', 'abb': 'GA'},{'name': 'Hawaii', 'abb':'HI'},{'name': 'Idaho', 'abb': 'ID'},{'name': 'Illinois', 'abb': 'IL'},{'name': 'Indiana', 'abb':'IN'},{'name': 'Iowa', 'abb': 'IA'},{'name': 'Kansas', 'abb': 'KS'},{'name': 'Kentuckey', 'abb': 'KY'},{'name': 'Louisiana', 'abb': 'LA'},{'name': 'Maine', 'abb': 'ME'},{'name': 'Maryland', 'abb': 'MD'},{'name': 'Massachusetts', 'abb':'MA'},{'name': 'Michigan', 'abb': 'MI'},{'name': 'Minnesota', 'abb':'MN'},{'name': 'Mississippi', 'abb':'MS'},{'name': 'Missouri', 'abb':'MO'},{'name': 'Montana', 'abb':'MT'},{'name': 'Nebraska', 'abb':'NE'},{'name': 'Nevada', 'abb':'NV'},{'name': 'New Hampshire', 'abb': 'NH'},{'name': 'New Jersey', 'abb': 'NJ'},{'name': 'New Mexico', 'abb': 'NM'},{'name': 'New York', 'abb': 'NY'},{'name': 'North Carolina', 'abb':'NC'},{'name': 'North Dakota', 'abb':'ND'},{'name': 'Ohio', 'abb':'OH'},{'name': 'Oklahoma', 'abb': 'OK'},{'name': 'Oregon', 'abb': 'OR'},{'name': 'Pennsylvania', 'abb': 'PA'},{'name': 'Rhode Island', 'abb': 'RI'    },{'name': 'South Carolina', 'abb': 'SC'},{'name': 'South Dakota', 'abb': 'SD'},{'name': 'Tennessee', 'abb': 'TN'},{'name': 'Texas', 'abb': 'TX'},{'name': 'Utah', 'abb': 'UT'},{'name': 'Vermont', 'abb': 'VT'},{'name': 'Virginia', 'abb': 'VA'}, {'name': 'Washington', 'abb': 'WA'}, {'name': 'West Virginia', 'abb': 'WV'}, {'name': 'Wisconsin', 'abb': 'WI'}, {'name': 'Wyoming', 'abb': 'WY'}];

function prepareStates(){
    console.log('prepareStates ran');
    for (i=0; i < states.length; i++){
        $('#parkSearch').append(
            '<div><input type="checkbox" name="' + states[i].name + '" value="' + states[i].abb + '" class="statePark"><label for="' + states[i].name + '">' + states[i].name + '</label></div>'
        );
    }
    readyFunctions();
}

function readyFunctions(){
    console.log("readyFunction ran");
    getPark();

}

async function getPark(){
    console.log("getPark ran");

     await $('#parkSearch').off('click');

     await $('#parkSearch').on('click', '#findParks', function(event){
        event.preventDefault();
        $('#results-list').empty();
        console.log("results emptied");

        $('.statePark:checked').each(function(){
            requestedState.push($(this).val());
        });

        resultNumber = $('#js-max-results').val();

        console.log(requestedState);
        console.log('getting ' + resultNumber + ' parks');

        parkAPI(requestedState, resultNumber);
    });
}

function parkAPI(requestedState, resultNumber){

    console.log("parkAPI ran");

    let searchURL = urlBase + 'api_key=' + apiKey;

    console.log('Search: ' + searchURL);

    let stateCode = getStateCode(requestedState);
    console.log('code: ' + stateCode);

    searchURL = searchURL + stateCode;

    let limitCode = '&limit=' + resultNumber;
    
    searchURL = searchURL + limitCode;

    console.log('New Search: ' + searchURL);

    fetch(searchURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJSON => getParkData(responseJSON))
    .catch(err => alert('what is this noise?'));
    
}

function getStateCode(requestedState){
    console.log('getStateCode ran');

    webCode = [];

    for (i=0; i < requestedState.length; i++){
        webCode.push('stateCode=' + requestedState[i]);
    }

    fullCode = '&' + webCode.join('&');

    return fullCode;

   
    
}

function getParkData(parkData){
    console.log('getParkDATA ran');
 
    for (let i = 0; i < parkData.data.length; i++){
 
              $('#results-list').append(
 
               
                 "<li><h3>" + parkData.data[i].fullName + "</h3><p>" + parkData.data[i].description + "</p><a href='" + parkData.data[i].url + "'>Link</a></li>"
             )};
 
                readyFunctions();

    }



$(prepareStates);