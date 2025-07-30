# the web page

this isnt perfect takes longer to load the more there is.

![noimg](https://github.com/iceyrazor/youtube-playlist-cli/blob/main/web/example-web.png?raw=true)

- download [https://github.com/sql-js/sql.js/releases/tag/v1.13.0](https://github.com/sql-js/sql.js/releases/tag/v1.13.0) sql-wasm.js and sql-wasm.wasm
- put both files in web/ytlist
- get some sort of webserver. (tis free. i reccomend caddy)
- either
    - download rsync
    - edit upload-web.sh to your server target directory or ssh
    - run upload-web.sh
- or
    - copy web/ytlist and ytlist.html to your webserver
    - copy thumbnails directory to your webserver/ytlist/
    - copy youtube_stuffs.db to webserver/ytlist/
- goto webpage /ytlist.html
