
    import {setup} from "https://www.unpkg.com/@loomhq/record-sdk@2.36.18/dist/esm/index.js?module";
    import {isSupported} from "https://www.unpkg.com/@loomhq/record-sdk@2.36.18/dist/esm/is-supported.js?module";
    import * as loomembed from "https://www.unpkg.com/@loomhq/loom-embed@1.2.2/dist/esm/index.js?module";


    function insertEmbedPlayer(html) {
        const target = document.getElementById("{{uniqid}}_target");
        if (target) {
        target.innerHTML = html;
    }
    }

    async function init(uniqid,jws) {
        const { supported, error } = await isSupported();
        this.uniqid=uniqid;
        this.jws=jws;

        if (!supported) {
            console.warn(`Error setting up Loom: ${error}`);
            return;
        }


        const button = document.getElementById(uniqid + '_launcher');
        if (!button) {
            return;
        }

        const { configureButton } = await setup({
            jws: jws
        });

        const sdkButton = configureButton({ element: button });
        sdkButton.on("insert-click", async (video) => {
            document.getElementById('{{videourlfield}}').value= video.sharedUrl;
            const { html } = await loomembed.oembed(video.sharedUrl, { width: 400 });
            insertEmbedPlayer(html);
        });
    }
