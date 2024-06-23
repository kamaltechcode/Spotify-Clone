// lets get our sonf

// भी गलती से भी लोकल फाइल को यदि फेच  का लिया है, तो उनको कूजह मत करना 



console.log("lets wrtie some Javacsript");



let songs;



let currentSong = new Audio();
// this will convert the timing of the song 
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




async function getSongs() {

    // this will get all the elements from the local storage 
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    // through this we can get each songs one by one 
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
    // console.log(songs)
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track;
    if (!pause) {
        // this will make a song play 
        currentSong.play()
        play.src = "pause.svg"

    }





    // lets add current song info and time of the song 
    document.querySelector(".song-info").innerHTML = decodeURI(track)
    // decodeURI is used to make a url decoded to display 

    document.querySelector(".song-duration").innerHTML = "00:00 / 00:00"

}



async function main() {

    let songs = await getSongs()
    playMusic(songs[0], true)


    // to play the first song by defalut 
    // currentSong.src = songs[0]
    console.log(songs)

    let songUL = document.querySelector(".songs-list").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>        
        <img class="invert" src="music.svg">
             <div class="info">
                  <div> ${song.replaceAll("%20", " ")} </div>
                  <div>Kamal</div>
             </div>
         <div class="playNow">
               <div>Play Now</div>
              <img class="invert" src="play.svg" alt="">

          </div>
    </li>`;

    }
    // // Now lets play these songs 
    // var audio = new Audio(songs[0]);
    // audio.play();

    // // Now lets display the duration, current song and song name
    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // });




    // attach an event listnar to each song 
    Array.from(document.querySelector(".songs-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            // After all this we have a problem that all tracks are plyin gone one time they are playing simutenioully 




            // so we have to run them each by each for Current Src ko Groobal verible bnakar work karenge 
        })



        // // console.log(e.getElementsByTagName("div")[0])
        // // this will give info to play all the element 



        // console.log(e.querySelector(".info").firstElementChild.innerHTML)


    })



    // attaack an evenet listenr to play next and previous song 

    // this programe is made for that it will play a song that off and will make off song in play mode 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // lets update the time of a song "Listen for timeupdate event "
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".song-duration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    // add an event listern to use seekbar 
    document.querySelector(".seekbar").addEventListener("click", e => {
        let parcent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = parcent + "%";
        currentSong.currentTime = ((currentSong.duration) * parcent) / 100
    })
    //    aading an evenet listern to the manager the ham burger 
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //    add an event listnear for close button 
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })
    // add an event listern to Previous 
    previous.addEventListener("click", () => {
        console.log("previous clicked ")
        console.log(currentSong)
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])

        }

    })

    // add am event listernear to play next 
    playnext.addEventListener("click", () => {
        console.log("next play clicked ")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])

        }
    })

    // add event to control the volume of an song 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("seting Value to ", e.target.value, "Out of 100")
        currentSong.volume = parseInt(e.target.value)/100
    })

}


main()




























































































// async function getsongs() {
//     let a = await fetch("http://127.0.0.1:3000/songs/audio2.mp3")
//     let response = await a.text();
//     // console.log(response);

//     // to make possible to print these songs i had made an change into my network IPV4

//     let div = document.createElement("div")
//     div.innerHTML = response;
//     //  let lis = div.getElementsByTagName("li")
//     let as = div.getElementsByTagName("a")
//     //  for loop to get the songs from ahref
//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1])
//             // split("/songs/")[1] (this will slice the name of song into towo parts )
//         }
//     }
//     // this will print all the songs that we want to play from the local file
//     return songs
// }
// // this is returning a promise to fullfill the promise we have to make this a async function
// async function main() {
//     let songs = await getsongs()
//     console.log(songs)

//     let songUL = document.querySelector(".songs-list").getElementsByTagName("ul")[0];
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li>${song.replaceAll("%20", "")}</li>`;

//     }

//     // lets play the first song
//     // var audio = new Audio("");
//     // audio.play();
//     // import sound from '../assets/sound.mp3'
//     // const audio = new Audio(sound)
//     // audio.play()
//     // // const audio = new Audio(required('./songs/audio1.mp3'))
//     // // audio.play()

//     let audio = new Audio('../songs/audio2.mp3');
//     //    this audio was not plyaing did remove await and added now playing
//     audio.play();

//     // Now lets display the duration, current song and song name
//     audio.addEventListener("loadeddata", () => {
//         console.log(audio.duration, audio.currentSrc, audio.currentTime)
//     });
// }
// main()


// async function getsongs() {


//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     console.log(response)

//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")

//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1])
//         }

//     }
//     return songs;
//     // console.log(songs);
// }


// async function main() {
//     let songs = await getsongs()
//     console.log(songs)
//     let songUL = document.querySelector(".songs-list").getElementsByTagName("ul")[0]
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20" , " ")} </li>`;

//     }
//     // play the audio
//     let audio = new Audio(songs[0]);
//     audio.play();

//     audio.addEventListener("loadeddata", () => {
//         // let duration = audio.duration;
//         // Now we will print all these things like (duration , currenttime , current Src )
//         console.log(audio.duration, audio.currentSrc, audio.currentTime)
//         // The duration variable now holds the duration (in seconds) of the audio clip
//     });
// }
// main()

// // now we will get all songs and other details



// async function getSongs() {
//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     console.log(response)

//     let div = document.createElement("div")
//     div.innerHTML = response;
//     //    let lis =  div.getElementsByTagName("li") We will get all the songs list but we want actual URL of th song

//     let as = div.getElementsByTagName("a");

//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1])
//         }

//     }


//     return songs
//     //    console.log(songs)
// }
// async function main() {


//     let songs = await getSongs();
//     console.log(songs)

//     let songUL= document.querySelector(".songs-list").getElementsByTagName("ul")[0]

//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li>${song}</li>`;
//     }


//     // // play the first song
//     let audio = new Audio(songs[1]);
//     audio.play();

//     // audio.addEventListener("loadeddata", () => {
//     //     // let duration = audio.duration;
//     //     // Now we will print all these things like (duration , currenttime , current Src )

//     //     console.log(audio.duration, audio.currentSrc, audio.currentTime)

//     //     // The duration variable now holds the duration (in seconds) of the audio clip
//     // });
// }

// main()