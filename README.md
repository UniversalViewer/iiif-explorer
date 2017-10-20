# iiif-explorer

See [StencilJS docs](https://stenciljs.com/)

Usage:


    <script src="https://unpkg.com/manifesto.js/dist/client/manifesto.bundle.js"></script>
    <script src="https://unpkg.com/iiif-explorer/dist/iiifexplorer.js"></script>

    <iiif-explorer manifest="http://digital.library.villanova.edu/Collection/vudl:3/IIIF"></iiif-explorer>

    <script>
        window.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('onSelectManifest', (evt) => {
                alert(evt.detail.getDefaultLabel());
            });
        });
    </script>

[Demo (codepen)](https://codepen.io/aeschylus/pen/Qqoxvv)
