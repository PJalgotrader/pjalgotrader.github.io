/* Newsletter signup card for the interactive tool pages.
   Shared by all tools: each page loads this file with
   <script src="/Interactive_tools/newsletter-signup.js?v=3" defer></script>
   It adds one card at the end of the page, in the site's Ledger style, and posts
   the email to the same Kit form as the site's newsletter pages (Kit then sends
   the confirmation email from news@pedramjahangiry.com and redirects to
   welcome.html). Theme follows <html data-theme="light|dark"> as the tools set it. */
(function () {
    'use strict';
    var KIT_ACTION = 'https://app.kit.com/forms/10190952/subscriptions';
    if (document.querySelector('.nl-signup')) return;

    var css = [
        '.nl-signup{--nl-card:#F6F7F9;--nl-paper:#FFFFFF;--nl-line:#DCE0E7;--nl-ink:#1C1B18;--nl-soft:#4A505E;--nl-mute:#6E7483;--nl-acc:#0E7A4E;--nl-on-acc:#FFFFFF;--nl-err:#C2452D;',
        '  box-sizing:border-box;width:100%;max-width:1180px;margin:20px auto 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:16px 36px;align-items:center;',
        '  padding:20px 24px;background:var(--nl-card);border:1px solid var(--nl-line);border-top:3px solid var(--nl-acc);border-radius:6px;color:var(--nl-ink);',
        '  font-family:"Inter","Segoe UI",system-ui,-apple-system,sans-serif;text-align:left;}',
        ':root[data-theme="dark"] .nl-signup{--nl-card:#0F1A31;--nl-paper:#0A1020;--nl-line:#263250;--nl-ink:#E9E4D4;--nl-soft:#C0BCAD;--nl-mute:#8B8FA0;--nl-acc:#D0A63C;--nl-on-acc:#0A1020;--nl-err:#D0603F;}',
        '.nl-signup *{box-sizing:border-box;}',
        '.nl-signup .nl-top{margin:0 0 6px;font:600 11.5px/1.3 "IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em;color:var(--nl-acc);}',
        '.nl-signup h2{margin:0 0 6px;font:800 24px/1.1 "Fraunces","Iowan Old Style",Georgia,serif;letter-spacing:-.01em;color:var(--nl-ink);}',
        '.nl-signup .nl-lede{margin:0;font-size:14.5px;line-height:1.55;color:var(--nl-soft);}',
        '.nl-signup form{position:relative;display:flex;flex-wrap:wrap;gap:8px;margin:0;}',
        '.nl-signup input[type=email]{flex:1 1 220px;min-width:0;min-height:44px;margin:0;padding:0 14px;font:15px "Inter",system-ui,sans-serif;color:var(--nl-ink);background:var(--nl-paper);border:1px solid var(--nl-line);border-radius:4px;box-shadow:none;}',
        '.nl-signup input[type=email]::placeholder{color:var(--nl-mute);}',
        '.nl-signup input[type=email]:focus{outline:none;border-color:var(--nl-acc);}',
        '.nl-signup button{min-height:44px;margin:0;padding:0 18px;font:600 13px "IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;color:var(--nl-acc);background:transparent;border:1px solid var(--nl-acc);border-radius:4px;box-shadow:none;text-transform:none;letter-spacing:0;transform:none;cursor:pointer;transition:background-color .2s,color .2s;}',
        '.nl-signup button:hover,.nl-signup button:focus-visible{background:var(--nl-acc);color:var(--nl-on-acc);}',
        '.nl-signup button:disabled{opacity:.6;cursor:progress;}',
        '.nl-signup .nl-fine{flex:0 0 100%;margin:2px 0 0;font:11.5px "IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;color:var(--nl-mute);}',
        '.nl-signup .nl-status{flex:0 0 100%;margin:0;font-size:14px;color:var(--nl-soft);}',
        '.nl-signup .nl-status:empty{display:none;}',
        '.nl-signup .nl-status.is-ok{color:var(--nl-acc);font-weight:600;}',
        '.nl-signup .nl-status.is-error{color:var(--nl-err);}',
        '.nl-signup .nl-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;}',
        '@media (max-width:760px){.nl-signup{grid-template-columns:minmax(0,1fr);padding:18px;}.nl-signup h2{font-size:21px;}}'
    ].join('\n');

    function build() {
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        var card = document.createElement('section');
        card.className = 'nl-signup';
        card.setAttribute('aria-labelledby', 'nl-title');
        card.innerHTML =
            '<div>' +
                '<p class="nl-top">Free &middot; one email a week</p>' +
                '<h2 id="nl-title">Like this tool? Get the newsletter.</h2>' +
                '<p class="nl-lede">The ten things that mattered in AI each week, plus my latest teaching material, interactive visualizations, YouTube videos, the projects I&rsquo;m working on and news on the job market.</p>' +
            '</div>' +
            '<form action="' + KIT_ACTION + '" method="post" novalidate>' +
                '<label class="nl-sr" aria-hidden="true">Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label>' +
                '<label class="nl-sr" for="nl-email">Email address</label>' +
                '<input type="email" id="nl-email" name="email_address" placeholder="you@example.com" autocomplete="email" required>' +
                '<button type="submit">Subscribe</button>' +
                '<p class="nl-status" role="status" aria-live="polite"></p>' +
                '<p class="nl-fine">Unsubscribe anytime &middot; sent with Kit</p>' +
            '</form>';

        // Template C tools keep everything in .wrap; the others stack top-level .container panels.
        var wrap = document.querySelector('body > .wrap');
        if (wrap) {
            card.style.marginTop = '0';
            wrap.appendChild(card);
        } else {
            var panels = document.querySelectorAll('body > .container');
            var last = panels[panels.length - 1];
            if (last) last.insertAdjacentElement('afterend', card);
            else document.body.appendChild(card);
        }

        var form = card.querySelector('form');
        var email = card.querySelector('#nl-email');
        var trap = card.querySelector('input[name="website"]');
        var status = card.querySelector('.nl-status');
        var button = card.querySelector('button');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (trap.value) return;                       // bots fill the hidden field
            if (!email.checkValidity()) { email.reportValidity(); return; }
            button.disabled = true;
            status.className = 'nl-status';
            status.textContent = 'Signing you up…';
            var data = new FormData();
            data.append('email_address', email.value.trim());
            // Kit sends no CORS headers, so the reply is opaque; only a network failure shows as an error.
            fetch(KIT_ACTION, { method: 'POST', body: data, mode: 'no-cors' })
                .then(function () {
                    status.className = 'nl-status is-ok';
                    status.textContent = 'Almost done: check your inbox and click the confirmation link.';
                    email.value = '';
                })
                .catch(function () {
                    status.className = 'nl-status is-error';
                    status.textContent = 'That did not go through. Check your connection and try again.';
                })
                .then(function () { button.disabled = false; });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
})();
