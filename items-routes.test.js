process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let testItem = {name : 'turkey' , price : '5.00'};

beforeEach(function() {
    items.push(testItem);
});

afterEach(function() {
    items.length = 0;
})


describe('should get items list' , function () {
    test('Gets list of all items on list' , async function () {
        const resp = await request(app).get('/list/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([testItem])
    })
})

describe('should add item to list and get one single item requested' , function () {
    test('Add item to list' , async function () {
        const resp = await request(app).post('/list/add').send({
            name: 'fish',
            price : 5.99
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({'added' : '{fish : 5.99}'})
    })
    test('Get specific item from list' , async function () {
        const push = await request(app).post('/list/add').send({
            name: 'fish',
            price : 5.99
        });
        const resp = await request(app).get('/list/items/fish');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'name': 'fish' , 'price' : 5.99})
    })
})

describe('should update an item in the items list' , function () {
    test('Update item on list' , async function () {
        const resp = await request(app).patch('/list/items/turkey').send({
            name : 'turkey',
            price : 6.99
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({'name' : 'turkey' , 'price' : 6.99})
    })
})

describe('should delete item from list' , function () {
    test('Delete item from list' , async function () {
        const resp = await request(app).delete('/list/items/turkey');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: 'Deleted'})
    })
})
