import { writable } from 'svelte/store';
import { getItemLocalStorageFromLocalStorage, setItemToLocalStorage } from './utils';

type Settings = {
    openAIKey?: string;
    textToSpeechAPIKey?: string;
    rememberAIKey?: boolean;
};

function createSettings() {
    const { subscribe, set, update } = writable<Settings>({});
    const localSettings = getItemLocalStorageFromLocalStorage('settings');
    if (localSettings) set(localSettings);

    function setSettings(settings: Settings) {
        settings.openAIKey = settings.openAIKey?.trim();
        settings.textToSpeechAPIKey = settings.textToSpeechAPIKey?.trim();
        set(settings);
        setItemToLocalStorage('settings', {
            ...settings,
            openAIKey: settings.rememberAIKey ? settings.openAIKey : undefined,
            textToSpeechAPIKey: settings.rememberAIKey ? settings.textToSpeechAPIKey : undefined,
            rememberAIKey: settings.rememberAIKey,
        });
    }

    function updateSettings(settings: Settings) {
        settings.openAIKey = settings.openAIKey?.trim();
        update((currentSettings) => {
            const newSettings = {...currentSettings, ...settings};
            setItemToLocalStorage('settings', {
                ...newSettings,
                openAIKey: settings.rememberAIKey ? newSettings.openAIKey : undefined,
                textToSpeechAPIKey: settings.rememberAIKey ? newSettings.textToSpeechAPIKey : undefined,
            });
            return newSettings;
        });
    }

    return {
        subscribe,
        set: setSettings,
        update: updateSettings,
    };
}

export const settings = createSettings();