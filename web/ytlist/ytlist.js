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
                    console.log("no");
                }
            });
        }
    });
}

async function search(){
    const sqlPromise = initSqlJs({
        locateFile: file => `/ytlist/${file}`
    });
    const dataPromise = fetch("/ytlist/youtube_stuffs.db").then(res => res.arrayBuffer());
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


async function init(){
    const sqlPromise = initSqlJs({
        locateFile: file => `/ytlist/${file}`
    });
    const dataPromise = fetch("/ytlist/youtube_stuffs.db").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

    const res = db.exec("SELECT category FROM ytlist");

    let categories=[]
    res[0].values.forEach(item=>{
        if (categories.indexOf(item[0]) < 0) {
            categories.push(item[0]);

            category_box.innerHTML+=`<input type="radio" name="category_choice" value="${item[0]}"> ${item[0]}<br>`
        }
    })

}
init()
