// DESIGN LAB (branch-only). Applies the chosen alternative before paint and
// adds a small switcher bar. Delete with design-lab.css once one is chosen.
(function () {
    var KEY = 'pj-design';
    var OPTIONS = [['current', 'Current'], ['deck', 'A · Deck'], ['ledger', 'B · Ledger'], ['stamp', 'C · Stamp']];
    var root = document.documentElement;
    var chosen = null;
    try {
        var fromUrl = new URLSearchParams(location.search).get('design');
        if (fromUrl) localStorage.setItem(KEY, fromUrl);
        chosen = fromUrl || localStorage.getItem(KEY);
    } catch (e) { /* storage blocked: stay on current */ }

    function apply(value) {
        if (value && value !== 'current') root.setAttribute('data-design', value);
        else root.removeAttribute('data-design');
    }
    apply(chosen);

    document.addEventListener('DOMContentLoaded', function () {
        var bar = document.createElement('div');
        bar.className = 'lab-bar';
        bar.setAttribute('role', 'group');
        bar.setAttribute('aria-label', 'Design alternatives');
        var label = document.createElement('span');
        label.textContent = 'Design';
        bar.appendChild(label);
        OPTIONS.forEach(function (option) {
            var button = document.createElement('button');
            button.type = 'button';
            button.textContent = option[1];
            button.dataset.design = option[0];
            button.addEventListener('click', function () {
                try { localStorage.setItem(KEY, option[0]); } catch (e) { /* ignore */ }
                apply(option[0]);
                mark();
                window.dispatchEvent(new Event('resize'));
            });
            bar.appendChild(button);
        });
        function mark() {
            var active = root.getAttribute('data-design') || 'current';
            bar.querySelectorAll('button').forEach(function (button) {
                button.setAttribute('aria-pressed', String(button.dataset.design === active));
            });
        }
        mark();
        document.body.appendChild(bar);
    });
})();
