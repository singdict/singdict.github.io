import { browser } from '$app/environment';
import { getItemLocalStorageFromLocalStorage, setItemToLocalStorage } from './utils';

const API_URL = 'https://api.voicerss.org/?';

export type TextToSpeechMessage = {
    text: string;
    audioEncoding?: 'MP3' | 'WAV' | 'AAC' | 'OGG' | 'CAF';
    languageCode?: string;
}

export type TextToSpeechConfig = {
    apiKey: string;
}

export type TextToSpeechResponse = {
    audioContent: string; // base64 encoded
}

type TextToSpeechCachedResponse = {
    audioContent: string;
    timestamp: number;
}

function isResponseInCache(message: TextToSpeechMessage): TextToSpeechResponseWrapper | null {
    try {
        const audioText = getItemLocalStorageFromLocalStorage<TextToSpeechCachedResponse>(`tts:${message.text}`);
        if (!audioText) return null;
        return new TextToSpeechResponseWrapper(audioText);
    } catch (e) {
        return null;
    }
}

function putInCache(message: TextToSpeechMessage, response: TextToSpeechResponseWrapper) {
    if (!response.audioContent) return;
    setItemToLocalStorage<TextToSpeechCachedResponse>(`tts:${message.text}`, {
        audioContent: response.audioContent,
        timestamp: Date.now(),
    });
}

export function cleanTextToSpeechCache(expiredAfter = 1000 * 60 * 60 * 24 * 7) {
    if (!browser) return;
    const now = Date.now();
    Object.keys(localStorage).forEach((key) => {
        if (!key.startsWith('tts:')) return;
        const cachedResponse = getItemLocalStorageFromLocalStorage<TextToSpeechCachedResponse>(key);
        if (!cachedResponse) return;
        if (now - cachedResponse.timestamp >= expiredAfter) localStorage.removeItem(key);
    });
}

export class TextToSpeechResponseWrapper {
    private _audio: HTMLAudioElement | null = null;
    constructor(private fromAPI?: TextToSpeechResponse, private nativeSynthesis?: SpeechSynthesisUtterance) {
        if (!('speechSynthesis' in window)) this.nativeSynthesis = undefined;
        if (this.fromAPI) {
            this.nativeSynthesis = undefined;
            this._audio = new Audio(this.fromAPI.audioContent);
            this._audio.onended = () => {
                if (!this._audio) return;
                this._audio.currentTime = 0;
            };
        }
        if (this.nativeSynthesis) {
            this.nativeSynthesis.onerror = () => {
                this.nativeSynthesis = undefined;
                throw new Error('Failed to play native synthesis');
            }
        }
    }

    get audioContent(): string|undefined {
        if (this.fromAPI) return this.fromAPI.audioContent;
        if (this.nativeSynthesis) return;
    }

    play() {
        if (this._audio) this._audio.play();
        if (this.nativeSynthesis) window.speechSynthesis.speak(this.nativeSynthesis);
    }

    stop() {
        if (this._audio) {
            this._audio.pause();
            this._audio.currentTime = 0;
        }
        if (this.nativeSynthesis) window.speechSynthesis.cancel();
    }

    isValid() {
        return !!this.fromAPI || !!this.nativeSynthesis;
    }
}

export class TextToSpeech {
    private _abortController: AbortController | null = null;

    constructor(private config?: TextToSpeechConfig) {}

    private useNativeTTS(message: TextToSpeechMessage): Promise<TextToSpeechResponseWrapper> {
        if (!('SpeechSynthesisUtterance' in window)) return Promise.resolve(new TextToSpeechResponseWrapper());

        const utterance = new SpeechSynthesisUtterance(message.text);

        return new Promise((resolve) => {
            utterance.lang = message.languageCode ?? 'en-US';
            utterance.rate = 0.5;
            utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === utterance.lang) ?? null;
            resolve(new TextToSpeechResponseWrapper(undefined, utterance));
        });
    }

    async synthesizeSpeech(message: TextToSpeechMessage): Promise<TextToSpeechResponseWrapper> {
        const cachedResponse = isResponseInCache(message);
        if (cachedResponse) return cachedResponse;
        
        const config = this.config;
        if (!config) return this.useNativeTTS(message);

        if (this._abortController) this._abortController.abort();
        this._abortController = new AbortController();

        const languageCode = message.languageCode ?? 'en-US';
        const query = new URLSearchParams({
            key: config.apiKey,
            src: message.text,
            hl: languageCode,
            c: message.audioEncoding ?? 'MP3',
            f: '44khz_16bit_stereo',
            r: '-2',
            b64: 'true',
        });
        const response = await fetch(API_URL + query, {
            method: 'POST',
            signal: this._abortController.signal,
        });

        if (!response.ok) {
            throw new Error(`Failed to synthesize speech: ${response.statusText}`);
        }

        const resp = new TextToSpeechResponseWrapper({
            audioContent: await response.text(),
        })
        putInCache(message, resp);
        return resp;
    }

    stop() {
        if (this._abortController) {
            this._abortController.abort();
            this._abortController = null;
        }
    }
}

