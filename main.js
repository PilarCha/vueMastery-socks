var app = new Vue ({
  el:'#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    details: ["80% Cotton","20% Polyester","Machine-Washable"],
    link: 'https://www.google.com/',
    selectedVariant:0,
    inventory: -1,
    onSale: true,
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './images/green-socks.jpg',
        variantQty: 10
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './images/blue-socks.jpg',
        variantQty: 0
      }
    ],
    sizes: ["SM","MED","LRG","XL","XXXXXL"],
    cart:0
  },
  methods: {
    //increment cart by one when add to cart is clicked.
    addToCart() {
      this.cart += 1
    },
    //the mouseover on the div with the color updates the index. Useing the updated index to switch to a different variant
    updateProduct(index) {
      this.selectedVariant = index;
    },
    //decrement 1 if somehting in cart otherwise do nothing
    removeFromCart() {
      this.cart == 0 ? this.cart = 0 : this.cart -= 1
    }
  },
  //cached for more of a heavy load
  computed: {
    title() {
      return this.brand + ' ' +this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQty
    },
    checkSale() {
      if (this.onSale) return `${this.brand}  ${this.product} is on sale!`
    }
  }
})
