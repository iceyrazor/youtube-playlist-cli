let db_file="youtube_stuffs.db"

function insert_item(item,imgurl){
    the_box.innerHTML+=`<div>
        <a href="https://youtube.com/watch?v=${item[2]}" target="_BLANK">
        <span class="video-title">${item[0]}: ${item[1]}</span>
        <span class="video-channelname">${item[3]}</span>
        <br>
        <img src="${imgurl}"></img>
        </a>
        </div>`
}

function get_item(item){
    fetch(`/ytlist/thumbnails/${item[2]}.webp`,
        { method: "HEAD" }
    ).then((res) => {
        if (res.ok) {
            insert_item(item,res.url);
        } else {
            fetch(`/ytlist/thumbnails/${item[2]}.jpg`,
                { method: "HEAD" }
            ).then((res) => {
                if (res.ok) {
                    insert_item(item,res.url);
                } else {
                    insert_item(item,null);
                }
            });
        }
    });
}

async function search(){
    const sqlPromise = initSqlJs({
        locateFile: file => `/ytlist/${file}`
    });
    const dataPromise = fetch("/ytlist/"+db_file).then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));
    //search_box.style.display="none";

    category=document.querySelector('input[name="category_choice"]:checked').value;
    let query="SELECT rowid,* FROM ytlist"
    if (category!="ALL"){
        query+=` WHERE category='${category}'`
        if (search_in.value != ""){
            query+=` AND title LIKE '%${search_in.value}%'`
        }
    } else if (search_in.value != ""){
        query+=` WHERE title LIKE '%${search_in.value}%'`
    }

    let res = db.exec(query);

    the_box.innerHTML="";
    res[0].values.forEach(item=>{get_item(item)});
}

let first=false
async function init(){
    const sqlPromise = initSqlJs({
        locateFile: file => `/ytlist/${file}`
    });
    const dataPromise = fetch("/ytlist/"+db_file).then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

    const res = db.exec("SELECT category FROM ytlist");

    let categories=[]
    category_box.innerHTML=`<input type="radio" name="category_choice" value="ALL" checked> ALL<br>`
    res[0].values.forEach(item=>{
        if (categories.indexOf(item[0]) < 0) {
            categories.push(item[0]);

            category_box.innerHTML+=`<input type="radio" name="category_choice" value="${item[0]}"> ${item[0]}<br>`
        }
    })

    if(first==false){
        db_box.innerHTML=`<input type="radio" name="db_choice" value="youtube_stuffs.db" checked> youtube_stuffs.db<br>`
        fetch(`/ytlist/youtube_stuffs_2.db`,
            { method: "HEAD" }
        ).then((res) => {
            if (res.ok) {
                db_box.innerHTML+=`<input type="radio" name="db_choice" value="youtube_stuffs_2.db"> youtube_stuffs_2.db<br>`
            }
        });
    }
    first=true
}
init()

document.body.addEventListener('change', function(event){
    if(event.target.name=="db_choice"){
        db_file=event.target.value
        init()
    }
})
