function Save() {
    const instance_name =
        document.getElementById("instance_name").value || "Misskey.io";
    // 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視して保存する
    chrome.storage.sync.set(
        {
            instance_name: instance_name
                .replace(/^https?:\/\//, "")
                .replace(/\/(.*)$/, ""),
        },
        function () {}
    );
}

function Load() {
    chrome.storage.sync.get("instance_name", function (items) {
        document.getElementById("instance_name").value =
            items.instance_name || "Misskey.io";
    });
}

document.addEventListener("DOMContentLoaded", Load);

document.getElementById("save_button").addEventListener("click", Save);
