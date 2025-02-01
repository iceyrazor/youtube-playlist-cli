#!/bin/bash
FZF_PREVIEW_LINES=20
FZF_PREVIEW_COLUMN=3


cd "$(dirname "$0")"
has_chafa=$1
! command -v chafa >/dev/null && has_chafa=0

if [ "$has_chafa" == "1" ]; then
item="$(sqlite3 ./youtube_stuffs.db "select rowid,* from ytlist" | \
    fzf --preview "./preview.sh {} | xargs chafa --clear -f iterm -s ${FZF_PREVIEW_COLUMNS}x${FZF_PREVIEW_LINES}" \
    | sed 's/|.*//g')"
else
item="$(sqlite3 ./youtube_stuffs.db "select rowid,* from ytlist" | \
    fzf \
    | sed 's/|.*//g')"
fi

url=$(sqlite3 ./youtube_stuffs.db "select id from ytlist where rowid=$item")
printf "https://youtube.com/watch?v=$url" | xclip -selection clipboard
