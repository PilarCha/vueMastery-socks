//START OF PRODUCT COMPONENT
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
      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for= "review in reviews">
          <p> {{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p> {{ review.review }}</p>
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>
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
      reviews: []
    }
  },
  methods: {
    //increment cart by one when add to cart is clicked.
    addToCart() {
      this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
    },
    //the mouseover on the div with the color updates the index. Useing the updated index to switch to a different variant
    updateProduct(index) {
      this.selectedVariant = index;
    },
    //decrement 1 if somehting in cart otherwise do nothing
    removeFromCart() {
      this.$emit('remove-item',this.variants[this.selectedVariant].variantId)
    },
    addReview(productReview) {
      this.reviews.push(productReview)
      console.log(this.reviews)
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
//END OF PRODUCT component

//START OF PRODUCT REVIEW FORM COMPONENT
Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review" required></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          <input type="submit" value="Submit">
        </p>

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.$emit('review-submitted',productReview)
      this.name = null
      this.review=null
      this.rating = null
    }
  }
})
//END OF PRODUCT REVIEW COMPONENT

//Start of main app component
var app = new Vue ({
  el:'#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for(var i = this.cart.length -1; i>=0 ;i--) {
        if(this.cart[i] == id) {
          this.cart.splice(i,1)
        }
      }
    }
  }
})
