# Credit Card Form Javascript

![mobile](https://i.hizliresim.com/mf4c4x6.png)
![desktop](https://i.hizliresim.com/3ckq7yp.png)
## Usage

```
<div class="credit-cart-wrapper"></div>
    <script src="./appCreditCard.js"></script>

    <script>
        createCreditCardForm({
            element: '.credit-cart-wrapper',
            appName: 'e-ticaret app'
        })
        document.querySelector('.credit-cart-wrapper').addEventListener("payment", function (e) {
            console.log(e.detail)
        });
    </script>
```

![rotated](https://i.hizliresim.com/7i4osmu.png)

