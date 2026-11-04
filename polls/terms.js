// A session's semester comes from its started_at in Logan's time zone:
// January-May is Spring, June-July is Summer, August-December is Fall.
// Slugs like 'fall-2026' are what results.html?term= expects.
function termOf(when) {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', year: 'numeric', month: 'numeric' })
        .formatToParts(new Date(when));
    const year = Number(parts.find(p => p.type === 'year').value);
    const month = Number(parts.find(p => p.type === 'month').value);
    const season = month <= 5 ? 'Spring' : month <= 7 ? 'Summer' : 'Fall';
    return {
        slug: season.toLowerCase() + '-' + year,
        label: season + ' ' + year,
        rank: year * 10 + (month <= 5 ? 1 : month <= 7 ? 2 : 3)
    };
}

function termLabel(slug) {
    return String(slug).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// The next regular semester after a term. Summer is skipped because the courses
// run in Spring and Fall; a summer session still gets its own card if one happens.
function nextTerm(term) {
    const [season, year] = term.label.split(' ');
    return season === 'Fall' ? 'Spring ' + (Number(year) + 1) : 'Fall ' + year;
}
