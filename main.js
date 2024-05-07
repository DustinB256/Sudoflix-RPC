setInterval(
    ()=>{
        const meta = meta
        if(meta === undefined)return;

        const player = meta.player

        if(player === undefined)return;
        let viewMeta = player.meta
        if(viewMeta === undefined) return;

        
        const data = 
        {
            "poster": viewMeta.poster,
            "title": viewMeta.title,
            "tmdbId": viewMeta.tmbdId,
            "type": viewMeta.type,
            "yearReleased": viewMeta.year,
        }

        console.log(data)
    }, 5000
)
