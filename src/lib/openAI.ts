import { normalizeError } from './utils';

const API_URL = 'https://api.openai.com/v1/chat/completions';

type OpenAIConig = {
    apiKey: string;
}

export type MessageRole = 'system' | 'user' | 'function' | 'assistant';

export type Message = Array<{
    content: string;
    role: MessageRole;
}>;

export interface CreateCompletionResponseUsage {
    /**
     *
     * @type {number}
     * @memberof CreateCompletionResponseUsage
     */
    'prompt_tokens': number;
    /**
     *
     * @type {number}
     * @memberof CreateCompletionResponseUsage
     */
    'completion_tokens': number;
    /**
     *
     * @type {number}
     * @memberof CreateCompletionResponseUsage
     */
    'total_tokens': number;
}

export type CreateChatCompletionResponse = {
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponse
     */
    'id': string;
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponse
     */
    'object': string;
    /**
     *
     * @type {number}
     * @memberof CreateChatCompletionResponse
     */
    'created': number;
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponse
     */
    'model': string;
    /**
     *
     * @type {Array<CreateChatCompletionResponseChoicesInner>}
     * @memberof CreateChatCompletionResponse
     */
    'choices': Array<CreateChatCompletionResponseChoicesInner>;
    /**
     *
     * @type {CreateCompletionResponseUsage}
     * @memberof CreateChatCompletionResponse
     */
    'usage'?: CreateCompletionResponseUsage;
}

export interface ChatCompletionResponseMessage {
    /**
     * The role of the author of this message.
     * @type {string}
     * @memberof ChatCompletionResponseMessage
     */
    'role': MessageRole;
    /**
     * The contents of the message.
     * @type {string}
     * @memberof ChatCompletionResponseMessage
     */
    'content'?: string;
}

export type CreateChatCompletionResponseChoicesInner = {
    /**
     *
     * @type {number}
     * @memberof CreateChatCompletionResponseChoicesInner
     */
    'index'?: number;
    /**
     *
     * @type {ChatCompletionResponseMessage}
     * @memberof CreateChatCompletionResponseChoicesInner
     */
    'delta'?: ChatCompletionResponseMessage;
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponseChoicesInner
     */
    'finish_reason'?: string;
}

function createOpenAIStreamReader(reader: ReadableStreamDefaultReader<Uint8Array>) {
    const textDecoder = new TextDecoder('utf-8');
    return new ReadableStream<Array<string|undefined>>({
        start(controller) {
            async function push() {
                try {
                    const { done, value } = await reader.read();
                    if (done) {
                        controller.close();
                        return;
                    }
                    const message = textDecoder.decode(value);
                    const content = message.split('\n')
                        .map((line) => line.replace(/^data: /, '').trim())
                        .filter((line) => line.length > 0 || line === '[DONE]')
                        .map((line) => {
                            try {
                                return JSON.parse(line);
                            } catch(err) {
                                return undefined;
                            }
                        })
                        .map((message) => {
                            const { choices } = message ?? {};
                            if (!choices) return;
                            let aiMessage: ChatCompletionResponseMessage|undefined = undefined;
                            if ('message' in choices[0]) {
                                aiMessage = choices[0].message as ChatCompletionResponseMessage;
                            } else if ('delta' in choices[0]) {
                                aiMessage = choices[0].delta as ChatCompletionResponseMessage;
                            }
                            
                            if (!aiMessage) return;
                            const { content } = aiMessage ?? {};
                            if (!content) return;
                            return content
                        }).filter(Boolean);
                    controller.enqueue(content);
                    push();
                } catch(err) {
                    controller.error(err);
                }
            }
            push();
        }
    });
}

export class OpenAIApi {
    private _abortController: AbortController | null = null;
    constructor(private config: OpenAIConig) {}

    async createCompletion(
        args: {
            model?: string,
            messages: Message,
            streamCallback: (message: string, err?: string) => void,
        }
    ) {
        if (this._abortController) this._abortController.abort();
        this._abortController = new AbortController();
        const {
            model = 'gpt-3.5-turbo',
            messages,
            streamCallback
        } = args;
        const body = {
            messages,
            model,
            stream: true,
        };

        const reader = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.config.apiKey}`,
            },
            body: JSON.stringify(body),
            signal: this._abortController.signal
        }).then((res) => res.body?.getReader());

        if (!reader) throw new Error('No response body');
        const stream = createOpenAIStreamReader(reader);
        const streamReader = stream.getReader();

        try {
            // eslint-disable-next-line no-constant-condition
            while(true) {
                const { done, value } = await streamReader.read();
                if (done) break;
                value.forEach((message) => {
                    if (message) streamCallback(message);
                })
            }
        } catch(err) {
            if (this._abortController.signal.aborted) {
                streamCallback('', 'Aborted');
                return;
            }
            const e = normalizeError(err);
            streamCallback('', e.message);
            console.error(err);
        }
    }

    stop() {
        if (this._abortController) this._abortController.abort();
        this._abortController = null;
    }

}

