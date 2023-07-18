@echo off

@REM 「～ is not recognized as an internal or external command」対策のため日本語の行末には「 」をつけること 
@REM 文字コード切り替え win10はSJISが標準なのでUTF-8に切り替え 
@REM □で文字化けする場合は日本語表示できるフォントに切り替えること
chcp 65001

set rootDirPath=%~dp0
set rootManifestPath=%rootDirPath%manifest.json

IF "%1"=="" (
    IF exist %rootManifestPath% (
        del %rootManifestPath%
    )
) ELSE (
    IF "%1"=="chrome" (
        copy /y %rootDirPath%chrome\manifest.json %rootManifestPath%
    ) ELSE IF "%1"=="firefox" (
        copy /y %rootDirPath%firefox\manifest.json %rootManifestPath%
    ) ELSE (
        echo 引数に無効な値が指定されています 
        echo 引数を指定しなければリポジトリのルートからmanifest.jsonを削除します 
        echo chromeを指定すればChrome向けのマニフェストが設定されます 
        echo firefoxを指定すればFirefox向けのマニフェストが設定されます 
    )
)
