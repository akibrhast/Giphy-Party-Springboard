console.log("Let's get this party started!");
const API_KEY =  "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
const API_ENDPOINT = "https://api.giphy.com/v1/gifs/search"
const RESULT_LIMIT  = 20



$("#delete_button" ).click(function() {
    $( ".images" ).empty();
});

//Form Selector
const form = document.querySelector("form");
//Form OnSubmit listener to prevent default and append image node
form.addEventListener('submit', event => {
  // Prevent Default For Submission
  event.preventDefault();
  const searchTerm = document.querySelector('input').value;
  //const api_data = callGiphyApi(searchTerm);
  callGiphyApi(searchTerm).then(function(result){ appendGifToDom(result)})

  //Reset Form Values
  form.reset()


})
async function callGiphyApi(searchTerm){
    let res = await axios.get(API_ENDPOINT, {
    params: {
        api_key: API_KEY,
        limit:RESULT_LIMIT,
        q:searchTerm
    }
  })

  return res.data.data;
}


function appendGifToDom(gifArray){
  gif = gifArray[returnRandomInt(gifArray.length-1)];
    // for(let gif of gifArray){
        $('.images').append(
        `
        <div class="col-md-3">
        <div class="thumbnail">
        <div style="width:100%;height:0;padding-bottom:56%;position:relative;" >
                    <iframe src="${gif.embed_url}" width="100%" 
                                                height="100%" 
                                                style="position:absolute" 
                                                frameBorder="0" 
                                                class="giphy-embed " 
                                                >
                    </iframe>
                </div>
            <div class="caption">
            <p class="text-center text-capitalize">${gif.title}</p>
            </div>
        </a>
        </div>
        </div>
        `)
    // }


  }

function returnRandomInt(maxValue) {
  var x = Math.floor((Math.random() * maxValue) + 1);
  return x;
}