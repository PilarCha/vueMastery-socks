Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image">
      <img :src="image">
    </div>
    <div class="product-info">
      <div v-if='onSale' class="sale-bar">
        <h2>{{ checkSale }}</h2>
      </div>
      <h1>{{ title }}</h1>
      <p v-if='inStock'>In Stock</p>
      <p v-else >Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      <div v-for="(variant,index) in variants"
        :key= "variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)">
      </div>
      <button @click = "addToCart"
        :disabled="!inStock"
        :class="{disabledButton:!inStock}"
        >Add to Cart</button>
      <button @click="removeFromCart">Remove From Cart</button>
      <div class="cart">
        <p>Cart ({{ cart }})</p>

      </div>
      <!-- <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul> -->
      <!--<p> {{ description }} </p>
      <a :href="link" target="_blank">Wanna learn more about these nasty socks?</a> -->
    </div>

  </div>
  `,
  data() {
    return {
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
    }
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
    },
    shipping() {
      console.log(this.premium)
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  }
})

var app = new Vue ({
  el:'#app',
  data: {
    premium: false
  }
})
