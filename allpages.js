const body = document.body;
const button = document.createElement('button');
const share_img = document.createElement('img');
button.id = '_twishare_to_misskey_share';
button.onclick = '_TwishareToMisskeyShare';
share_img.src = chrome.runtime.getURL('assets/share.png');
share_img.id = '_twishare_to_misskey_share_img';
button.appendChild(share_img);
body.appendChild(button);
