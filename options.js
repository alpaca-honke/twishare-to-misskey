function Save() {
    const instance_name =
        document.getElementById("instance_name").value || "Misskey.io";
    // 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視して保存する
    chrome.storage.sync.set(
        {
            instance_name: instance_name
                .replace(/^https?:\/\//, "")
                .replace(/\/(.*)$/, ""),
		}
	).then(
		SucceedSave()
	);
}

function Load() {
	chrome.storage.sync.get("instance_name").then((items) => {
        document.getElementById("instance_name").value =
            items.instance_name || "Misskey.io";
    });
}

function SucceedSave() {
	const save_status = document.getElementById("save_status");
	save_status.innerHTML = "保存されました！";
	save_status.style.color = "#55c500"
	Load();
}

function FailedSave() {
	const save_status = document.getElementById("save_status");
	save_status.innerHTML = "保存できませんでした";
	save_status.style.color = "#ff0000";
}

document.addEventListener("DOMContentLoaded", Load);
document.getElementById("instance_name").onkeydown = (e) => {
	if(e.key == "Enter"){
		Save();
	}
};
document.getElementById("save_button").addEventListener("click", Save);
