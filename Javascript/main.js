//----------------------------------------------////////        Initialization        /////////-----------------------------------------//

const currentsongname = document.querySelector(".currentsongname");
const currentsongimg = document.querySelector(".currentsongimg");
const mainPlay = document.getElementById("mainPlay");
const previousPlay = document.getElementById("previous_track");
const nextPlay = document.getElementById("next_track");
let autoplay = "";
const myProgressBar = document.getElementById("myprogressbar");
const cur_time = document.getElementById("currentduration");
const tot_time = document.getElementById("totalduration");
const audioVolume = document.getElementById("volume");
const volUpdate = document.querySelector(".volupdate");
const playlist = document.querySelector(".playlist");
const lastlistened = document.querySelector(".last_listened");
const favourites = document.querySelector(".favourites");
let CopyrightFree=["Heroes Tonight","Tule Lost","Elektronomia","Fearless Chris Linton","Warriyo"]
let LatestTrends=["TereSangYara","TuhiYaarMera","TuhiTohHai","Shayarana","RangSharbatoKa"]
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchlens = document.querySelector("[mag-search]");

const SongCardTemplate = document.querySelector("[data-song-template]");
const SongCardContainer = document.querySelector("[data-left-container]");
const SongsCardContainer = document.querySelector("[data-left-container]");
const SongsCardTemplate = document.querySelector("[data-template]");
const lattrend = document.querySelector(".latest-trends-posters");
const poptrend = document.querySelector(".popular-trends-posters");
let songcard = document.querySelector(".song-cards");
let songs = [];
let run = [];
const playlistTemplate = document.querySelector("[data-playlist-template]");
const playlistContainer = document.querySelector("[data-playlist-container]");
const delplaylist = document.querySelector("#del1");
const dellast = document.querySelector("#del2");
const delfavourite = document.querySelector("#del3");

delplaylist.addEventListener("click",()=>{
    if(confirm("Are You Sure You Want To Delete")){
        localStorage.setItem('sarray',"[]");
        alert('Deleted');
    }
    else{
        //
    }

})
dellast.addEventListener("click",()=>{
    if(confirm("Are You Sure You Want To Delete")){
        localStorage.setItem('sarray',"[]");
        alert('Deleted');
    }
    else{
        //
    }

})
delfavourite.addEventListener("click",()=>{
    if(confirm("Are You Sure You Want To Delete")){
        localStorage.setItem('sarray',"[]");
        alert('Deleted');
    }
    else{
        //
    }

})

///////////////////////////---------------------Visualizer--------------------//////////////////////////
const visualizer = document.querySelector('.visualization');
visualizer.style.backgroundImage = "url('/Images/voicebar4.gif')";
visualizer.style.backgroundSize = "contain";
let inc = 0
visualizer.addEventListener("click",(e)=>{
    function increment(){
        if(inc<=5){
            visualizer.style.backgroundImage = `url('/Images/voicebar${inc}.gif')`;
            visualizer.style.backgroundSize = "contain";
            inc = inc + 1;
        }
        else{
            return inc = 1;
        }
    }
    increment();
})

lattrend.addEventListener("click",(e)=>{
    let ltrend = e.target.id;
    ltrend=="lt1"?(localStorage.setItem("song","Tere Sang Yaara"),location.reload()):console.log("Not Matched");
    ltrend=="lt2"?(localStorage.setItem("song","Looteri"),location.reload()):console.log("Not Matched");
    ltrend=="lt3"?(localStorage.setItem("song","Ik Vaari Aa"),location.reload()):console.log("Not Matched");
    ltrend=="lt4"?(localStorage.setItem("song","PHIR KABHI"),location.reload()):console.log("Not Matched");
    ltrend=="lt5"?(localStorage.setItem("song","KAUN TUJHE"),location.reload()):console.log("Not Matched");
    ltrend=="lt6"?(localStorage.setItem("song","Mere Bina"),location.reload()):console.log("Not Matched");
    ltrend=="lt7"?(localStorage.setItem("song","Sooraj Dooba Hain"),location.reload()):console.log("Not Matched");
    ltrend=="lt8"?(localStorage.setItem("song","Pehli Dafa"),location.reload()):console.log("Not Matched");

})

poptrend.addEventListener("click",(e)=>{
    let ptrend = e.target.id;
    ptrend=="pt1"?(localStorage.setItem("song","Khairiyat"),location.reload()):console.log("Not Matched");
    ptrend=="pt2"?(localStorage.setItem("song","Jugnu"),location.reload()):console.log("Not Matched");
    ptrend=="pt3"?(localStorage.setItem("song","Aaj dil Shayaraana"),location.reload()):console.log("Not Matched");
    ptrend=="pt4"?(localStorage.setItem("song","DIL CHEEZ TUJHE DEDI"),location.reload()):console.log("Not Matched");
    ptrend=="pt5"?(localStorage.setItem("song","Soch Na Sake"),location.reload()):console.log("Not Matched");
    ptrend=="pt6"?(localStorage.setItem("song","Blame The Night"),location.reload()):console.log("Not Matched");
    ptrend=="pt7"?(localStorage.setItem("song","Theher Ja"),location.reload()):console.log("Not Matched");
    ptrend=="pt8"?(localStorage.setItem("song","Tu Hi Toh Hai"),location.reload()):console.log("Not Matched");
})

let plus = document.querySelectorAll(".plus");
plus.forEach(element =>{ 
    element.addEventListener("click",(e)=>{
        tplaylist(e.target.id)
    })
});

function tplaylist(arr){
    let res =[];
    res = JSON.parse(localStorage.getItem("sarray"));
    res.push(arr);
    let ret = [...new Set(res)];
    ret = ret.filter(e => e !== null);
    localStorage.setItem("sarray",JSON.stringify(ret));
    return ret
}

//----------------------------------------------////////         Search Field         /////////-----------------------------------------// 

if(!searchInput.classList.contains("hide")){
    searchInput.classList.add("hide");
    userCardContainer.classList.add("hide");
}
else{
    searchInput.classList.remove("hide");
    userCardContainer.classList.add("hide");
}

//----------------------------------------------////////         Search Icon         /////////-----------------------------------------//

searchlens.addEventListener("click",()=>{
    searchInput.classList.toggle("hide");
    userCardContainer.classList.toggle("hide");
    songcard.classList.add("hide");
})

searchInput.addEventListener("input", e =>{
    songcard.classList.remove("hide");
    const value = e.target.value.toLowerCase();
    songs.forEach(song =>{
        const isVisible = song.title.toLowerCase().includes(value) || song.artist.toLowerCase().includes(value);
        song.element.classList.toggle('hide',!isVisible);
        song.element.addEventListener("click", ()=>{
            let setsong = song.title;
            localStorage.setItem("song",setsong);
            location.reload();
            
        })
    })
})

//--------------------------------------------------------////     Playlist     ////-----------------------------------------------------//

playlist.addEventListener("click",()=>{
    let arrs = [];
    arrs = tplaylist();
    arrs.forEach((element)=>{
        console.log(element)
        songs.forEach((song)=>{
            if(element==song.title){
                const card = playlistTemplate.content.cloneNode(true).children[0];
                const image = card.querySelector("[data-playlist-img]");
                const header = card.querySelector("[data-playlist-name]");
                image.src = song.image;
                header.textContent = `${song.title}❰${"    "} ${song.artist} ${"    "}❱`;
                playlistContainer.append(card);
            }

        })
    })
})

//-----------------------------------------------////////     Foward Music     /////////------------------------------------------------//

nextPlay.addEventListener("click", ()=>{
    let arr = Array.from(songs);
    let re = 0; 
    re = Number(localStorage.getItem("ct"));
    re = re + 1;
    if(re>arr.length-1){
        localStorage.setItem("ct",0);
        localStorage.setItem("song",arr[0].title);
        // MainPlayer();
        location.reload();
    }
    else{
        console.log(arr[re]);
        localStorage.setItem("ct",re);
        localStorage.setItem("song",arr[re].title);
        // MainPlayer();
        location.reload();
    }
})

//----------------------------------------------////////    Previous Played     /////////----------------------------------------------//

previousPlay.addEventListener("click", ()=>{
    let arr = Array.from(songs);
    let re = 0; 
    re = Number(localStorage.getItem("ct"));
    re = re - 1;
    if(re<0){
        localStorage.setItem("ct",arr.length-1);
        localStorage.setItem("song",arr[arr.length-1].title);
        // MainPlayer();
        location.reload();
    }
    else{
        console.log(arr[re]);
        localStorage.setItem("ct",re);
        localStorage.setItem("song",arr[re].title);
        // MainPlayer();
        location.reload();
    }          
})

//-------------------------------------////////     Data Fetching & Creating Song Cards     /////////---------------------------------//

let source = fetch("/JSON/songs.json").then((response) =>{return response.json()})
.then((data) =>{
songs = data.map(user =>{
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        const image = card.querySelector("[data-image]");
        image.src = user.image;
        header.textContent = `${user.title}`;
        body.textContent = `❰${"    "} ${user.artist} ${"    "}❱`;
        userCardContainer.append(card);
        card.style.marginTop = "0.28rem";
        const ltds = document.querySelectorAll(".latest-trends-posters");
        ltds.innerHTML = user.title;
        return { title: user.title, artist: user.artist, image: user.image, source: user.source, element: card }
    })

})

//----------------------------------------------/////////       Main Player       /////////---------------------------------------------//
function MainPlayer(){
    console.log("started");
    songs.forEach(song =>{
        let currentplaying = localStorage.getItem("song");
        if(song.title==currentplaying){
            console.log(song.title);
            let audioPlayer = new Audio(song.source);
            currentsongname.innerHTML = `${song.title}`+`${"   "}`+"❰"+`${"   "}`+`${song.artist}`+`${"   "}`+"❱";
            currentsongimg.src = song.image;
            // audioPlayer.play();
            

            //---------------------// Icon Play If Playing //-----------------------//

            audioPlayer.addEventListener("playing",()=>{
                mainPlay.classList.remove("fa-circle-play");
                mainPlay.classList.add("fa-circle-pause");
                currentsongimg.classList.add("rotate");
            })

            mainPlay.addEventListener("click", ()=>{
                if(audioPlayer.paused || audioPlayer.currentTime<=0){
                    audioPlayer.play();
                    mainPlay.classList.remove("fa-circle-play");
                    mainPlay.classList.add("fa-circle-pause");
                    currentsongimg.classList.add("rotate");
                }
                else{
                    audioPlayer.pause();
                    mainPlay.classList.remove("fa-circle-pause");
                    mainPlay.classList.add("fa-circle-play");
                    currentsongimg.classList.remove("rotate");
                }
            })
        
            audioPlayer.addEventListener("ended",()=>{
                let arr = Array.from(songs);
                for(var i=0;i<1;i++){
                    let reval = 0;
                    reval = Number(localStorage.getItem("count"));
                    reval= reval+1;
                    arr[reval];
                    // console.log(arr[reval].title);
                    if(reval>arr.length-1){
                        localStorage.setItem("count",0);
                        localStorage.setItem("song",arr[0].title);
                        location.reload();
                        return
                    }
                    else{
                        localStorage.setItem("count",reval);
                        localStorage.setItem("song",arr[reval].title);
                        // MainPlayer();
                        location.reload();
                    }

                }
                
            })
            ////----------// TimeStamp //---------////
        
            audioPlayer.addEventListener("timeupdate",()=>{
                progress = parseFloat((audioPlayer.currentTime/audioPlayer.duration*100)*10);
                myProgressBar.value = progress;
                tot_time.innerHTML = Math.floor(audioPlayer.duration/60)+":"+ Math.floor(audioPlayer.duration%60);
                let curr_sec = Math.floor(audioPlayer.currentTime%60);
                if(curr_sec<10){
                    curr_sec=`0${curr_sec}`;
                }
                cur_time.innerHTML = Math.floor(audioPlayer.currentTime/60)+ ":" +`${curr_sec}`;
            })
        
            myProgressBar.addEventListener("change",()=>{
                audioPlayer.currentTime = ((myProgressBar.value*audioPlayer.duration/100)/10);
            })
        
            //-----------// VOLUME CONTROL //-------------//
        
            audioPlayer.volume= 0.5;
            audioVolume.addEventListener("change",()=>{
                audioPlayer.volume = audioVolume.value/100;
                volUpdate.innerHTML = audioVolume.value + "%";
                localStorage.setItem("volume",audioVolume.value);
            })

            //------------- Auto Set Volume ---------------//

            let volume = localStorage.getItem("volume");
            audioPlayer.volume = volume/100;
            audioVolume.value = volume;
            volUpdate.innerHTML= volume + "%";
        }

        
    })   
}
//----------------------------------------------/////////     Main Player End     /////////-------------------------------------------//

window.addEventListener("load",()=>{
    setTimeout(()=>{MainPlayer()},50);
})


// function shuffleArray() {
//     let array = Array.from(songs);
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//         console.log(array[j]);
//     }
// }