playlist="$1"

[ "$playlist" == "" ] && printf "playlist must be defined\n" && exit 1
mkdir "$playlist"
cd "$playlist"

i=0

while [ $i -le 300 ]
do
    item="$(sqlite3 ../youtube_stuffs.db "select id from ytlist where rowid=$i and category='$playlist'")"
    printf "$i: $item\n"
    if [ "$item" != "" ]; then
        yt-dlp --cookies ~/cookies.txt "$item" 2>> ../err.txt
    fi
    ((i++))
done
