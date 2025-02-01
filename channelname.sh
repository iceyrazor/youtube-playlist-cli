#!/bin/bash
# if a item on the db doesnt have a channel name. it will fetch it
i=1
max=$(( $(sqlite3 ./youtube_stuffs.db 'select rowid from ytlist order by rowid desc limit 1;') ))
while :; do
    urlid="$(sqlite3 ./youtube_stuffs.db 'select id from ytlist where rowid='$i';')"
    channelname="$(sqlite3 ./youtube_stuffs.db 'select channel from ytlist where rowid='$i';')"
    if [ -z "$channelname" ]; then
        setchannel=$(youtube-dl --get-filename -o "%(channel)s" "https://youtube.com/watch/?v=$urlid" | sed "s/'/''/g")
        sqlite3 ./youtube_stuffs.db "update ytlist set channel='$setchannel' where rowid=$i;"
        printf "$i::$urlid\n"
    fi

    ((i=$i+1))
    if (( $i >= $max + 1 )); then
        break
    fi
done
