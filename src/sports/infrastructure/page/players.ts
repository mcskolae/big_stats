// --- Application
import CompareAthletesHandler from '../../../athletes/application/compare/handler';

// --- UI
import notify from '../../../shared/ui/notification/application/handler';

// --- Domain
import Athlete from '../../../athletes/domain/athlete';

const compareHandler = new CompareAthletesHandler();

type AthleteOption = Pick<Athlete, 'id' | 'firstName' | 'lastName' | 'nickname'>;
type CompareState  = Partial<{ athlete1: Athlete; athlete2: Athlete }>;

const STAT_LABELS: Record<string, string> = {
    matchesPlayed: 'Matchs', goals: 'Buts', assists: 'Passes déc.',
    yellowCards: 'C. jaunes', redCards: 'C. rouges', minutesPlayed: 'Minutes',
    gamesPlayed: 'Matchs', pointsPerGame: 'Pts/m', reboundsPerGame: 'Reb/m',
    assistsPerGame: 'Pds/m', stealsPerGame: 'Int/m', blocksPerGame: 'Ctrs/m',
    fieldGoalPercentage: 'FG%', threePointPercentage: '3P%', freeThrowPercentage: 'LF%',
    minutesPerGame: 'Min/m', wins: 'Victoires', losses: 'Défaites',
    draws: 'Nuls', noContests: 'NC', winsByKo: 'KO',
    winsBySubmission: 'Soumissions', winsByDecision: 'Décisions', titleDefenses: 'Défenses',
};

function debounce<T extends unknown[]>(fn: (...args: T) => void, delay: number): (...args: T) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function buildSelect(athletes: AthleteOption[], placeholder: string): HTMLSelectElement {
    const select = document.createElement('select');
    select.className = 'select';

    const def = document.createElement('option');
    def.value = '';
    def.textContent = placeholder;
    select.appendChild(def);

    athletes.forEach(a => {
        const opt = document.createElement('option');
        opt.value = String(a.id);
        opt.textContent = `${a.firstName} ${a.lastName}${a.nickname ? ` "${a.nickname}"` : ''}`;
        select.appendChild(opt);
    });

    return select;
}

function renderComparison(a1: Athlete, a2: Athlete): HTMLElement {
    const container = document.createElement('div');
    container.className = 'comparison';

    const header = document.createElement('div');
    header.className = 'comparison__header';

    const n1 = document.createElement('span');
    n1.className = 'comparison__name comparison__name--1';
    n1.textContent = `${a1.firstName} ${a1.lastName}`;

    const n2 = document.createElement('span');
    n2.className = 'comparison__name comparison__name--2';
    n2.textContent = `${a2.firstName} ${a2.lastName}`;

    header.appendChild(n1);
    header.appendChild(n2);
    container.appendChild(header);

    Object.keys(a1.stats).forEach(key => {
        const v1  = a1.stats[key];
        const v2  = a2.stats[key] ?? 0;
        const max = Math.max(v1, v2, 1);

        const row = document.createElement('div');
        row.className = 'stat-row';

        const bars = document.createElement('div');
        bars.className = 'stat-row__bars';

        const b1Wrap = document.createElement('div');
        b1Wrap.className = 'bar-wrap bar-wrap--1';
        const b1 = document.createElement('div');
        b1.className = 'bar bar--1';
        b1.style.width = `${(v1 / max) * 100}%`;
        const v1El = document.createElement('span');
        v1El.className = 'bar__val';
        v1El.textContent = String(v1);
        b1Wrap.appendChild(v1El);
        b1Wrap.appendChild(b1);

        const label = document.createElement('span');
        label.className = 'stat-row__label';
        label.textContent = STAT_LABELS[key] ?? key;

        const b2Wrap = document.createElement('div');
        b2Wrap.className = 'bar-wrap bar-wrap--2';
        const b2 = document.createElement('div');
        b2.className = 'bar bar--2';
        b2.style.width = `${(v2 / max) * 100}%`;
        const v2El = document.createElement('span');
        v2El.className = 'bar__val';
        v2El.textContent = String(v2);
        b2Wrap.appendChild(b2);
        b2Wrap.appendChild(v2El);

        bars.appendChild(b1Wrap);
        bars.appendChild(label);
        bars.appendChild(b2Wrap);
        row.appendChild(bars);
        container.appendChild(row);
    });

    return container;
}

function renderJoueursTab(athletes: Athlete[]): HTMLElement {
    const container = document.createElement('div');

    const filters = document.createElement('div');
    filters.className = 'search-filters';

    const queryInput = document.createElement('input');
    queryInput.type = 'text';
    queryInput.placeholder = 'Nom ou surnom...';
    queryInput.className = 'input';

    const positionSelect = document.createElement('select');
    positionSelect.className = 'select';

    const positions = [...new Set(
        athletes.map(a => a.position ?? a.weightClass ?? '').filter(Boolean)
    )].sort();

    const allOpt = document.createElement('option');
    allOpt.value = '';
    allOpt.textContent = 'Toutes positions';
    positionSelect.appendChild(allOpt);
    positions.forEach(pos => {
        const opt = document.createElement('option');
        opt.value = pos;
        opt.textContent = pos;
        positionSelect.appendChild(opt);
    });

    const grid = document.createElement('div');
    grid.className = 'athlete-grid';

    function updateGrid(): void {
        const position = positionSelect.value || undefined;
        const query    = queryInput.value.trim().toLowerCase() || undefined;

        const filtered = athletes.filter(a => {
            if (position) {
                const pos = (a.position ?? a.weightClass ?? '').toLowerCase();
                if (pos !== position.toLowerCase()) return false;
            }
            if (query) {
                const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
                const nick = a.nickname?.toLowerCase() ?? '';
                if (!fullName.includes(query) && !nick.includes(query)) return false;
            }
            return true;
        });

        grid.innerHTML = '';
        if (filtered.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'empty';
            empty.textContent = 'Aucun athlète trouvé.';
            grid.appendChild(empty);
            return;
        }

        filtered.forEach(a => {
            const card = document.createElement('div');
            card.className = 'athlete-card card';

            const name = document.createElement('div');
            name.className = 'athlete-card__name';
            name.textContent = `${a.firstName} ${a.lastName}`;

            const info = document.createElement('div');
            info.className = 'athlete-card__info';
            info.textContent = [a.position ?? a.weightClass, a.nationality]
                .filter(Boolean).join(' · ');

            card.appendChild(name);
            card.appendChild(info);
            grid.appendChild(card);
        });
    }

    positionSelect.addEventListener('change', updateGrid);
    queryInput.addEventListener('input', debounce(updateGrid, 300));
    updateGrid();

    filters.appendChild(queryInput);
    filters.appendChild(positionSelect);
    container.appendChild(filters);
    container.appendChild(grid);

    const compareTitle = document.createElement('h3');
    compareTitle.className = 'section__title';
    compareTitle.style.marginTop = '2rem';
    compareTitle.textContent = 'Comparer deux athlètes';
    container.appendChild(compareTitle);

    const compareBox = document.createElement('div');
    compareBox.className = 'card';

    const state: CompareState = {};

    const selects = document.createElement('div');
    selects.className = 'comparator__selects';

    const select1 = buildSelect(athletes, 'Athlète 1');
    const select2 = buildSelect(athletes, 'Athlète 2');

    const btn = document.createElement('button');
    btn.className = 'btn btn--primary';
    btn.textContent = 'Comparer';

    const resultEl = document.createElement('div');

    btn.addEventListener('click', () => {
        const id1 = Number(select1.value);
        const id2 = Number(select2.value);

        if (!id1 || !id2) {
            notify({ message: 'Veuillez sélectionner deux athlètes.', type: 'info' });
            return;
        }
        if (id1 === id2) {
            notify({ message: 'Veuillez sélectionner deux athlètes différents.', type: 'info' });
            return;
        }

        state.athlete1 = athletes.find(a => a.id === id1)!;
        state.athlete2 = athletes.find(a => a.id === id2)!;

        try {
            const [a1, a2] = compareHandler.handle(state.athlete1, state.athlete2);
            resultEl.innerHTML = '';
            resultEl.appendChild(renderComparison(a1, a2));
        } catch (e) {
            notify({
                message: e instanceof Error ? e.message : 'Erreur de comparaison.',
                type: 'error',
            });
        }
    });

    selects.appendChild(select1);
    selects.appendChild(select2);
    compareBox.appendChild(selects);
    compareBox.appendChild(btn);
    compareBox.appendChild(resultEl);
    container.appendChild(compareBox);

    return container;
}

export default renderJoueursTab;
