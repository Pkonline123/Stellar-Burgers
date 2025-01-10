export const ingredientClass = '[class*=burgerIngredientItem]';
export const closeButtonClass = '[class*=closeButton]';
export const tabClass = '[class^=tab]';
export const burgerConstructorContainerClass = '[class*=burger-constructor-item_containerConstructor]';
export const burgerConstructorItemClass = '[class*=constructorItem]';

export const ingredient = {
    id: '1',
    _id: "1",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0
};

export const bun = {
    id: '2',
    _id: "2",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
};

export const order = {
    _id: '1',
    ingredients: ['1'],
    status: 'done',
    name: 'Order 1',
    createdAt: '',
    updatedAt: '',
    number: 1
}