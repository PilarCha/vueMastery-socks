var app = new Vue ({
  el:'#app',
  data: {
    product: 'Socks',
    details: ["80% Cotton","20% Polyester","Machine-Washable"],
    image: './images/socks.jpg',
    link: 'https://www.google.com/',
    inventory: 8,
    onSale: true,
    variants: [
      {
        variantId: 2234,
        variantColor: 'green'
      },
      {
        variantId: 2235,
        variantColor: 'blue'
      }
    ],
    sizes: ["SM","MED","LRG","XL","XXXXXL"],
  }
})
