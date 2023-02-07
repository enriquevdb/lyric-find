const optionsgenius = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
  };
  
  var inputbox = document.getElementById("SearchText"); 
  var songid;

function disableresults() {
    var lyricsearch =  document.getElementById("lyricssearch");
    lyricsearch.innerHTML = "";
    lyricsearch.removeAttribute('class');
    lyricsearch.removeAttribute('style');
}

function disablelyrics() {
    var lyricsmaint = document.getElementById("lyricsmaintext");
    lyricsmaint.innerHTML = "";
    lyricsmaint.removeAttribute('class');
    document.getElementById("songname").innerHTML = "";
    document.getElementById("lyricsdiv").removeAttribute('class');
}

function loadscreen(data)
{

}

  function getlyrics(id)
  {
      fetch('https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=' + id + '&text_format=plain', optionsgenius)
        .then(res => res.json())
        .then(data => {           
            document.getElementById("lyricsmaintext").innerHTML = "";
            document.getElementById("songname").innerHTML = data.lyrics.tracking_data.primary_artist + " " + "-" + " " + data.lyrics.tracking_data.title;
            var lyrics = data.lyrics.lyrics.body.plain;

            for (let i = 0; i < lyrics.length - 1; i++)
            {
                if (lyrics[i + 1] == '[')
                {
                    document.getElementById("lyricsmaintext").innerHTML += "<br><br>";
                }
                else if(lyrics[i] == ']')
                {
                    document.getElementById("lyricsmaintext").innerHTML += ']' + "<br>";
                }
                else
                {
                    document.getElementById("lyricsmaintext").innerHTML += lyrics[i];
                }

            }
        })
          .catch(err => console.log(err, 'ERROR'))
      document.getElementById("lyricsdiv").classList.add("lyricsresultstyle");
      disableresults();
  }

  function searchsong(data)
  {
      document.getElementById("lyricssearch").innerHTML = "";
    for(let i = 0; i < data.hits.length; i++)
    {
      songid = data.hits[i].result.id;
      document.getElementById("lyricssearch").innerHTML += `<a onclick=getlyrics(` + songid + `)>` + data.hits[i].result.full_title + `</a>` + "<br>";
    }
      disablelyrics();
  }

inputbox.addEventListener('keyup', function (enter)
{
    if (enter.keyCode === 13)
    {
        fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=' + inputbox.value + '&per_page=10&page=1', optionsgenius)
        .then(res => res.json())
        .then(data => {        
            searchsong(data);     
            disablelyrics();
        })
        .catch(err => console.log(err, 'ERROR'))

        document.getElementById("lyricssearch").classList.add("lyricssearchfound");
    }
});
