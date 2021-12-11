const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


function addVideo(video) {

    const content = document.createTextNode('Your browser does not support the video tag.');
    const videoUrl = filterByContentType(video.variants, 'video/mp4').url

    let colunmEl = document.createElement('div');
    colunmEl.classList.add('col')
    colunmEl.classList.add('text-center')

    let cardElement = document.createElement('div');
    cardElement.classList.add('tweet-card')

    let videoDivElement = document.createElement('div');
    videoDivElement.id = video.tweet_id

    let videoThumbEl = document.createElement('img');
    videoThumbEl.setAttribute('onclick', "replaceImgToVideo(" + video.tweet_id + ", '" + videoUrl + "')")
    videoThumbEl.src = video.video_img
    videoThumbEl.classList.add('tweet-card-image')

    let cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body')

    let downloadBtnEl = document.createElement('a');
    downloadBtnEl.setAttribute('onclick', "downloadVideo('" + videoUrl + "')")
    downloadBtnEl.classList.add('btn')
    downloadBtnEl.classList.add('btn-primary')
    downloadBtnEl.appendChild(document.createTextNode('Download'))

    let pEl1 = document.createElement('p');
    pEl1.appendChild(downloadBtnEl)

    let originalBtnEl = document.createElement('a');
    originalBtnEl.setAttribute('href', video.video_url)
    originalBtnEl.setAttribute('target', '_blank')
    originalBtnEl.classList.add('btn')
    originalBtnEl.classList.add('btn-primary')
    originalBtnEl.appendChild(document.createTextNode('Original Tweet'))

    let pEl2 = document.createElement('p');
    pEl2.appendChild(originalBtnEl)

    videoDivElement.appendChild(videoThumbEl)
    cardBodyEl.appendChild(pEl1)
    cardBodyEl.appendChild(pEl2)
    cardElement.appendChild(videoDivElement)
    cardElement.appendChild(cardBodyEl)
    colunmEl.appendChild(cardElement)

    document.getElementById('video-grid').appendChild(colunmEl);
}

function downloadVideo(videoUrl) {
    enableLoading();
    let oReq = new XMLHttpRequest();
    oReq.responseType = 'blob';
    oReq.onload = function(e) {
        var blob = e.currentTarget.response;
        var fileName = 'video.mp4'
        saveBlob(blob, fileName);
    };
    oReq.open("get", videoUrl, true);
    oReq.send();
}

function saveBlob(blob, fileName) {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
    disableLoading();
}

function loadVideos() {
    disableLoading();
    let videoList = JSON.parse(this.responseText);
    videoList.Items.forEach(function(video) {
        addVideo(video);
    })
}

function filterByContentType(variants, contentType) {
    let mp4List = variants.filter(function(variant) {
        return variant.content_type === contentType;
    })

    let greatest

    mp4List.forEach(function(variant) {
        if (!greatest){
            greatest = variant
        }
        if (variant.bitrate > greatest.bitrate) {
            greatest = variant
        }
    })

    return greatest
}

function enableLoading(){
    let loading = document.createElement('div');
    loading.classList.add('loading')
    loading.id = 'loading'

    var feed = document.getElementById('feed');
    feed.appendChild(loading);
}

function disableLoading(){
    let loading = document.getElementById('loading');
    loading.remove()
}

function replaceImgToVideo(id, videoUrl) {

    var element = document.getElementById(id);
    var videlem = document.createElement("video");
    element.innerHTML = '';
    source = videoUrl;
    videlem.classList.add('video-player')

    videlem.setAttribute('controls', '')
    var sourceMP4 = document.createElement("source");
    sourceMP4.type = "video/mp4";
    sourceMP4.src = source;
    videlem.appendChild(sourceMP4);
    videlem.autoplay = true;
    element.appendChild(videlem);
}

function fetchVideos() {
    enableLoading()
    let oReq = new XMLHttpRequest();
    oReq.onload = loadVideos;
    oReq.open("get", "https://api.myvideohunter.com/requester/" + params.u + "/list", true);
    oReq.send();
}

window.onload = fetchVideos;