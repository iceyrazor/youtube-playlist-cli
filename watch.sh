#!/bin/bash
while :; do
    clear
    sqlite3 --markdown ./youtube_stuffs.db 'select * from ytlist order by rowid desc limit 30;'
    sleep 3s
done
