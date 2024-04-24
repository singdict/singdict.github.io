const TOTAL_ALPHABETS = 26;

type TrieNode = {
    children: (TrieNode | null)[];
    isWord: boolean;
}

export class Trie {
    private root: TrieNode;
    constructor(words: string[]) {
        this.root = { children: new Array(TOTAL_ALPHABETS).fill(null), isWord: false };
        this.buildTrie(words);
    }

    private buildTrie(words: string[]) {
        for (const word of words) {
            this.insert(word);
        }
    }

    private insert(word: string) {
        let currentNode = this.root;
        for (const char of word) {
            const index = this.getIndex(char);
            if (index === -1) return;
            if (!currentNode.children[index]) {
                currentNode.children[index] = { children: new Array(TOTAL_ALPHABETS).fill(null), isWord: false };
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            currentNode = currentNode.children[index]!;
        }
        currentNode.isWord = true;
    }

    private getIndex(char: string): number {
        if (char >= 'a' && char <= 'z') {
            return char.charCodeAt(0) - 'a'.charCodeAt(0);
        } else if (char >= 'A' && char <= 'Z') {
            return char.charCodeAt(0) - 'A'.charCodeAt(0);
        }
        return -1;
    }

    private search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word) {
            const index = this.getIndex(char);
            if (!currentNode.children[index]) return false;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            currentNode = currentNode.children[index]!;
        }
        return currentNode.isWord;
    }

    private startsWith(prefix: string): boolean {
        let currentNode = this.root;
        for (const char of prefix) {
            const index = this.getIndex(char);
            if (!currentNode.children[index]) return false;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            currentNode = currentNode.children[index]!;
        }
        return true;
    }

    public searchWord(word: string): boolean {
        return this.search(word);
    }

    public searchPrefix(prefix: string): boolean {
        return this.startsWith(prefix);
    }

    public getSuggestions(prefix: string): string[] {
        let currentNode = this.root;
        for (const char of prefix) {
            const index = this.getIndex(char);
            if (!currentNode.children[index]) return [];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            currentNode = currentNode.children[index]!;
        }
        const words: string[] = [];
        this.getAllWords(currentNode, prefix, words);
        return words;
    }

    private getAllWords(currentNode: TrieNode | null, prefix: string, words: string[]) {
        if (!currentNode) return words;
        if (currentNode.isWord) words.push(prefix);
        for (let i = 0; i < TOTAL_ALPHABETS; i++) {
            if (currentNode.children[i]) {
                const newPrefix = prefix + String.fromCharCode(i + 'a'.charCodeAt(0));
                this.getAllWords(currentNode.children[i], newPrefix, words)
            }
        }
    }

    addWord(word: string) {
        this.insert(word);
    }

    clear() {
        this.root = { children: new Array(TOTAL_ALPHABETS).fill(null), isWord: false };
    }
}