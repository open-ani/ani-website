// // TODO: fix too many redirects problem
type platformString = "android" | "maci" | "macm" | "win"
type typeString = "stable" | "beta";
interface updateItem {
    version:string,
    downloadUrlAlternatives:string[],
    publishTime: number,
    description: string
}
interface response {
    updates: updateItem[]
}
export async function getDownloadLink(platform: platformString, type: typeString){
    let api_url;
    switch (platform) {
        case ("android"):
            api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=android&clientArch=aarch64&releaseClass=${type}`
            break
        case ("maci"):
            api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=macos&clientArch=x86_64&releaseClass=${type}`
            break
        case ("macm"):
            api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=macos&clientArch=aarch64&releaseClass=${type}`
            break
        case ("win"):
            api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=windows&clientArch=x86_64&releaseClass=${type}`
            break
    }
    try {
        const data:response = await (await fetch(api_url, { mode:'cors', 'headers':{
            'accept':'application/json'
        } })).json()
        let latest = data.updates[0]
        for(let item of data.updates)
            if (item.publishTime>latest.publishTime&&(type=='stable'||item.version.includes('beta'))) latest = item
        return {
            version: latest.version,
            urls: latest.downloadUrlAlternatives
        }
    }catch(err){
        console.error(err, "Cannot fetch data from the server, plz try to rebuild.");
    }
}

