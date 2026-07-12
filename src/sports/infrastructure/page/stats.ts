// --- Application
import StandingsHandler from '../../application/standings/handler';

// --- Domain
import Sport from '../../domain/sport';
import Athlete from '../../../athletes/domain/athlete';
import Match, {TeamMatch} from '../../../matches/domain/match';
import Team from '../../../teams/domain/team';

const standingsHandler = new StandingsHandler();

function renderTeamStandings(teams: Team[], matches: TeamMatch[]): HTMLElement {
    const rows = standingsHandler.handle(teams, matches);

    const wrap = document.createElement('div');
    wrap.className = 'standings card';

    const table = document.createElement('table');
    table.className = 'standings__table';
    table.innerHTML = `
        <thead>
        <tr>
            <th>Équipe</th>
            <th>J</th>
            <th>V</th>
            <th>N</th>
            <th>D</th>
            <th>BP</th>
            <th>BC</th>
            <th>Pts</th>
        </tr>
        </thead>
    `;

    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.team.name}</td>
            <td>${row.played}</td><td>${row.wins}</td><td>${row.draws}</td>
            <td>${row.losses}</td><td>${row.goalsFor}</td><td>${row.goalsAgainst}</td>
            <td class="standings__pts">${row.points}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
}

function renderIndividualRecords(athletes: Athlete[]): HTMLElement {
    const sorted = [...athletes].sort((a, b) => (b.stats.wins ?? 0) - (a.stats.wins ?? 0));

    const wrap = document.createElement('div');
    wrap.className = 'standings card';

    const table = document.createElement('table');
    table.className = 'standings__table';
    table.innerHTML = `
        <thead><tr>
            <th>Combattant</th><th>V</th><th>D</th><th>N</th>
            <th>KO</th><th>Sub.</th><th>Déc.</th>
        </tr></thead>
    `;

    const tbody = document.createElement('tbody');
    sorted.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.firstName} ${a.lastName}${a.nickname ? ` <em>"${a.nickname}"</em>` : ''}</td>
            <td class="standings__pts">${a.stats.wins ?? 0}</td>
            <td>${a.stats.losses ?? 0}</td>
            <td>${a.stats.draws ?? 0}</td>
            <td>${a.stats.winsByKo ?? 0}</td>
            <td>${a.stats.winsBySubmission ?? 0}</td>
            <td>${a.stats.winsByDecision ?? 0}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
}

function renderStatsTab(sport: Sport, athletes: Athlete[], matches: Match[], teams: Team[]): HTMLElement {
    if (sport.type === 'team') {
        const teamMatches = matches.filter((m): m is TeamMatch => m.type === 'match');
        return renderTeamStandings(teams, teamMatches);
    }

    return renderIndividualRecords(athletes);
}

export default renderStatsTab;
