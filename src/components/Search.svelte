<script lang="ts">
    import { onMount } from 'svelte';
    import { i18n } from '@i18n/translation';
    import I18nKey from '@i18n/i18nKey';
  import type { Article } from '@/lib/newt';
    
    let keywordDesktop = '';
    let keywordMobile = '';
    let result:Article[] = [];
    
    let search = async (keyword: string, isDesktop: boolean) => {
        // documentが定義されているか確認
        if (typeof document === 'undefined') return;
    
        let panel = document.getElementById('search-panel');
        if (!panel) return;
    
        if (!keyword && isDesktop) {
            console.log('no key or isView')
            panel.classList.add("float-panel-closed");
            return;
        }
        console.log(keyword)
    
        const response = await fetch(`/api/search.json?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        const allBlogPosts = data.results;
    
        if (!allBlogPosts.length && isDesktop) {
            panel.classList.add("float-panel-closed");
            return;
        }
    
        if (isDesktop) {
            panel.classList.remove("float-panel-closed");
        }
        result = allBlogPosts;
    }
    
    const togglePanel = () => {
        console.log('toggle')
        let panel = document.getElementById('search-panel');
        panel?.classList.toggle("float-panel-closed");
    }
    
    onMount(() => {
    });
    $: search(keywordDesktop, true); 
    $: search(keywordMobile, false);
</script>
    
<!-- search bar for desktop view -->
<div id="search-bar" class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
        bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
        dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
">
    <slot name="search-icon"></slot>
    <input placeholder="{i18n(I18nKey.search)}" bind:value={keywordDesktop} on:focus={() => search(keywordDesktop, true)}
            class="transition-all pl-10 text-sm bg-transparent outline-0
            h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
    >
</div>

<!-- toggle btn for phone/tablet view -->
<button on:click={togglePanel} aria-label="Search Panel" id="search-switch"
        class="btn-plain scale-animation lg:hidden rounded-lg w-11 h-11 active:scale-90">
    <slot name="search-switch"></slot>
</button>

<!-- search panel -->
<div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-[30rem]
top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2">

    <!-- search bar inside panel for phone/tablet -->
    <div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
        bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
        dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10
    ">
        <slot name="search-icon"></slot>
        <input placeholder="Search" bind:value={keywordMobile}
                class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
                focus:w-60 text-black/50 dark:text-white/50"
        >
    </div>

    <!-- search results -->
    {#each result as item}
        <a href={`/${item.slug}`}
            class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
        rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]">
            <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
                {item.title}<slot name="arrow-icon"></slot>
            </div>
            <div class="transition text-sm text-50">
                {@html item.meta.description}
            </div>
        </a>
    {/each}
</div>