// --- Domain
import Match from '../../../matches/domain/match';
import Athlete from '../../../athletes/domain/athlete';
import Team from '../../../teams/domain/team';

function renderHistoriqueTab(matches: Match[], athletes: Athlete[], teams: Team[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'match-list';

    const sorted = [...matches].sort((a, b) => b.date.localeCompare(a.date));

    if (sorted.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty';
        empty.textContent = 'Aucune rencontre.';
        container.appendChild(empty);
        return container;
    }

    sorted.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card card';

        const date = document.createElement('span');
        date.className = 'match-card__date';
        date.textContent = new Date(match.date).toLocaleDateString('fr-FR');

        if (match.type === 'match') {
            const home = teams.find(t => t.id === match.homeTeamId);
            const away = teams.find(t => t.id === match.awayTeamId);

            const homeEl = document.createElement('span');
            homeEl.className = 'match-card__team';
            homeEl.textContent = home?.name ?? `Équipe ${match.homeTeamId}`;

            const score = document.createElement('span');
            score.className = 'match-card__score';
            score.textContent = `${match.homeScore} – ${match.awayScore}`;

            const awayEl = document.createElement('span');
            awayEl.className = 'match-card__team match-card__team--away';
            awayEl.textContent = away?.name ?? `Équipe ${match.awayTeamId}`;

            const venue = document.createElement('span');
            venue.className = 'match-card__venue';
            venue.textContent = match.venue ?? '';

            card.appendChild(date);
            card.appendChild(homeEl);
            card.appendChild(score);
            card.appendChild(awayEl);
            card.appendChild(venue);
        } else {
            const f1 = athletes.find(a => a.id === match.fighter1Id);
            const f2 = athletes.find(a => a.id === match.fighter2Id);

            const f1El = document.createElement('span');
            f1El.className = 'match-card__team';
            f1El.textContent = f1 ? `${f1.firstName} ${f1.lastName}` : `Fighter ${match.fighter1Id}`;

            const result = document.createElement('span');
            result.className = 'match-card__score';
            result.textContent = match.method ?? 'Combat';

            const f2El = document.createElement('span');
            f2El.className = 'match-card__team match-card__team--away';
            f2El.textContent = f2 ? `${f2.firstName} ${f2.lastName}` : `Fighter ${match.fighter2Id}`;

            const venue = document.createElement('span');
            venue.className = 'match-card__venue';
            venue.textContent = match.venue ?? '';

            card.appendChild(date);
            card.appendChild(f1El);
            card.appendChild(result);
            card.appendChild(f2El);
            card.appendChild(venue);
        }

        container.appendChild(card);
    });

    return container;
}

export default renderHistoriqueTab;
