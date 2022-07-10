import express from "express";
import { Item } from "../data/types";
import { items } from "../data/items";
const itemRouter = express.Router();
export default itemRouter;

// (1)
itemRouter.get('/', (req, res) => {
    if (req.query.maxPrice) {
        let pricedItems: Item[] = []
        items.forEach(item => {
                if(item.price <= Number(req.query.maxPrice)){
                pricedItems.push(item);
            };
        });
        res.json(pricedItems)
    } else if (req.query.prefix) {
        let prefItems: Item[] = []
        items.forEach(item => {
                if (item.product.startsWith("Fancy")){
                    prefItems.push(item);
                };
            })
        res.json(prefItems)
    } else if (req.query.pageSize) {
        let pgItems: Item[] = []
            for(let i = 0 ; i <= (Number(req.query.pageSize)-1) ; i++){
                pgItems.push(items[i]);
            };
        res.json(pgItems);
    } else {
        res.json(items);
    }
});

// (2)
itemRouter.get('/:id', (req, res) => {
    const item = items.find(item => item.id === req.params.id); 
    item ? res.json(item) : res.json("ID not found");
});

// (3)
itemRouter.post('/', (req, res) => {
    let newId = items.length;
    const newItem: Item = { id: newId, ...req.body };
    items.push(newItem);
    res.json(newItem);
});

// (4)
itemRouter.put('/:id', (req, res) => {
    const item = items.find(item => item.id === req.params.id) as Item; 
    const itemIndex = items.findIndex(item => item.id === req.params.id);
    const updatedItem = { ...item, ... req.body };
    items.splice(itemIndex, 1, updatedItem);
    res.json(updatedItem);
});

// (5)
itemRouter.delete('/:id', (req, res) => {
    const itemIndex = items.findIndex(item => item.id === req.params.id);
    items.splice(itemIndex, 1);
});