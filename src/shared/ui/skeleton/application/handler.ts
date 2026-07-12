function sk(width: string, height: string, extra?: Partial<CSSStyleDeclaration>): HTMLDivElement {
    const d = document.createElement('div');
    d.className = 'skeleton';
    Object.assign(d.style, { width, height, ...extra });
    return d;
}

function renderHomeSkeleton(): HTMLElement {
    const section = document.createElement('section');
    section.appendChild(sk('180px', '24px', { marginBottom: '1.25rem' }));

    for (let i = 0; i < 2; i++) {
        const card = document.createElement('div');
        card.className = 'event';

        const header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem';
        header.appendChild(sk('160px', '18px'));
        header.appendChild(sk('56px', '18px', { borderRadius: '20px' }));
        card.appendChild(header);

        card.appendChild(sk('120px', '13px', { marginBottom: '0.875rem' }));

        for (let j = 0; j < 3; j++) {
            const row = document.createElement('div');
            row.style.cssText = 'display:flex;justify-content:space-between;padding:0.2rem 0';
            row.appendChild(sk('72px', '13px'));
            row.appendChild(sk('48px', '13px'));
            card.appendChild(row);
        }

        section.appendChild(card);
    }

    return section;
}

function renderSportSkeleton(): HTMLElement {
    const container = document.createElement('div');

    const header = document.createElement('div');
    header.className = 'sport-header';
    header.appendChild(sk('220px', '28px', { marginBottom: '0.5rem', opacity: '0.25' }));
    header.appendChild(sk('140px', '16px', { opacity: '0.2' }));
    container.appendChild(header);

    const tabsNav = document.createElement('div');
    tabsNav.style.cssText = 'display:flex;gap:0.25rem;border-bottom:2px solid #e2e8f0;margin:1.5rem 0';
    ['80px', '90px', '80px'].forEach(w => tabsNav.appendChild(sk(w, '34px', { borderRadius: '6px 6px 0 0' })));
    container.appendChild(tabsNav);

    const rows = document.createElement('div');
    rows.style.cssText = 'display:flex;flex-direction:column;gap:0.75rem';
    for (let i = 0; i < 6; i++) {
        rows.appendChild(sk('100%', '40px', { borderRadius: '8px' }));
    }
    container.appendChild(rows);

    return container;
}

export { renderHomeSkeleton, renderSportSkeleton };
