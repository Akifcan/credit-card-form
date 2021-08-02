class AppCreditCart extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const template = document.createElement('template')

        template.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
               
                .credit-cart-wrapper > * {
                    --font-lato: 'Lato';
                    --font-orbitron: 'Orbitron';
                    --color-button: green;
                    --card-left-position: 5%;
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                    font-family: var(--font-lato);
                }

                .credit-cart-wrapper{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                }

                .cart{
                    height: 12em;
                    min-width: 100%;
                    position: relative;
                    perspective: 500px;
                }
                
                .cart .front, .cart .back{
                    box-shadow: 0 0 25px rgba(0, 0, 0, .5);
                    transition: 250ms linear;
                    backface-visibility: hidden;
                    position: absolute;
                    height: inherit;
                    width: 100%;
                    border-radius: 10px;
                }
                .cart .front{
                    background: #333;
                }
                .cart .back{
                    background: #555;
                    transform: rotateY(180deg);
                }
                .cart:hover .back, .cart:focus .back, .cart:active .back{
                    transform: rotateY(360deg);
                }
                .cart:hover .front, .cart:focus .front, .cart:active .front{
                    transform: rotateY(180deg);
                }

                .cart.cvvActive .front{
                    transform: rotateY(180deg);
                }
                .cart.cvvActive .back{
                    transform: rotateY(360deg);
                }

                form{
                    display: flex;
                    gap: 1rem;
                    flex-direction: column;
                    padding: 0rem 1rem !important;
                    width: 100%;
                }

                .form-group{
                    position: relative;
                    background: red;
                    width: inherit;
                    height: 2.5em;
                }

                .form-group label{
                    pointer-events: none;
                    user-select: none;
                    position: absolute;
                    font-size: 1rem;
                    top: calc(2.5em / 2 - 1rem / 2);
                    left: 15px;
                    transition: 250ms linear;
                }

                .form-group input{
                    width: 100%;
                    height: 100%;
                    text-indent: 7px;
                    box-shadow: 0 0 4px rgba(0, 0, 0, .5);
                }


                .form-group input:focus ~  label, .form-group input:not(:placeholder-shown) ~ label{
                    font-size: .7rem;
                    top: 3px;
                    left: 10px;
                }
                
                form .row{
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                form .row > * {
                    flex: 10em;
                }

                form button{
                    margin-left: 5px;
                    cursor: pointer;
                    width: 100%;
                    padding-block: .8rem;
                    background-color: var(--color-button);
                    color: white;
                    border: 1px solid transparent;
                    border-radius: .5rem;
                }

                .bank-name{
                    position: absolute;
                    right: var(--card-left-position);
                    top: 10%;
                    font-size: 2rem;
                    color: white;
                }

                .number{
                    color: white;
                    position: absolute;
                    top: 40%;
                    left: var(--card-left-position);
                    font-size: 1.5rem;
                    font-family: var(--font-orbitron) !important;
                    font-style: italic;
                }

                .thru{
                    position: absolute;
                    top: 55%;
                    left: var(--card-left-position);
                    color: white;
                }

                .owner{
                    position: absolute;
                    bottom: 10%;
                    left: var(--card-left-position);
                    color: white;
                    font-size: 1.2rem;
                }

                .debit-card{
                    position: absolute;
                    color: white;
                    left: var(--card-left-position);
                    top: 10%;
                }

                .logo{
                    position: absolute;
                    bottom: 5%;
                    right: calc(var(--card-left-position) + 10%);
                    height: 50px;
                    width: 50px;
                    background: rgba(255, 0, 0, .7);
                    border-radius: 50%;
                    box-shadow: 30px 0 0 -1px yellow;
                }

                .black-line{
                    position: absolute;
                    top: 10%;
                    width: 100%;
                    height: 3em;
                    background: black;
                }

                .white-line{
                    position: absolute;
                    top: 40%;
                    width: 100%;
                    height: 3em;
                    background: linear-gradient(to right , white, gray 70%);
                }

                .cvv{
                    position: absolute;
                    transform: translateY(-1em);
                    display: grid;
                    place-items: center;
                    font-weight: bold;
                    height: 3em;
                    right: 0%;
                    padding-inline: 2rem;
                    background: #dedede;
                    font-style: italic;
                }

                .app-name{
                    position: absolute;
                    bottom: 10%;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                }
                
                @media(min-width: 768px){
                    .cart{
                        min-width: 45%;
                    }
                }
                @media(min-width: 1000px){
                    form{
                        max-width: 40%;
                    }
                    .cart{
                        min-width: 20%;
                    }
                }
            </style>
            <div class="credit-cart-wrapper">
                <div class="cart">
                    <div class="front">
                        <div class="debit-card">Debit Card</div>
                        <div class="bank-name"></div>
                        <div class="chip"></div>
                        <div class="number" id="number">0204 0000 0000 0000</div>
                        <div class="thru">Thru: <b id="thru">05/20</b></div>
                        <div class="owner" id="owner">owner</div>
                        <div class="logo"></div>
                    </div>
                    <div class="back">
                        <div class="black-line"></div>
                        <div class="white-line">
                            <p class="cvv" id="cvv">123</p>
                        </div>
                        <div class="app-name">
                            Application Name
                        </div>
                    </div>
                </div>
                <form>
                    <div class="form-group">
                        <input 
                            class="write-card"
                            required 
                            data-card="number"
                            maxlength="11" 
                            minlength="11" 
                            data-pattern="0000-0000-0000-0000" 
                            placeholder="" type="text" />
                        <label>Kart Numarası</label>
                    </div>
                    <div class="form-group">
                        <input 
                            class="write-card"
                            data-card="owner"
                            required 
                            minlength="5" 
                            maxlength="50" 
                            placeholder="" 
                            type="text" />
                        <label>Kart Sahibi</label>
                    </div>
                    <div class="row">
                        <div 
                            class="form-group">
                            <input  
                                data-card="cvv"
                                class="rotate write-card"
                                data-type="cvv"
                                type="number"
                                data-pattern="000"
                                minlength="3"
                                maxlength="3"
                                required placeholder="" type="text" />
                            <label>CVV</label>
                        </div>
                        <div class="form-group">
                            <input 
                                class="write-card"
                                data-card="thru"
                                thru
                                data-pattern="00/00"
                                maxlength="4"
                                minlength="4"
                                required 
                                placeholder="" type="text" />
                            <label>Son Kullanım Tarihi</label>
                        </div>
                    </div>
                    <button type="submit">İşlemi Onayla</button>
                </form>
            </div>
        `
        this.shadowRoot.append(template.content)
    }

    connectedCallback() {
        const numberRegex = RegExp(/\d/)
        const card = this.shadowRoot.querySelector('.cart')
        this.shadowRoot.querySelector('.app-name').textContent = this.getAttribute('app-name')
        this.shadowRoot.querySelector('.bank-name').textContent = this.getAttribute('app-name')

        this.shadowRoot.querySelector('form').addEventListener('submit', e => this.getCreditCardInfo(e, this.getAttribute('parent')))

        this.shadowRoot.querySelectorAll('.rotate').forEach(input => {
            input.addEventListener('focus', _ => {
                card.classList.add('cvvActive')
            })
            input.addEventListener('blur', _ => {
                card.classList.remove('cvvActive')
            })
        })

        this.shadowRoot.querySelectorAll('.write-card').forEach(input => {
            input.addEventListener('keyup', _ => {
                this.writeOnCard(input.dataset.card, input.value)
            })
        })

        this.shadowRoot.querySelectorAll('input').forEach(input => {
            const pattern = input.dataset.pattern
            if (pattern) {
                input.addEventListener('keypress', e => {
                    e.preventDefault()
                    const patternArr = pattern.split('')
                    const inputLength = input.value.length
                    if (inputLength < patternArr.length) {
                        if (numberRegex.test(e.key)) {
                            input.value += e.key
                            if (patternArr[inputLength + 1] == '-' || patternArr[inputLength + 1] == '/') {
                                input.value += patternArr[inputLength + 1]
                            }
                        }
                    }
                    if (input.getAttribute('thru') != null) {
                        if (input.value.length == 3) {
                            if (parseInt(input.value.substring(0, 2)) >= 32) {
                                setTimeout(() => {
                                    input.value = ''
                                    this.shadowRoot.getElementById('thru').textContent = '00/00'
                                }, 500)
                            }
                        }
                    }

                })
            }
        })
    }

    getCreditCardInfo(e, wrapper) {
        e.preventDefault()
        const event = new CustomEvent("payment", {
            detail: {
                cardNumber: this.shadowRoot.getElementById('number').textContent,
                thru: this.shadowRoot.getElementById('thru').textContent,
                cvv: this.shadowRoot.getElementById('cvv').textContent,
                owner: this.shadowRoot.getElementById('owner').textContent
            }
        })
        document.querySelector(wrapper).dispatchEvent(event)
    }

    writeOnCard(id, value) {
        this.shadowRoot.getElementById(id).textContent = value
    }

}

window.customElements.define('credit-cart', AppCreditCart)

function createCreditCardForm({ element, appName = '' }) {
    console.assert(element != null, 'Please pass an element name')
    if (appName.length == 0) {
        console.warn('You can provide application name')
    }
    document.querySelector(element).innerHTML = `<credit-cart parent="${element}" app-name="${appName}"></credit-cart>`

}
