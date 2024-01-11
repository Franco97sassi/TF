const { Product, Color, Stock, Category, Price, Snack } = require('../../db')

const createProduct = async (req, res) => {
  try {
    const { name, description, image, color, categories, price, images} = req.body;

    if (!name || !description || !image || !color) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const product = await Product.create({ name, description, image, images });

    for (const colorData of color) {
      const { id, stock } = colorData;
      const color = await Color.findByPk(id);

      if (color) {
        await Stock.create({ ProductId: product.id, ColorId: color.id, CodigoColor: color.codigo, quantity: stock, ColorName: color.name });
      } else {
        // Si el color no existe, puedes manejar el error o simplemente omitirlo
      }
    }

    for (const categoryId of categories) {
      const category = await Category.findByPk(categoryId.id);
      if (category) {
        await product.addCategory(category);
      } else {
        // Si la categoría no existe, puedes manejar el error o simplemente omitirla
      }
    }

    for (const priceData of price) {
      const { quantity, price, size } = priceData;
      await Price.create({ ProductId: product.id, quantity, price, size });
    }

    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto', error: error });
  }
};


const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, image, color, categories, price, images } = req.body;

    if (!name || !description || !image || !color) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Buscar el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar los campos del producto
    await product.update({ name, description, image, images });

    // Actualizar colores
await Stock.destroy({ where: { ProductId: product.id } }); // Eliminar todos los registros de Stock para el producto
for (const colorData of color) {
  const { id, stock } = colorData;
  const color = await Color.findByPk(id);

  if (color) {
    // Crear nuevos registros en Stock
    await Stock.create({
      ProductId: product.id,
      ColorId: color.id,
      CodigoColor: color.codigo,
      quantity: stock,
      ColorName: color.name,
    });
  } else {
    // Si el color no existe, puedes manejar el error o simplemente omitirlo
  }
}

    // Actualizar categorías
    await product.setCategories([]); // Eliminar todas las categorías existentes
    for (const categoryId of categories) {
      const category = await Category.findByPk(categoryId.id);
      if (category) {
        await product.addCategory(category);
      } else {
        // Si la categoría no existe, puedes manejar el error o simplemente omitirla
      }
    }

    // Actualizar precios
    await Price.destroy({ where: { ProductId: product.id } }); // Eliminar todos los precios existentes
    for (const priceData of price) {
      const { quantity, price, size } = priceData;
      await Price.create({ ProductId: product.id, quantity, price, size });
    }

    res.status(200).json({ message: 'Producto editado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al editar el producto', error: error });
  }
};





const createColor = async (req, res) => {
  try {
    const { name, codigo } = req.body;
    if (!name || !codigo) {
      return res.status(400).json({ message: 'Nombre y código del color son requeridos' });
    }
    const color = await Color.create({ name, codigo });
    res.status(201).json({ message: 'Color creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el color' });
  }
};



const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Nombre para categoria es requerido' });
    }
    const cat = await Category.create({ name });
    res.status(201).json({ message: 'Categoria creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoria' });
  }
};

const createSnack = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    if (!name || !price || !image || !description) {
      return res.status(400).json({ message: 'Completa todos los campos.' });
    }
    const cat = await Snack.create({ name, price, image, description });
    res.status(201).json({ message: '¡Snack creado correctamente!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear Snack' });
  }
};

const getSnacks = async (req, res) => {
  try {
    const snacks = await Snack.findAll();
    res.status(200).json({ snacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

const getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json({ colors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los colores' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Color, as: 'colors' },
        { model: Stock },
        { model: Category, as: 'categories' }, // Incluye el modelo Category como 'categories'
        { model: Price, as: "prices" }
      ]
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log(productId)
    console.log("XD")

    if (!productId) {
      return res.status(400).json({ message: 'Se requiere el ID del producto' });
    }

    // Buscar el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar el producto
    await product.destroy();

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

const deleteSnack = async (req, res) => {
  try {
    const productId = req.body.id;

    if (!productId) {
      return res.status(400).json({ message: 'Se requiere el ID del snack' });
    }

    // Buscar el producto por su ID
    const product = await Snack.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Snack no encontrado' });
    }

    // Eliminar el producto
    await product.destroy();

    res.status(200).json({ message: 'Snack eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const productId = req.body.id;

    if (!productId) {
      return res.status(400).json({ message: 'Se requiere el ID de la categoria' });
    }

    // Buscar el producto por su ID
    const product = await Category.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Categoria no encontrado' });
    }

    // Eliminar el producto
    await product.destroy();

    res.status(200).json({ message: 'Categoria eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar categoria', error });
  }
};

module.exports = {
  createProduct,
  createColor,
  createCategory,
  getAllCategories,
  getAllColors,
  getAllProducts,
  createSnack,
  getSnacks,
  deleteProduct,
  deleteSnack,
  deleteCategory,
  editProduct
};