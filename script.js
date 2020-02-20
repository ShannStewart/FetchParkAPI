const urlBase = 'https://api.github.com/users/';
let requestedUser = '';

function readyFunctions(){
    console.log("readyFunction ran");
    getUser();

}

async function getUser(){
    console.log("getUser ran");

    //  await $('#userSearch').off('click');

    await $('#userSearch').on('click', '#findUser', function(event){
        event.preventDefault();
        $('#results-list').empty();
        console.log("results emptied");
        requestedUser = $('input[name="githubUser"]').val();
    

        gitAPI(requestedUser);
    });
}

function gitAPI(){
    console.log("gitAPI ran");  
    console.log("You are searching for: " + requestedUser);

    let searchURL = urlBase + requestedUser + '/repos';
    
    console.log("search: " + searchURL); 
    
    fetch(searchURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJSON => getRepo(responseJSON))
    .catch(err => alert('what is this noise?'));

}

function getRepo(userRepo){
    console.log("getRepo ran");
    console.log(userRepo);

    for (i=0; i<userRepo.length; i++){

    let projectName = "<p>" + userRepo[i].name + "</p>";
    console.log("Name: " + projectName);
    let projectURL = "<p>" + userRepo[i].html_url + "</p>";
    console.log("URL: " + projectURL);
    let projectInfo = projectName + projectURL;

    $('#results-list').append(
        projectInfo
    );

    }
}

$(readyFunctions);