import '../../../style.css';
import './sport.css';

// --- Application
import SportPageHandler from '../../application/page/handler';

// --- UI
import handleNav from '../../../shared/ui/nav/application/handler';
import notify from '../../../shared/ui/notification/application/handler';
import { renderSportSkeleton } from '../../../shared/ui/skeleton/application/handler';

// --- Tabs
import renderStatsTab from './stats';
import renderHistoriqueTab from './history';
import renderJoueursTab from './players';

// --- Domain
import Sport from '../../domain/sport';
import Team from '../../../teams/domain/team';
import Athlete from '../../../athletes/domain/athlete';

const pageHandler = new SportPageHandler();


function renderHeader(sport: Sport): HTMLElement {
    const header = document.createElement('div');
    header.className = 'sport-header';

    const title = document.createElement('h1');
    title.className = 'sport-header__title';
    title.textContent = sport.name;

    const meta = document.createElement('p');
    meta.className = 'sport-header__meta';
    meta.textContent = sport.governingBody;

    header.appendChild(title);
    header.appendChild(meta);

    if (sport.competition) {
        const comp = document.createElement('div');
        comp.className = 'sport-header__competition';
        comp.textContent = `${sport.competition.name} · ${sport.competition.hostCountry}`;
        header.appendChild(comp);
    }

    return header;
}


function renderTabs(tabs: Array<{ label: string; render: () => HTMLElement }>): HTMLElement {
    const container = document.createElement('div');
    container.className = 'tabs';

    const nav = document.createElement('div');
    nav.className = 'tabs__nav';

    const content = document.createElement('div');
    content.className = 'tabs__content';

    function activate(index: number): void {
        nav.querySelectorAll('.tabs__btn').forEach((btn, i) => {
            btn.classList.toggle('tabs__btn--active', i === index);
        });
        content.innerHTML = '';
        content.appendChild(tabs[index].render());
    }

    tabs.forEach((tab, i) => {
        const btn = document.createElement('button');
        btn.className = 'tabs__btn' + (i === 0 ? ' tabs__btn--active' : '');
        btn.textContent = tab.label;
        btn.addEventListener('click', () => activate(i));
        nav.appendChild(btn);
    });

    container.appendChild(nav);
    container.appendChild(content);
    content.appendChild(tabs[0].render());

    return container;
}

async function init(): Promise<void> {
    const slug  = document.body.dataset.sport ?? '';
    const navEl = document.getElementById('nav')!;
    const appEl = document.getElementById('app')!;

    appEl.appendChild(renderSportSkeleton());

    try {
        const data = await pageHandler.handle(slug);
        const { sport, allSports, athletes, matches, teams } = data;

        handleNav(navEl, allSports);
        document.title = `${sport.name} — Big Stats`;

        appEl.innerHTML = '';
        appEl.appendChild(renderHeader(sport));
        appEl.appendChild(renderTabs([
            {
                label: 'Stats',
                render: () => renderStatsTab(sport, athletes, matches, teams),
            },
            {
                label: 'Historique',
                render: () => renderHistoriqueTab(matches, athletes as Athlete[], teams as Team[]),
            },
            {
                label: sport.type === 'team' ? 'Joueurs' : 'Combattants',
                render: () => renderJoueursTab(athletes as Athlete[]),
            },
        ]));

    } catch (e) {
        const message = e instanceof Error ? e.message : "L'API est indisponible.";
        notify({ message, type: 'error' });
        appEl.innerHTML = '<p class="error">Impossible de charger les données.</p>';
    }
}

init();
