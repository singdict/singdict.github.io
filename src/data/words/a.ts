import type { WordSchema } from '../../model/wordsSchema';

const GRE_LINK: NonNullable<WordSchema['links']>[number] = {
    link: "https://www.prepscholar.com/gre/blog/gre-vocabulary-list-words/",
    title: "The 357 Best GRE Vocabulary Words: Complete List"
}

export default [
    {
        word: "abate",
        forms: ["verb"],
        defs: [
            {
                def: "to diminish in intensity",
                examples: [
                    "The storm suddenly abated.",
                    "The pain in his leg abated after he took the medication."
                ]
            }
        ],
        otherForms: [
            {
                form: "adj",
                word: "abated"
            },
            {
                form: "noun",
                word: "abatement"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "aberrant",
        forms: ["adj"],
        defs: [
            {
                def: "diverging from the standard type",
                examples: [
                    "The child's aberrant behavior worried his parents.",
                    "The aberrant weather made it difficult to plan our trip."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "aberrance"
            },
            {
                form: 'adv',
                word: 'aberrantly'
            },
        ],
        links: [GRE_LINK]
    },
    {
        word: "abjure",
        forms: ["verb"],
        defs: [
            {
                def: "to reject or renounce",
                examples: [
                    "The spy abjured his allegiance to his country when he was caught.",
                    "The politician abjured his former beliefs."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "abjuration"
            },
        ],
        links: [GRE_LINK]
    },
    {
        word: "abscond",
        forms: ["verb"],
        defs: [
            {
                def: "to leave secretly, often to avoid prosecution or evade detection",
                examples: [
                    "The thief absconded with the money and was almost hidden for a year.",
                    "A CEO who absconded after embezzling millions of dollars was finally caught.",
                    'She <i title="Collocation: abscond from something" data-word-type="collocation">absconded from</i> boarding school and hitchhiked to the city'
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "absconder"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "abstain",
        forms: ["verb"],
        defs: [
            {
                def: "to voluntarily refrain from doing something",
                examples: [
                    'The doctor told the patient to <i title="Collocation: abstain from something" data-word-type="collocation">abstain from</i> eating fatty foods.',
                    'The politician <i title="Collocation: abstain from something" data-word-type="collocation">abstained from</i> voting on the bill.'
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "abstention"
            },
            {
                form: "adj",
                word: "abstinent"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "acumen",
        forms: ["noun"],
        defs: [
            {
                def: "keen judgement and perception",
                examples: [
                    "The lawyer's acumen helped him win many cases.",
                    "The CEO's **business/financial** acumen helped her company grow."
                ]
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "admonish",
        forms: ["verb"],
        defs: [
            {
                def: "to warn or scold someone",
                examples: [
                    "The teacher admonished the student **for** talk**ing** in class.",
                    "The mother admonished her child **not to** run into the street.",
                    "The judge admonished the defendant **to** tell the truth."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "admonishment"
            },
            {
                form: "adj",
                word: "admonitory"
            },
            {
                form: "noun",
                word: "admonition"
            },
            {
                form: "adv",
                word: "admonishingly"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "adulterate",
        forms: ["verb"],
        defs: [
            {
                def: "to make impure by adding lesser substances, or to contaminate",
                examples: [
                    "The company was fined for adulterating its products **with** cheap chemicals.",
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "adulteration"
            },
        ],
        links: [GRE_LINK]
    },
    {
        word: "advocate",
        forms: ["verb", "noun"],
        defs: [
            {
                def: "to support or recommend publicly",
                form: "verb",
                examples: [
                    "The new green deal advocates **for** a more sustainable future, but the opponents of this deal are given a hard time.",
                    "He advocates the use of solar power.",
                ]
            },
            {
                def: "one who advocates",
                form: "noun",
                examples: [
                    "The advocate of the new green deal is a young politician.",
                ]
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: 'aesthetic',
        forms: ['adj'],
        defs: [
            {
                def: 'concerned with beauty or the appreciation of beauty or art',
                examples: [
                    'The aesthetic beauty of the painting is quite remarkable.',
                    'The downfall of the empire was imminent since he was more concerned with aesthetic beauty than with the well-being of his people.'
                ],
            }
        ],
        otherForms: [
            {
                form: 'noun',
                word: 'aesthetics'
            },
            {
                form: 'adv',
                word: 'aesthetically'
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: 'affectation',
        forms: ['noun'],
        defs: [
            {
                def: 'unnatural or artificial behavior, usually intended to impress',
                examples: [
                    'The affectation of the politician was obvious to everyone, but still he was elected.',
                    'In the end, the affectation was the reason why he was caught.'
                ],
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: 'aggrandize',
        forms: ['verb'],
        defs: [
            {
                def: 'to increase in power, influence, and reputation',
                examples: [
                    'The king aggrandized his power by taking over the neighboring kingdoms.',
                    'The politician aggrandized his clutch on power by eliminating his opponents by harnessing the power of the media and fragility of the law.'
                ],
            }
        ],
        otherForms: [
            {
                form: 'noun',
                word: 'aggrandizement'
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: 'alacrity',
        forms: ['noun'],
        defs: [
            {
                def: 'cheerful willingness or eagerness',
                examples: [
                    'Everyone left town **with** alacrity to a higher ground when government issued a tsunami warning.',
                    'As soon as the recess bell rang, the students left the classroom **with** alacrity.'
                ],
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: 'alleviate',
        forms: ['verb'],
        defs: [
            {
                def: 'to make more bearable, or to relieve the problem',
                examples: [
                    'The arthritis that has been making it difficult for him to walk was alleviated by the new medication.',
                    'The parent\'s love and care alleviated the child\'s pain.'
                ],
            }
        ],
        otherForms: [
            {
                form: 'noun',
                word: 'alleviation'
            },
        ],
        links: [GRE_LINK]
    }
] as WordSchema[];