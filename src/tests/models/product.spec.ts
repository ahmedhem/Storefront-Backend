import {Product, product} from '../../models/product'

describe('Product Model', () => {
    beforeAll(async () => {
        console.log("ENV is " + process.env["ENV"]);
        await new Product().create({
            name: "shoes",
            price: 10
        })
    })
    it('getone method is working ', async () => {
        expect(await new Product().getOne(1)).toEqual({
            product_id: 1,
            name: "shoes",
            price: 10
        })
    })
    it('Create method is working ', async () => {
        expect(await new Product().create({
            name: "skirt",
            price: 11
        })).toEqual({
            product_id: 2,
            name: "skirt",
            price: 11
        })
    })
    it('delete method is working ', async () => {
        let res: product = await new Product().create({
            name: "shoes",
            price: 10
        })
        expect(await new Product().delete(res.product_id)).toEqual(1)
    })
})
