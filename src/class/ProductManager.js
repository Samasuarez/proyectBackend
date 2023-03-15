const fs = require('fs')

class ProductManager {
  file = __dirname + '/files/products.json'

  async loadItems() {
    if (fs.existSync(this.file)) {
      const data = await fs.promises.readFile(this.file, 'utf-8')
      const items = JSON.parse(data)
      return items
    }
    return 'El archivo no existe'
  }
}

module.exports = ProductManager