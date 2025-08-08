/*dengan removeAds() kita mengiterasi semua element span dengan text yang berisi Promoted, lalu kita mencoba mendapatkan div parent nya, dan mengubah css display nya menjadi none. saat mencari parent dari span tersebut kita menggunakan built in method closest yang akan mengiterasi parent si span nya sampai class feed-shared-update-v2 ketemu.

jika linked in mengupdate class nya menjadi feed-shared-update-v3 maka method nya tidak akan bekerja, kita perlu mengiterasi lagi sampai parent ke 6 yang sama dengan div dari method sebelum nya
*/

import { removeAds } from "./remove-ads.js";

removeAds();

//memastika ad dihapus saat webPage di scroll
setInterval(function() {
    removeAds();
}, 100);