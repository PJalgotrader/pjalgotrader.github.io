// Course pages: modules are <details>. A #m07 link opens its module, "Open all" toggles every one,
// and the index beside the list marks the module in view.
(function () {
    var mods = Array.prototype.slice.call(document.querySelectorAll('details.mod'));
    var button = document.querySelector('.openall');
    var links = Array.prototype.slice.call(document.querySelectorAll('.mod-index a'));

    function syncButton() {
        if (!button) return;
        var allOpen = mods.every(function (m) { return m.open; });
        button.textContent = allOpen ? 'Close all' : 'Open all';
        button.setAttribute('aria-pressed', String(allOpen));
    }

    function openFromHash() {
        var id = decodeURIComponent(location.hash.slice(1));
        var target = id && document.getElementById(id);
        if (target && target.tagName === 'DETAILS') {
            target.open = true;
            requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
        }
    }

    if (button) {
        button.addEventListener('click', function () {
            var open = !mods.every(function (m) { return m.open; });
            mods.forEach(function (m) { m.open = open; });
            syncButton();
        });
    }
    mods.forEach(function (m) { m.addEventListener('toggle', syncButton); });

    links.forEach(function (a) {
        a.addEventListener('click', function () {
            var target = document.getElementById(a.getAttribute('href').slice(1));
            if (target) target.open = true;
        });
    });

    window.addEventListener('hashchange', openFromHash);
    openFromHash();
    syncButton();

    // The current module is the last one whose top has passed a line a third of the way down the screen.
    if (links.length) {
        var byId = {};
        links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
        var ticking = false;
        function mark() {
            ticking = false;
            var line = window.innerHeight / 3, current = null;
            mods.forEach(function (m) { if (m.getBoundingClientRect().top <= line) current = m; });
            if (current && current.getBoundingClientRect().bottom < 0) current = null;
            links.forEach(function (a) { a.classList.toggle('on', !!current && a === byId[current.id]); });
        }
        window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(mark); } }, { passive: true });
        mods.forEach(function (m) { m.addEventListener('toggle', mark); });
        mark();
    }
})();
