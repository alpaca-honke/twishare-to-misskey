chrome.storage.sync.get("button_visibility").then((items) => {
	button_visibility = items.button_visibility;
	if (button_visibility !== false){
		const body = document.body;
		const button = document.createElement('button');
		const share_img = document.createElement('img');
		button.id = '_twishare_to_misskey_share';
		share_img.src = chrome.runtime.getURL('assets/share.png');
		share_img.id = '_twishare_to_misskey_share_img';
		button.appendChild(share_img);
		body.appendChild(button);
		button.addEventListener('click', () => {
			chrome.storage.sync.get("instance_name").then((items) => {
				const instance_name = items.instance_name || "Misskey.io";
				const now_url = location.href;
				const now_title = document.title;

				const instance_url = new URL(`https://${instance_name}/share`);
				if (now_title){
					instance_url.searchParams.set("text", now_title);
				}
				instance_url.searchParams.set("url", now_url);
				location.href = instance_url.href;
			});
		});
	}
});

