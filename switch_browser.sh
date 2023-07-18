#!/usr/bin/env bash

DIR=$(dirname $0)

if [ -z $1 ]
then
    if [ -f ${DIR}/manifest.json ]
    then
        rm ${DIR}/manifest.json
    fi
else
    if [ $1 = "chrome" ]
    then
        cp -rfp ${DIR}/chrome/manifest.json $DIR
    elif [ $1 = "firefox" ]
    then
        cp -rfp ${DIR}/firefox/manifest.json $DIR
    else
        echo 引数に無効な値が指定されています
        echo 引数を指定しなければリポジトリのルートからmanifest.jsonを削除します
        echo chromeを指定すればChrome向けのマニフェストが設定されます
        echo firefoxを指定すればFirefox向けのマニフェストが設定されます
    fi
fi

