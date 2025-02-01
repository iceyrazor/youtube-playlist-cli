#!/bin/bash
cd "$(dirname "$0")"
rowid="$(echo $1 | sed 's/|.*//g')"
thumbnail="$(ls thumbnails/ | grep "$(sqlite3 ./youtube_stuffs.db "select id from ytlist where rowid=$rowid;").*" )"
printf "thumbnails/$thumbnail"
