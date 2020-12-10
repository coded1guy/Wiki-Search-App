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
        } else if(mode === "dark") {
            console.log(mode);
            navbar.style.background = "var(--dWhite)";
            logo.src="assets/logo/light-mode-logo.png";
            main.style.background = "var(--white)";
            sl.style.background = "var(--dBlue)";
            title.style.color = "var(--headText)";
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




let resultTitle = document.getElementById('resultTitle');
let resultBody = document.getElementById('resultBody');
let resultBody2 = document.getElementById('resultBody2');
let link = document.querySelector('.link');

// CALLING THE SEARCH FUNCTION
let search = async() => {
    let searchQ = searchInput.value;
    searchQ = searchQ.split(" ").join("_");
    if (searchQ === ""){
        alert('please type a search item in the search bar');
        return false;
    } else {
        const fetchItem = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=%27' + searchQ);
        let data = await fetchItem.json();
        console.log(data.query.search[0].snippet);
        console.log(data.query.search[1].snippet);
    }
    // //Result output
    // resultTitle.innerText =  data.query.search[0].title;
    // resultBody.innerHTML = "1. " + data.query.search[0].snippet;
    // resultBody2.innerHTML = "2. " + data.query.search[1].snippet;
    // link.href = "https://en.wikipedia.org/wiki/" + queryTerm;
    // link.innerText = "Read More";

    // //Extra Styling
    // document.querySelector('.resultContent').style.backgroundColor = "White";
}
let learnMore = () => {
    let searchQ = searchInput.value;
    searchQ = searchQ.split(" ").join("_");
    let gotoL = "https://en.wikipedia.org/wiki/" + searchQ;
    window.location.assign(gotoL);
}


let template = ` 
    <div class="ans-cont">
        <i class="fas fa-caret-down"></i>
    </div>
    <button onclick="learnMore()">Learn More</button>
`