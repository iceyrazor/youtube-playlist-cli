# youtube playlist cli
A simplish set of bash scripts to have a locally stored youtube playlist using fzf and sqlite3 with thumbnails

Technically you can modify this to store anything other than just yt videos

![noimg](https://github.com/iceyrazor/youtube-playlist-cli/blob/main/example.png?raw=true)

# download.
Just download this repo and rename youtube_stuffs.db.def to youtube_stuffs.db

# requirements
- bash
- fzf
- sqlite3
- sed
- yt-dlp

## optional requirements
- chafa # for image previews
- a terminal that works with chafa. i use wezterm

# Usage
- have a playlist or video thats either unlisted or public.
- run ``fetch.sh "youtube url/playlist url" "playlist name"``.
that should pretty much do everything.
- check download_err.txt for download errors. Videos that are marked as nsfw and require sign in will NOT be added to the list and require manual intervention
- then ``get_yt2.sh.``.
if you want thumbnails ``get_yt2.sh 1``.
- if you want too then delete download.txt and download_err.txt and thumberr.txt

# config
- In ``get_yt2.sh`` there is the preview lines and columns. Idk if I can autodetect this because something something fzf doesn't do something something
- If you want to change anything else you would have to change the script. Feel free to make your own config system



# todo
- auto detect detect last item in list when and before adding new item so thumbnails doesn't start at 1. Or async it or something idk
