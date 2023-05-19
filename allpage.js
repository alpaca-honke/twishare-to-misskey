const body = document.body;
const button = document.createElement('button');
const share_img = document.createElement('img');
button.id = '_twishare_to_misskey_share';
button.onclick = '_TwishareToMisskeyShare';
button.appendChild(share_img)
body.appendChild(button);
