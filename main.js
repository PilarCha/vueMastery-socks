var app = new Vue ({
  el:'#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    details: ["80% Cotton","20% Polyester","Machine-Washable"],
    link: 'https://www.google.com/',
    image:'./images/green-socks.jpg',
    inStock: false,
    inventory: -1,
    onSale: true,
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './images/green-socks.jpg'
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './images/blue-socks.jpg'
      }
    ],
    sizes: ["SM","MED","LRG","XL","XXXXXL"],
    cart:0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(variantImage) {
      this.image = variantImage
    },
    removeFromCart() {
      this.cart == 0 ? this.cart = 0 : this.cart -= 1
    }
  },
  computed: {
    title() {
      return this.brand + ' ' +this.product
    }
  }
})
