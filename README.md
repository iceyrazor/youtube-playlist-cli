# youtube playlist cli
A simplish set of bash scripts to have a locally stored youtube playlist using fzf and sqlite3 with thumbnails

Technically you can modify this to store anything other than just yt videos

![noimg](https://github.com/iceyrazor/youtube-playlist-cli/blob/main/example.png?raw=true)

# download
Just download this repo and rename youtube_stuffs.db.def to youtube_stuffs.db

# requirements
- bash
- fzf
- sqlite3
- sed
- yt-dlp
- wget

## optional requirements
- chafa # for image previews
- a terminal that works with chafa. i use wezterm

# Usage
- have a playlist or video thats either unlisted or public.
- run ``fetch.sh "youtube url/playlist url" "playlist name"``.
that should pretty much do everything.
- check download_err.txt for download errors. Videos that are marked as nsfw and require sign in will NOT be added to the list and require manual intervention
- then ``getyt``.
    - if you want thumbnails ``getyt -c``.
    - if you want to de a specific "category" or playlist. do ``getyt playlistname``
- if you want too then delete download.txt and download_err.txt and thumberr.txt

# getytmd
generates a md file of the whole db or a category. one with thumbnails and one without.

intended to be used with neovim ``markdown preview`` + ``3rd image``. but anything that can view a markdown file and load the thumbnails is fine. even a browser md viewer.

``getytmd playlistname[optional]``

# config
- In ``getyt`` there is the preview lines and columns. Idk if I can autodetect this because something something fzf doesn't do something something
- If you want to change anything else you would have to change the script. Feel free to make your own config system


# todo
- auto detect detect last item in list when and before adding new item so thumbnails doesn't start at 1. Or async it or something idk
