import { writable } from 'svelte/store';

export type Notification = {
    id: string;
    message: string;
    type?: 'success' | 'danger' | 'warning' | 'info' | 'default';
    duration?: number;
}

function createNotificationStore() {
    const { subscribe, set, update } = writable<Notification[]>([]);

    function remove(id: string) {
        update(n => n.filter(i => i.id !== id));
    }

    function add(notification: Omit<Notification, 'id'> & { id?: string }) {
        const id = notification.id ?? '__internal__:' + Math.random().toString(36).substring(8);
        const { duration = 5000, message, type = 'default' } = notification;
        update(n => [...n, { id, message, type, duration }]);
        setTimeout(() => remove(id), duration);
    }

    return {
        subscribe,
        add,
        remove,
        removeAll: () => set([])
    }
}

export const notificationStore = createNotificationStore();