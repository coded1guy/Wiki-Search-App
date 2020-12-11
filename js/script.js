// VARIABLE DECLARATION AND ASSIGNMENT
let navbar = document.querySelector('header > nav');
let main = document.querySelector('body');
let logo = document.querySelector('#logo');
let sl = document.querySelector('.toggle-cnt');
// SWITCH
    let changer = document.querySelector('.img-circle-cnt');
    let icon = document.querySelector('.img-circle-cnt > i');
    let mode = "light";
let title = document.querySelector('.title');
let searchInput = document.querySelector('#search');
let answerPane = document.querySelector('.result-container');
let footer = document.querySelector('footer');
let footIcon = document.querySelector('.socials');
let cp = document.querySelector('footer > span');
let nSearch = document.querySelector('.n-search');

// DOM STYLING
{
    let setTheme = (mode) => {
        if(mode === "light") {
            console.log(mode);
            navbar.style.background = "var(--Bmode)";
            logo.src="assets/logo/dark-mode-logo.png";
            main.style.background = "var(--lBlack)";
            sl.style.background = "var(--lBlue)";
            title.style.color = "var(--headTextL)";
            searchInput.classList.add('inp-dmode');
            searchInput.classList.remove('inp-lmode');
            answerPane.classList.add('result-dMode');
            answerPane.classList.remove('result-lMode');
            footer.style.background = "var(--Bmode)";
            footIcon.classList.add('icD');
            footIcon.classList.remove('icL');
            cp.style.color = "var(--dWhite)";
        } else if(mode === "dark") {
            console.log(mode);
            navbar.style.background = "var(--dWhite)";
            logo.src="assets/logo/light-mode-logo.png";
            main.style.background = "var(--white)";
            sl.style.background = "var(--dBlue)";
            title.style.color = "var(--headText)";
            searchInput.classList.add('inp-lmode');
            searchInput.classList.remove('inp-dmode');
            answerPane.classList.add('result-lMode');
            answerPane.classList.remove('result-dMode');
            footer.style.background = "var(--dWhite)";
            footIcon.classList.add('icL');
            footIcon.classList.remove('icD');
            cp.style.color = "var(--icBlack)";
        }
    }
    changer.onclick = () => {
        if(mode === "light") {
            setTheme(mode);
            changer.style.background = "var(--black)";
            changer.classList.add('to-right');
            changer.classList.remove('to-left');
            icon.classList.add('fa-moon');
            icon.classList.remove('fa-sun');
            mode = "dark";
        } else if(mode === "dark") {
            console.log(mode);
            setTheme(mode);
            changer.style.background = "var(--white)";
            changer.classList.add('to-left');
            changer.classList.remove('to-right');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            mode = "light";
        }
    }
}

// CALLING THE SEARCH FUNCTION
let search = async() => {
    let mData, title, resSpans = "", searchQ = searchInput.value;
    searchQ = searchQ.split(" ").join("_");
    if (searchQ === ""){
        alert('please type a search item in the search bar');
        return false;
    } else {
        const fetchItem = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=%27' + searchQ);
        let data = await fetchItem.json();
        // USING THE DATA GOTTEN
        console.log(data.query.search[0].snippet);
        mData = data.query;
        title = data.query.search[0].title;
        // SOME STYLINGS TO CHANGE THE DOM ENVIRONMENT
        document.querySelector('.head').style.display = "none";
        answerPane.style.display = "block";
        
        // ADDING ITEM FROM THE DATA RESULT TO THE RESULTPANE
        for(var i = 0; i < 5; i++) {
            resSpans += `
                <div class="res-cnt">
                    <span class="index">${(i + 1)}. </span>
                    <span class="m-cnt">
                        ${mData.search[i].snippet}
                    </span>
                </div>
            `;
            console.log(mData.search[i].snippet);
        }
    }

    // UPDATING THE RESULT PANE
    let template = `
        <div class="control">
            <button class="n-search" onclick="refresh()">New Search</button>
            <button onclick="learnMore()">Learn More</button>
        </div> 
        <hr>
        <div class="ans-cont">
            <h2>${searchInput.value}</h2>
            <div>
                ${resSpans}
            </div>
        </div>
    `;

    answerPane.innerHTML = template;
}
// BUTTON FUNCTIONS FOR THE RESULT PANE
let learnMore = () => {
    let searchQ = searchInput.value;
    searchQ = searchQ.split(" ").join("_");
    let gotoL = "https://en.wikipedia.org/wiki/" + searchQ;
    window.location.assign(gotoL);
}

let refresh = () => {
    answerPane.style.display = "none";
    document.querySelector('.head').style.display = "flex";
    searchInput.value = "";
}
