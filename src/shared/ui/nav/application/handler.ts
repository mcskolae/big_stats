// --- Domain
import Link from '../domain/link';
import Sport from '../../../../sports/domain/sport';

// --- Styles
import '../infrastructure/style.css';

function buildLinks(sports: Sport[]): Link[] {
    const current: string = window.location.pathname;

    const home: Link = {
        label: 'Accueil',
        href: '/index.html',
        current: current === '/' || current === '/index.html',
    };

    const sportLinks: Link[] = sports.map(
        (sport: Sport) => (
            {
                label: sport.name,
                href: `/${sport.slug}.html`,
                current: current === `/${sport.slug}.html`,
            }
        )
    );

    return [home, ...sportLinks];
}

function handle(container: HTMLElement, sports: Sport[]): void {
    const links = buildLinks(sports);

    const brand = document.createElement('a');
    brand.href = '/index.html';
    brand.className = 'nav__brand';
    brand.textContent = 'Big Stats';

    const ul = document.createElement('ul');
    ul.className = 'nav__links';

    links.forEach(
        (link) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav__link' + (link.current ? ' nav__link--active' : '');
            a.textContent = link.label;
            li.appendChild(a);
            ul.appendChild(li);
        }
    );

    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.appendChild(brand);
    nav.appendChild(ul);

    container.appendChild(nav);
}

export default handle;
