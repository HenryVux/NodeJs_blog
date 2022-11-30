class CartController {
    show(req, res) {
        // res.send('cart shop');
        res.render('cart/list');
    }
}

module.exports = new CartController();
