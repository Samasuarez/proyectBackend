const fs = require("fs");
const Joi = require("joi");

class ProductManager {
  constructor(path) {
    this.path = path;
    // this.path = this.getProducts()
  }
  addProduct(product) {
    console.log(product);
    const schema = Joi.object({
      nombre: Joi.string().required(),
      descripcion: Joi.string().required(),
      price: Joi.number().min(0).required(),
      img: Joi.string().optional(),
      code: Joi.string().required(),
      category: Joi.string().required(),
      status: Joi.boolean().required(),
      stock: Joi.number().min(0).required(),
    });
    const { error } = schema.validate(product);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const files = fs.readFileSync(this.path);
    const products = JSON.parse(files);

    const id = products.length + 1;
    const newProduct = product;
    newProduct["id"] = id;
    products.push(newProduct);

    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      console.log(`producto ${id} agregado`);
    } catch (error) {
      console.error("error al escribir el archivo", error);
      throw new Error(`no se pudo agregar el producto ${id}`);
    }
  }

  /**
   * metodo que muestra todos los productos  que existen
   */
  getProducts(limit) {
    try {
      console.log('limit', limit);
      const products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      // this.path = this.getProducts()
      // console.log(products)
      if (limit) {
        console.log(products.slice(0, limit));
        return products.slice(0, limit);
      } else {
        return products;
      }
    } catch (error) {
      console.error(error);
      throw new Error(`error al cargar los productos`);
    }
  }

  /**
   * metodo que muestra un producto segun el id definido en la instancia
   */
  getProductById(id) {
    try {
      const producto = JSON.parse(fs.readFileSync(this.path, "utf8"));
      const productoId = producto.find((product) => product.id === id);
      console.log(productoId);
      return productoId;
    } catch (error) {
      console.error(error);
      throw new Error(`error al cargar el producto ${id} verifica que exista`);
    }
  }

  /**
   * metodo que actualiza un valor de un producto ej: precio,     descripcion, stock
   **/
  updateProduct(id, updates) {
    // console.log(updates)
    try {
      const files = fs.readFileSync(this.path, "utf-8");
      const productos = JSON.parse(files);
      const index = productos.findIndex((producto) => producto.id === id);

      if (index === -1) {
        throw new Error(`producto ${id} no encontrado`);
      }

      productos[index] = {
        ...productos[index],
        ...updates,
      };

      fs.writeFileSync(this.path, JSON.stringify(productos));
      console.log(`producto ${id} actualizado`);
    } catch (error) {
      console.error(error);
      throw new Error(
        `error al actualizar tu producto ${id}, verifica que tus valores a actualizar sean validos`
      );
    }
  }

  /**
   * metodo que elimina un prodcuto
   */
  deleteProduct(id) {
    try {
      const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      const index = productos.findIndex((producto) => producto.id === id);

      if (index !== -1) {
        productos.splice(index, 1);
        fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
        console.log(`producto ${id} eliminado`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`error al eliminar el producto ${id}`);
    }
  }

  /**
   * metodo que elimina todo el archivo de productos
   */
  deleteAllProducts() {
    try {
      fs.unlinkSync(this.path);
      console.log("todos los productos se han eliminado con exito");
    } catch (error) {
      console.error(error);
      throw new Error(`error al eliminar los productos`);
    }
  }
}

//instancia de la clase

const productManager = new ProductManager("../files/products.json");
module.exports = ProductManager;
