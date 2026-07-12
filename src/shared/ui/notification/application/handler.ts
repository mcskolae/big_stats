import Notification from "../domain/notification";

function getContainer(): HTMLElement {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function remove(toast: HTMLElement): void {
    toast.classList.add('toast--hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

function handle(notification: Notification): void {
    const container = getContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast--${notification.type}`;
    toast.textContent = notification.message;

    toast.addEventListener('click', () => remove(toast));
    container.appendChild(toast);

    setTimeout(() => remove(toast), 3000);
}

export default handle;
