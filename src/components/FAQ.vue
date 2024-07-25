<template>
	<section class="text-gray-100 w-full xl:w-4/5 mx-auto" id="faq">
		<div class="container flex flex-col justify-center p-6 mx-auto md:py-10">
			<h2 class="mt-4 mb-6 text-4xl font-bold leading-none text-center sm:text-5xl">常见问题收集</h2>
			<div class="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
				<div>
					<h3 class="font-semibold">资源来源是什么?</h3>
					<p class="mt-1 text-gray-300">
                        全部视频数据都来自网络, Ani 本身不存储任何视频数据。 
                        Ani 支持两大数据源类型：BT 和在线。
                        BT 源即为公共 BitTorrent P2P 网络， 每个在 BT 网络上的人都可分享自己拥有的资源供他人下载。
                        在线源即为其他视频资源网站分享的内容。Ani 本身并不提供任何视频资源。
                        本着互助精神，使用 BT 源时 Ani 会自动做种 (分享数据)。
                        BT 指纹为<label>-aniLT3000-</label>，其中<label>3000</label>为版本号；UA 为类似 <label>ani_libtorrent/3.0.0</label>。
                    </p>
				</div>
				<div>
					<h3 class="font-semibold">弹幕来源是什么?</h3>
					<p class="mt-1 text-gray-300">
                        Ani 拥有自己的公益弹幕服务器，在 Ani 应用内发送的弹幕将会发送到弹幕服务器上。
                        每条弹幕都会以 Bangumi 用户名绑定以防滥用（并考虑未来增加举报和屏蔽功能）。
                        <br />
                        Ani 还会从<a href="https://www.dandanplay.com/" target="_blank" class="underline">弹弹play</a>获取关联弹幕，弹弹play还会从其他弹幕平台例如哔哩哔哩港澳台和巴哈姆特获取弹幕。
                        番剧每集可拥有几十到几千条不等的弹幕量。</p>
				</div>
				<div>
					<h3 class="font-semibold">Bangumi 和 Ani 的关系 & 我注册不了 bangumi 怎么办</h3>
					<p class="mt-1 text-gray-300">Bangumi 是由 Sai 于桂林发起的 ACG 分享与交流项目，你可以通过它管理你的追番进度。Ani 依赖 Bangumi 的功能来做进度管理等功能。Bangumi 不提供播放功能，请使用能正常接受邮件的邮箱注册 Bangumi。</p>
				</div>
				<div>
					<h3 class="font-semibold">电脑版 Ani 播放不了怎么办</h3>
					<p class="mt-1 text-gray-300">对于在线源，第一次播放需要等待资源下载一段时间。对于某些 BT 源（尤其是老旧的资源）则因无人做种而下载速度慢，这种情况下你可以尝试缓存。</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style>
#faq label {
    background-color: #1d2432;
    padding: 5px;
    margin: 0 3px;
    border-radius: 0.225rem;
    font-size: small;
}
</style>