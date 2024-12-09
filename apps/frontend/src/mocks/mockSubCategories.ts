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
      price?: number;
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
          id: 1,
          title: 'Органический Бразильский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 2,
          title: 'Органический Колумбийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 3,
          title: 'Органический Эфиопский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 4,
          title: 'Органический Индонезийский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 5,
          title: 'Органический Кения AA Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 6,
          title: 'Органический Гватемальский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 7,
          title: 'Органический Перуанский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 8,
          title: 'Органический Вьетнамский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 9,
          title: 'Органический Ямайский Блю Маунтин Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 10,
          title: 'Органический Хайнсвиллский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 11,
          title: 'Органический Костариканский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 12,
          title: 'Органический Никарагуанский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 13,
          title: 'Органический Эквадорский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 14,
          title: 'Органический Панамский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 15,
          title: 'Органический Доминиканский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 16,
          title: 'Органический Бразильский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 17,
          title: 'Органический Колумбийский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 18,
          title: 'Органический Эфиопский Кофе',
          image: '',
          favorite: false,
        },
        {
          id: 19,
          title: 'Органический Индонезийский Кофе',
          image: '',
          favorite: true,
        },
        {
          id: 20,
          title: 'Органический Кения AA Кофе',
          image: '',
          favorite: false,
        },
      ],
    },
    {
      nameCategory: 'Экзотический кофе',
      description:
        'Экзотический зерновой кофе с уникальными вкусами и происхождением.',
      items: [
        {
          id: 1,
          title: 'Кофе Мараджипи',
          image: '',
          favorite: true,
        },
        {
          id: 2,
          title: 'Кофе Сантос',
          image: '',
          favorite: false,
        },
        {
          id: 3,
          title: 'Кофе Типика',
          image: '',
          favorite: true,
        },
        {
          id: 4,
          title: 'Кофе Катуаи',
          image: '',
          favorite: false,
        },
        {
          id: 5,
          title: 'Кофе Катуи',
          image: '',
          favorite: true,
        },
        {
          id: 6,
          title: 'Кофе Борбон',
          image: '',
          favorite: false,
        },
        {
          id: 7,
          title: 'Кофе Геиша',
          image: '',
          favorite: true,
        },
        {
          id: 8,
          title: 'Кофе Марагоджип',
          image: '',
          favorite: false,
        },
        {
          id: 9,
          title: 'Кофе Пипи',
          image: '',
          favorite: true,
        },
        {
          id: 10,
          title: 'Кофе Катуи',
          image: '',
          favorite: false,
        },
        {
          id: 11,
          title: 'Кофе Борбон',
          image: '',
          favorite: true,
        },
        {
          id: 12,
          title: 'Кофе Геиша',
          image: '',
          favorite: false,
        },
        {
          id: 13,
          title: 'Кофе Марагоджип',
          image: '',
          favorite: true,
        },
        {
          id: 14,
          title: 'Кофе Пипи',
          image: '',
          favorite: false,
        },
        {
          id: 15,
          title: 'Кофе Катуи',
          image: '',
          favorite: true,
        },
        {
          id: 16,
          title: 'Кофе Борбон',
          image: '',
          favorite: false,
        },
        {
          id: 17,
          title: 'Кофе Геиша',
          image: '',
          favorite: true,
        },
        {
          id: 18,
          title: 'Кофе Марагоджип',
          image: '',
          favorite: false,
        },
        {
          id: 19,
          title: 'Кофе Пипи',
          image: '',
          favorite: true,
        },
        {
          id: 20,
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
          id: 1,
          title: 'Арабика Бразильская',
          image: '',
          favorite: true,
          price: 500,
          discountPrice: 450,
        },
        {
          id: 2,
          title: 'Арабика Колумбийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 3,
          title: 'Арабика Эфиопская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 4,
          title: 'Арабика Гватемальская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 5,
          title: 'Арабика Кения',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 6,
          title: 'Арабика Перуанская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 7,
          title: 'Арабика Индонезийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 8,
          title: 'Арабика Вьетнамская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 9,
          title: 'Арабика Ямайская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 10,
          title: 'Арабика Коста-Риканская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 11,
          title: 'Арабика Никарагуанская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 12,
          title: 'Арабика Эквадорская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 13,
          title: 'Арабика Панамская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 14,
          title: 'Арабика Доминиканская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 15,
          title: 'Арабика Сальвадорская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 16,
          title: 'Арабика Хайнсвиллская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 17,
          title: 'Арабика Боливийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 18,
          title: 'Арабика Парагвайская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 19,
          title: 'Арабика Уругвайская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 20,
          title: 'Арабика Чилийская',
          image: '',
          favorite: false,
          price: 500,
        },
      ],
    },
    {
      nameCategory: '33 штуки в упаковке',
      description: '',
      items: [
        {
          id: 1,
          title: 'Робуста Бразильская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 2,
          title: 'Робуста Вьетнамская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 3,
          title: 'Робуста Индонезийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 4,
          title: 'Робуста Индийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 5,
          title: 'Робуста Угандийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 6,
          title: 'Робуста Малавийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 7,
          title: 'Робуста Танзанийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 8,
          title: 'Робуста Кенийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 9,
          title: 'Робуста Руандийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 10,
          title: 'Робуста Бурундийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 11,
          title: 'Робуста Камерунская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 12,
          title: 'Робуста Габонская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 13,
          title: 'Робуста Конгоанская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 14,
          title: 'Робуста Ангольская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 15,
          title: 'Робуста Мозамбикская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 16,
          title: 'Робуста Малавийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 17,
          title: 'Робуста Замбийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 18,
          title: 'Робуста Малавийская',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 19,
          title: 'Робуста Малавийская',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 20,
          title: 'Робуста Малавийская',
          image: '',
          favorite: false,
          price: 500,
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
          id: 1,
          title: 'История кофе: от семян до чашки',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 2,
          title: 'Искусство эспрессо: руководство для бариста',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 3,
          title: 'Кофейные туры по всему миру',
          image: '',
          favorite: true,
        },
        {
          id: 4,
          title: 'Кофейные рецепты: от классики до экспериментов',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 5,
          title: 'Кофейные легенды и мифы',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 6,
          title: 'Кофейные бренды: история успеха',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 7,
          title: 'Кофейные напитки: история и рецепты',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 8,
          title: 'Кофейные дегустации: как стать экспертом',
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 9,
          title: 'Кофейные растения: виды и уход',
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 10,
          title: 'Кофейные фестивали: история и традиции',
          image: '',
          favorite: false,
          price: 500,
        },
      ],
    },
    {
      nameCategory: 'Стикеры и патчи',
      description: '',
      items: [
        {
          id: 1,
          title: "Стикер 'Кофе или смерть'",
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 2,
          title: "Патч 'Кофеман'",
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 3,
          title: "Стикер 'Кофе – моя любовь'",
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 4,
          title: "Патч 'Кофе – моя жизнь'",
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 5,
          title: "Стикер 'Кофе – моя сила'",
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 6,
          title: "Патч 'Кофе – моя страсть'",
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 7,
          title: "Стикер 'Кофе – моя религия'",
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 8,
          title: "Патч 'Кофе – моя история'",
          image: '',
          favorite: false,
          price: 500,
        },
        {
          id: 9,
          title: "Стикер 'Кофе – моя муза'",
          image: '',
          favorite: true,
          price: 500,
        },
        {
          id: 10,
          title: "Патч 'Кофе – моя мечта'",
          image: '',
          favorite: false,
          price: 500,
        },
      ],
    },
  ],
};
