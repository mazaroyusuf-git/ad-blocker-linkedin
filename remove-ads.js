export function removeAds() {
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