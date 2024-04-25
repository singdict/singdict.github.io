export type WordSchema = {
    word: string;
    forms: ('verb' | 'adj' | 'noun' | 'adv')[];
    defs?: Array<{
        def: string;
        form?: WordSchema['forms'][number];
        examples?: Array<string>;
    }>;
    otherForms?: Array<{
        form: WordSchema['forms'][number];
        word: string;
    }>;
    links?: Array<{
        link: string;
        title: string;
    }>;
    etymology?: string;
};

export type WordHistory = {
    word: string,
    stats: {
        attempts: number,
        correct: number,
    }
    lastAttempt: number,
}
