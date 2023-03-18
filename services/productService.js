const faker = require('faker');
const { ne } = require('faker/lib/locales');

const boom = require('@hapi/boom');

class productoServicio {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        Image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create({ name, price }) {
    // creamos el objeto
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      Image: faker.image.imageUrl(),
    };
    //agg el objeto a el array del contructor
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }
  // async find() {
  //   return this.products;
  // }

  async findOne(id) {
    //! forzamos un error para ver el funcionamiento del middleware
    // const name = this.getTotal();

    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound();
    }
    if (product.isBlock) {
      throw boom.conflict('this product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound();
      // throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}
module.exports = productoServicio;
