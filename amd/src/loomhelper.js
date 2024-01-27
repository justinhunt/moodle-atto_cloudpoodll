define(['jquery', 'core/log',
    'https://www.unpkg.com/@loomhq/record-sdk@2.36.18/dist/cjs/index.js',
    'https://www.unpkg.com/@loomhq/record-sdk@2.36.18/dist/cjs/is-supported.js',
    'https://www.unpkg.com/@loomhq/loom-embed@1.2.2/dist/cjs/index.js'],
    function($, log,loomSDK, loomIsSupported, loomEmbed) {
    "use strict"; // jshint ;_;


    log.debug('Loom helper: initialising');

    return {
        uniqid: '',

        insertEmbedPlayer: function (html) {
            const target = document.getElementById(this.uniqid + "_target");
            if (target) {
                target.innerHTML = html;
            }
        },

        init: async function(uniqid, jws) {
            this.uniqid = uniqid;
            const { supported, error } = await loomIsSupported.isSupported();

            if (!supported) {
                console.warn(`Error setting up Loom: ${error}`);
                return;
            }

            const button = document.getElementById(uniqid + '_loom_launcher');
            if (!button) {
                return;
            }

            const { configureButton } = await loomSDK.setup({
                jws: jws
            });

            const sdkButton = configureButton({ element: button });
            sdkButton.on("insert-click", async (video) => {
                document.getElementById('{{videourlfield}}').value = video.sharedUrl;
                const { html } = await loomEmbed.oembed(video.sharedUrl, { width: 400 });
                insertEmbedPlayer(html);
            });
        }
    }
});