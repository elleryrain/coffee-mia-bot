export const productsList: Record<
  string,
  {
    nameCategory: string;
    description: string;
    items: {
      id: number;
      title: string;
      image: string;
      favorite: boolean;
      cost?: number;
      discountPrice?: number;
    }[];
  }[]
> = {
  grainSubCategories: [
    {
      nameCategory: 'Свежеобжаренный кофе',
      description:
        'Свежеобжаренный зерновой кофе с разнообразными вкусами и ароматами.',
      items: [
        {
          id: 1,
          title: 'Бразильский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 2,
          title: 'Колумбийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 3,
          title: 'Эфиопский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 4,
          title: 'Индонезийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 5,
          title: 'Кения AA Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 6,
          title: 'Гватемальский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 7,
          title: 'Перуанский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 8,
          title: 'Вьетнамский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 9,
          title: 'Ямайский Блю Маунтин Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 10,
          title: 'Хайнсвиллский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 11,
          title: 'Костариканский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 12,
          title: 'Никарагуанский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 13,
          title: 'Эквадорский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 14,
          title: 'Панамский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 15,
          title: 'Доминиканский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 16,
          title: 'Бразильский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 17,
          title: 'Колумбийский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 18,
          title: 'Эфиопский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 19,
          title: 'Индонезийский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 20,
          title: 'Кения AA Кофе',
          image: '',
          favorite: false,
        },
      ],
    },
    {
      nameCategory: 'Органический кофе',
      description:
        'Органический зерновой кофе, выращенный без использования химических удобрений и пестицидов.',
      items: [
        {
          id: 21,
          title: 'Органический Бразильский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 22,
          title: 'Органический Колумбийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 23,
          title: 'Органический Эфиопский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 24,
          title: 'Органический Индонезийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 25,
          title: 'Органический Кения AA Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 26,
          title: 'Органический Гватемальский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 27,
          title: 'Органический Перуанский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 28,
          title: 'Органический Вьетнамский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 29,
          title: 'Органический Ямайский Блю Маунтин Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 30,
          title: 'Органический Ямайский Блю Маунтин Кофе',
          image: '',
          favorite: true,
        },
      ],
    },
    {
      nameCategory: 'Экзотический кофе',
      description:
        'Экзотический зерновой кофе с уникальными вкусами и происхождением.',
      items: [
        {
          id: 31,
          title: 'Кофе Мараджипи',
          image: '',
          favorite: true,
        },
        {
          id: 32,
          title: 'Кофе Сантос',
          image: '',
          favorite: false,
        },
        {
          id: 33,
          title: 'Кофе Типика',
          image: '',
          favorite: true,
        },
        {
          id: 34,
          title: 'Кофе Катуаи',
          image: '',
          favorite: false,
        },
        {
          id: 35,
          title: 'Кофе Катуи',
          image: '',
          favorite: true,
        },
        {
          id: 36,
          title: 'Кофе Борбон',
          image: '',
          favorite: false,
        },
        {
          id: 37,
          title: 'Кофе Геиша',
          image: '',
          favorite: true,
        },
        {
          id: 38,
          title: 'Кофе Марагоджип',
          image: '',
          favorite: false,
        },
        {
          id: 39,
          title: 'Кофе Пипи',
          image: '',
          favorite: true,
        },
        {
          id: 40,
          title: 'Кофе Катуи',
          image: '',
          favorite: false,
        },
      ],
    },
  ],

  dripPacksSubCategories: [
    {
      nameCategory: '10 штук в упаковке',
      description: '',
      items: [
        {
          id: 41,
          title: 'Арабика Бразильская',
          image: '',
          favorite: true,
          cost: 500,
          discountPrice: 450,
        },
        {
          id: 42,
          title: 'Арабика Колумбийская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 43,
          title: 'Арабика Эфиопская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 44,
          title: 'Арабика Гватемальская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 45,
          title: 'Арабика Кения',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 46,
          title: 'Арабика Перуанская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 47,
          title: 'Арабика Индонезийская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 48,
          title: 'Арабика Вьетнамская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 49,
          title: 'Арабика Ямайская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 50,
          title: 'Арабика Коста-Риканская',
          image: '',
          favorite: false,
          cost: 500,
        },
      ],
    },
    {
      nameCategory: '33 штуки в упаковке',
      description: '',
      items: [
        {
          id: 51,
          title: 'Робуста Бразильская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 52,
          title: 'Робуста Вьетнамская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 53,
          title: 'Робуста Индонезийская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 54,
          title: 'Робуста Индийская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 55,
          title: 'Робуста Угандийская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 56,
          title: 'Робуста Малавийская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 57,
          title: 'Робуста Танзанийская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 58,
          title: 'Робуста Кенийская',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 59,
          title: 'Робуста Руандийская',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 60,
          title: 'Робуста Бурундийская',
          image: '',
          favorite: false,
          cost: 500,
        },
      ],
    },
  ],

  otherSubCategories: [
    {
      nameCategory: 'Книги',
      description: '',
      items: [
        {
          id: 61,
          title: 'История кофе: от семян до чашки',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 62,
          title: 'Искусство эспрессо: руководство для бариста',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 63,
          title: 'Кофейные туры по всему миру',
          image: '',
          favorite: true,
        },
        {
          id: 64,
          title: 'Кофейные рецепты: от классики до экспериментов',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 65,
          title: 'Кофейные легенды и мифы',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 66,
          title: 'Кофейные бренды: история успеха',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 67,
          title: 'Кофейные напитки: история и рецепты',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 68,
          title: 'Кофейные дегустации: как стать экспертом',
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 69,
          title: 'Кофейные растения: виды и уход',
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 70,
          title: 'Кофейные фестивали: история и традиции',
          image: '',
          favorite: false,
          cost: 500,
        },
      ],
    },
    {
      nameCategory: 'Стикеры и патчи',
      description: '',
      items: [
        {
          id: 71,
          title: "Стикер 'Кофе или смерть'",
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 72,
          title: "Патч 'Кофеман'",
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 73,
          title: "Стикер 'Кофе – моя любовь'",
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 74,
          title: "Патч 'Кофе – моя жизнь'",
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 75,
          title: "Стикер 'Кофе – моя сила'",
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 76,
          title: "Патч 'Кофе – моя страсть'",
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 77,
          title: "Стикер 'Кофе – моя религия'",
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 78,
          title: "Патч 'Кофе – моя история'",
          image: '',
          favorite: false,
          cost: 500,
        },
        {
          id: 79,
          title: "Стикер 'Кофе – моя муза'",
          image: '',
          favorite: true,
          cost: 500,
        },
        {
          id: 80,
          title: "Патч 'Кофе – моя мечта'",
          image: '',
          favorite: false,
          cost: 500,
        },
      ],
    },
  ],
};
