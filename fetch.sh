#!/bin/bash

# arg1 is the url and arg2 is the playlist name
# if arg1 is not defined. just fetch thumbnails

# cant do whats below because i need to replace all ' within a subset of 'string' with '' to escape it.

# yt-dlp --get-filename -o "insert into ytlist values('%(title)s','%(channel)s','%(id)s','shorts','');" "https://www.youtube.com/playlist?list=PLwpvCCyacwS9Us6F1_UUUre1Py9p4ex4J" 2> out2.txt #| sed "s/'/''/g" #| sqlite3 ./youtube_stuffs.db

cd "$(dirname "$0")"
file="./download.txt"

if [ "$1" ]; then
    [ -z "$2" ] && echo playlist not defined. continue? && read -p "continue? (press any key)" 
    yt-dlp --get-filename -o "%(title)s----%(id)s----%(channel)s" "$1" > "$file" 2> download_err.txt 
    printf "\n\n"

    i=1
    max=$(( $(wc -l "$file" | sed 's/ .*//g') ))
    while :; do
        printf -- "insert into ytlist values('%s','%s','')" "$(head -n $i $file | tail -n 1 | sed "s/'/''/g" | sed "s/----/','/g" )" "$2" | sqlite3 ./youtube_stuffs.db
        printf "insert: $i\n"
        ((i=$i+1))
        if (( $i >= $max + 1 )); then
            break
        fi
    done
    echo ----PLAYLIST DONE
    read -p "continue? (Y,n)" input
    [ "$input" == "n" ] && exit 1;
    [ "$input" == "N" ] && exit 1;
fi


echo ----Downloading Thumbnails
i=1
max=$(( $(sqlite3 ./youtube_stuffs.db 'select rowid from ytlist order by rowid desc limit 1;') ))
while :; do
    urlid="$(sqlite3 ./youtube_stuffs.db 'select id from ytlist where rowid='$i';')"
    if [ -z "$(ls -l thumbnails | grep ".$urlid")" ]; then
        printf "$i::$urlid\n"
        thumbnailurl="$(yt-dlp --get-thumbnail "https://youtube.com/watch?v=$urlid" 2>> thumberr.txt)"
        if [ ! "$thumbnailurl" == "" ]; then
            ext="$(printf "$thumbnailurl" | sed 's/.*\.//g' | sed 's/?.*//')"
            wget "$thumbnailurl" -O "thumbnails/$urlid.$ext"
        else
            echo could not download thumbnail $urlid
        fi
    fi

    ((i=$i+1))
    if (( $i >= $max + 1 )); then
        break
    fi
done
