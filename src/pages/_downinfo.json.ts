// 暂时停用
import type { APIRoute } from "astro";
import { Octokit } from "octokit";
const octokit = new Octokit();
export const GET: APIRoute = async () => {
    const stable_data = (await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
        owner: 'open-ani',
        repo: 'ani',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })).data
    const beta_data = (await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: 'open-ani',
        repo: 'ani',
        per_page: 8,
        page: 1,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })).data
    let beta_name;
    for(let item of beta_data){
        if(item&&item.tag_name.includes('beta'))
            beta_name = item.name
        break;
    }
    return new Response(JSON.stringify({
        stable: {
            version: stable_data.tag_name,
            links: {
                "win": [`https://d.myani.org/${stable_data.tag_name}/ani-${stable_data.name}-windows-x86_64.zip`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/${stable_data.tag_name}/ani-${stable_data.name}-windows-x86_64.zip`],
                "maci": [`https://d.myani.org/${stable_data.tag_name}/ani-${stable_data.name}-macos-x86_64.dmg`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/${stable_data.tag_name}/ani-${stable_data.name}-macos-x86_64.dmg`],
                "macm": [`https://d.myani.org/${stable_data.tag_name}/ani-${stable_data.name}-macos-aarch64.dmg`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/${stable_data.tag_name}/ani-${stable_data.name}-macos-aarch64.dmg`],
                "android": [`https://d.myani.org/${stable_data.tag_name}/ani-${stable_data.name}.apk`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/${stable_data.tag_name}/ani-${stable_data.name}.apk`]
            }
        },
        beta: {
            version: stable_data.tag_name,
            links: {
                "win": [`https://d.myani.org/v${beta_name}/ani-${beta_name}-windows-x86_64.zip`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/v${beta_name}/ani-${beta_name}-windows-x86_64.zip`],
                "maci": [`https://d.myani.org/v${beta_name}/ani-${beta_name}-macos-x86_64.dmg`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/v${beta_name}/ani-${beta_name}-macos-x86_64.dmg`],
                "macm": [`https://d.myani.org/v${beta_name}/ani-${beta_name}-macos-aarch64.dmg`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/v${beta_name}/ani-${beta_name}-macos-aarch64.dmg`],
                "android": [`https://d.myani.org/v${beta_name}/ani-${beta_name}.apk`, `https://mirror.ghproxy.com/?q=https://github.com/open-ani/ani/releases/download/v${beta_name}/ani-${beta_name}.apk`]
            }
        }
    }))
}
