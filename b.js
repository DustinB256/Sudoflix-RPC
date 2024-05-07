let Dispatcher,
    lookupAsset,
    lookupApp,
    apps = {};

const ws = new WebSocket("ws://127.0.0.1:5555"); // connect to arRPC bridge websocke
ws.onopen = async (e) => {
    console.log("we are ready");

    const metadata = meta;
    if (metadata === undefined) return;

    const player = metadata.player;

    if (player === undefined) return;
    let viewMeta = player.meta;
    if (viewMeta === undefined) return;
    let progress = player.progress;
    if (progress === undefined) return;

    let episodeData = player.episode;
    if (episodeData === undefined) return;


    let seasonData = player.season;
    if (seasonData === undefined) return;

    const data = {
        poster: viewMeta.poster,
        title: viewMeta.title,
        tmdbId: viewMeta.tmdbId,
        type: viewMeta.type,
        yearReleased: viewMeta.year,
        progress: {
            total: progress.duration,
            current: progress.time
        },
        episode: {
            episode: episodeData.number,
            title: episodeData.title,
        },
        season: seasonData
    };

    console.log(data);

    ws.send(JSON.stringify({
        command: "SET_ACTIVITY",
        payload: data
    }));
};
function fun() {}

// fun()
