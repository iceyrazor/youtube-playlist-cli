cd "$(dirname "$0")"

rsync -Ra --progress ./ytlist.html ./ytlist/ serv:~/servers/local_html

cd ../
rsync -Ra --progress ./thumbnails serv:~/servers/local_html/ytlist/
