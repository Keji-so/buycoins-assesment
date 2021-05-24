
const repoName = document.querySelector("h2");
const repoUser = document.querySelector(".main-username");
const submitBtn = document.querySelector(".top-btn");
const repoDescription = document.querySelector(".main-description");
const userImage = document.getElementById("profile-image")
const profileImage = document.getElementById("profile-images")
const repoNum = document.querySelector(".repo-num");

var inputValue = document.querySelector(".top-input");
inputValue.value = "Keji-so"

let Data = null;



window.onload = loadQuery;  //fetch my data on load


function loadQuery () {

    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 
            authorization: 'token ' + token,
            "content-Type": "application/json" },
        body: JSON.stringify({
            query: `
            
            query GetRepository {
                search (query: "${inputValue.value}", type: USER, first: 1){
                edges {
                  node {
                    ... on User {
                      bio
                      login
                      name
                      avatarUrl
                       repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                           totalCount
                              nodes {
                                name
                            url
                          description
                          id
                          updatedAt
                          stargazerCount
                          forkCount
                          primaryLanguage {
                             name
                          }
                                      }
                                    }
                    }
                  }
                }
              }
            }
            
            `

        })

    }).then(res => res.json())
      .then(data => {
            Data = data.data.search.edges[0].node
            
            repoName.innerText  = Data.name
            repoUser.innerText = Data.login
            repoDescription.innerText = Data.bio
            profileImage.src = Data.avatarUrl
            userImage.src = Data.avatarUrl
            repoNum.innerText = Data.repositories.totalCount
        }) 
        inputValue.value = ""

}








submitBtn.addEventListener("click", handleSearch)  //fetches data on search click


function handleSearch() {

    function handleChange (e) {
            inputValue.value = e.target.value       
    };

    inputValue.addEventListener ("change", handleChange)

    loadQuery(`${inputValue.value}`)


}



