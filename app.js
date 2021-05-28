const userName = document.querySelector("h2");
const repoUser = document.querySelector(".main-username");
const submitBtn = document.querySelector(".top-btn");
const topOptions = document.querySelector(".top-options");
const topInput = document.querySelector(".top-input");
const repoDescription = document.querySelector(".main-description");
const userImage = document.getElementById("profile-image")
const profileImage = document.getElementById("profile-images")
const enterSearch = document.getElementById("top-input")
const repoNum = document.querySelector(".repo-num");
const mainContent = document.querySelector(".new-div");
const hamBurger = document.querySelector(".hamburger");
const menuMobile = document.querySelector(".menu-mobile");
const mobileImage = document.getElementById("mob-image");
const mobileName = document.getElementById("mob-name");



hamBurger.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
})

var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var inputValue = document.querySelector(".top-input");
inputValue.value = "keji-so"

let Data = null;


topInput.addEventListener("focus", handleHide)
topInput.addEventListener("blur", handleBlock)


function handleHide() {
    submitBtn.style.visibility = "hidden"
}

function handleBlock() {
    submitBtn.style.visibility = "visible"
}



function loadQuery () {     //fetches query data and loads new nodes

   fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 
            authorization: 'token ' + process.env.TOKEN_VALUE,
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
                                     color
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



    })
    
    .then(res => res.json())
      .then(data => {
            Data = data.data.search.edges[0]
            const dataInfo = Data.node
            const repoInfo = Data.node.repositories.nodes
            userName.innerText  = dataInfo.name
            mobileName.innerText  = dataInfo.login
            repoUser.innerText = dataInfo.login
            repoDescription.innerText = dataInfo.bio
            profileImage.src = dataInfo.avatarUrl
            userImage.src = dataInfo.avatarUrl
            mobileImage.src = dataInfo.avatarUrl
            repoNum.innerText = dataInfo.repositories.totalCount

 const html = repoInfo.map(({ name, url, description, stargazerCount, forkCount, primaryLanguage, updatedAt }) => {

  var strDate = updatedAt.split("T")[0].split("-").map(Number)
  var yearName = strDate[0]
  var dayName = strDate[1]
  monthName = months[strDate[1] - 1]


    description = null ? "" : ""

 return   `
 

 <div class="main-content">
    <div class="content-left">
    <div class="repo-name"><a href="${url}">${name}</a></div>

    <div class="repo-description">${description}</div>

    <div class="repo-data">
        <div class="language disp contain">
            <div style="background-color:${primaryLanguage.color};" class="color before"></div>
             <div class="main-language text">${primaryLanguage.name}</div> 
        </div>

        <div class="star disp contain">
            <div class="star-icon before"><i class=" main-icons far fa-star"></i></div>
            <div class="star-no text">${stargazerCount}</div>
        </div>

        <div class="fork disp contain">
            <div class="fork-icon before"><i class=" main-icons fas fa-code-branch"></i></div>
            <div class="fork-no text">${forkCount}</div>
        </div>

           

        <div class="update text contain">
            <div class="updated before">Updated on</div>
            <div class="update-no before">${monthName} ${dayName},</div>
            <div class="days">${yearName}.</div>
        </div>
    </div>
</div>

<div></div>

<div class="content-right">

    <div class="star-container">
        <div class="star-icon before"><i class=" main-icons far fa-star"></i></div>
        <div class="star">Star</div>
    </div>
    
</div> 
</div>

<hr>

 `



}).join('')

       
 mainContent.innerHTML = html

            
 })


   inputValue.value = ""

}


window.onload = loadQuery();  //fetch my data on load






 

 function handleSearch() {         //handles search on input change


     function handleChange (e) {
            inputValue.value = e.target.value 
    };

    inputValue.addEventListener ("change", handleChange)
    loadQuery(`${inputValue.value}`) 
}

submitBtn.addEventListener("click", handleSearch)  //fetches data on search click


enterSearch.addEventListener('keydown', (e) => {   //fetch data on keypress enter
if (e.key === 'Enter') {
             e.preventDefault()
            handleSearch()
    }
});


