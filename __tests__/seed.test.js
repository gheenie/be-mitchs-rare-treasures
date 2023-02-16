const { arrangeShopsData, prepareTreasuresData, arrangeTreasuresData } = require('../db/seed');
const { shopData, treasureData } = require('../db/data/test-data');

describe('arrangeShopsData', () => {
    it('arrangeShopsData should return array of arrays containing correct information', () => {
        expect(arrangeShopsData(shopData)).toEqual([
            [  'shop-b',  'firstname-b',  'slogan-b' ],
            [  'shop-d',  'firstname-c',  'slogan-d' ],
            [  'shop-e',  'firstname-d',  'slogan-e' ],
            [  'shop-f',  'firstname-e',  'slogan-f' ],
            [  'shop-g',  'firstname-f',  'slogan-g' ],
            [  'shop-h',  'firstname-a',  'slogan-h' ],
            [  'shop-i',  'firstname-g',  'slogan-i' ],
            [  'shop-a',  'firstname-h',  'slogan-a' ],
            [  'shop-j',  'firstname-i',  'slogan-j' ],
            [  'shop-k',  'firstname-j',  'slogan-k' ],
            [  'shop-c',  'firstname-c',  'slogan-c' ]
        ]);
    });
});

describe('prepareTreasuresData', () => {
    const shopsWithId = [
        { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b', shop_id: 3 },
        { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d', shop_id: 5 }
    ];

    it('prepareTreasuresData should return inserted shops and treasure data', () => {
        const twoTreasures = [
            {
                treasure_name: 'treasure-a',
                colour: 'turquoise',
                age: 200,
                cost_at_auction: '20.00',
                shop: 'shop-b'
            },
            {
                treasure_name: 'treasure-d',
                colour: 'azure',
                age: 100,
                cost_at_auction: '1001.00',
                shop: 'shop-d'
            }
        ];

        expect(prepareTreasuresData(twoTreasures, shopsWithId)).toEqual([
            {
                treasure_name: 'treasure-a',
                colour: 'turquoise',
                age: 200,
                cost_at_auction: '20.00',
                shop_id: 3
            },
            {
                treasure_name: 'treasure-d',
                colour: 'azure',
                age: 100,
                cost_at_auction: '1001.00',
                shop_id: 5
            }
        ]);
    });
});

describe('arrangeTreasuresData', () => {
    const treasuresWithShopId = [
        {
            treasure_name: 'treasure-a',
            colour: 'turquoise',
            age: 200,
            cost_at_auction: '20.00',
            shop_id: 4
          },
          {
            treasure_name: 'treasure-d',
            colour: 'azure',
            age: 100,
            cost_at_auction: '1001.00',
            shop_id: 5
          }
    ];

    it('arrangeTreasuresData should return array of arrays containing correct information', () => {
        expect(arrangeTreasuresData(treasuresWithShopId)).toEqual([
            [  'treasure-a',  'turquoise',  200, '20.00',  4],
            [  'treasure-d',  'azure',  100, '1001.00',  5]
        ]);
    });
});
