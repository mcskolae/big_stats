import './home.css';
import '../../../style.css';

// --- Application
import HomeHandler from '../../application/handler';

// --- UI
import handleNav from '../../../shared/ui/nav/application/handler';
import notify from '../../../shared/ui/notification/application/handler';

// --- Domain
import Sport, {SportCompetition} from '../../../sports/domain/sport';
import Match from '../../../matches/domain/match';

const handler = new HomeHandler();

function isCompetitionActive(sport: Sport): boolean {
    const competition: SportCompetition | undefined = sport.competition;

    if (!competition?.startDate || !competition?.endDate) {
        return false;
    }

    const today = new Date().toISOString().slice(0, 10);
    return today >= competition.startDate && today <= competition.endDate;
}

function renderEvents(sports: Sport[], matches: Match[]): HTMLElement {
    const section = document.createElement('section');

    const title = document.createElement('h2');
    title.className = 'section__title';
    title.textContent = 'Événements en cours';
    section.appendChild(title);

    const active: Sport[] = sports.filter(isCompetitionActive);

    if (active.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty';
        empty.textContent = 'Aucun événement en cours.';
        section.appendChild(empty);
        return section;
    }

    active.forEach(sport => {
        const competition: SportCompetition = sport.competition!;

        const event = document.createElement('div');
        event.className = 'event';

        const header = document.createElement('div');
        header.className = 'event__header';

        const name = document.createElement('h3');
        name.className = 'event__name';
        name.textContent = competition.name;

        const badge = document.createElement('span');
        badge.className = 'badge badge--live';
        badge.textContent = 'En cours';

        header.appendChild(name);
        header.appendChild(badge);

        const info = document.createElement('p');
        info.className = 'event__info';
        info.textContent = `${competition.hostCountry} · ${competition.format}`;

        event.appendChild(header);
        event.appendChild(info);

        const recent = matches
            .filter(m => m.sportId === sport.id)
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 3);

        if (recent.length > 0) {
            const list = document.createElement('div');
            list.className = 'event__matches';

            recent.forEach(match => {
                const row = document.createElement('div');
                row.className = 'match-result';

                const date = document.createElement('span');
                date.className = 'match-result__date';
                date.textContent = new Date(match.date).toLocaleDateString('fr-FR');

                const score = document.createElement('span');
                score.className = 'match-result__score';
                score.textContent = match.type === 'match'
                    ? `${match.homeScore} – ${match.awayScore}`
                    : (match.method ?? 'Combat');

                row.appendChild(date);
                row.appendChild(score);
                list.appendChild(row);
            });

            event.appendChild(list);
        }

        section.appendChild(event);
    });

    return section;
}

async function init(): Promise<void> {
    const navEl = document.getElementById('nav')!;
    const appEl = document.getElementById('app')!;

    appEl.innerHTML = '<p class="loading">Chargement...</p>';

    try {
        const { sports, matches } = await handler.handle();

        handleNav(navEl, sports);

        appEl.innerHTML = '';
        appEl.appendChild(renderEvents(sports, matches));

    } catch {
        notify({ message: "L'API est indisponible. Veuillez réessayer plus tard.", type: 'error' });
        appEl.innerHTML = '<p class="error">Impossible de charger les données.</p>';
    }
}

init();
