/*
script ini akan dijalankan apa bila kita meload webPage. contoh nya seperti webNavigation.oncomplete, ini akan mulai duluan untuk menghilangkan iklan
*/

chrome.webNavigation.onCommitted.addListener(function (tab) {
    // mencegah dijalankan ketika frame lain sedang di load
    if (tab.frameId == 0) {
        chrome.tabs.query({active: true, lastFocusedWindow: true,}, tabs => {
            //mendapatkan url dari web page
            let url = tabs[0].url;

            //menghilangkan protokol2 pada url
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "");


            //menghilangan query atau subdomain, dan hanya mengambil base domain nya saja
            let domain = parsedUrl.slice(0, parsedUrl.indexOf("/") == -1 ? parsedUrl.length : parsedUrl.indexOf("/"))
                .slice(0, parsedUrl.indexOf("?") == -1 ? parsedUrl.length : parsedUrl.indexOf("?"));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "linkedin.com") {
                    runLinkedinScript();
                    return;
                }
            } catch (err) {
                throw err;
            }
        })
    }
});

function runLinkedinScript() {

    //injeksi script dari file ke webpage
    chrome.tabs.executeScript({
        file: "linkedin.js"
    });

    return true;
}

function removeAds() {
    // mendapatkan semua element span di webPage
    let spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; i++) {
        //mengecek satu persatu apakah mengandung text Promoted pada spans jika mengandung maka itu adalah ad
        if(spans[i].innerHTML === "Promoted") {
            //mendapatkan div yang menjadil element parent ad nya
            let card = spans[i].closest(".feed-shared-update-v2");

            //ketika class nya beruba dan kita tidak bisa menemukan dengan closest(), maka ambil parent ke 6
            if(card === null) {
                //bisa jadi ard.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                let j = 0;
                card = spans[i];
                while (j < 6) {
                    card = card.parentNode;
                    j++;
                }
            }

            //menghilangkan element
            card.setAttribute("style", "display: none !important;");
        }
    }
}

removeAds();

//memastika ad dihapus saat webPage di scroll
setInterval(function() {
    removeAds();
}, 100);