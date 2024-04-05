import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  let product;

  // Verifica si el productId es "new" y evita la consulta a la base de datos
  if (params.productId !== "new") {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      }
    });
  } else {
    // Opcional: Inicializa product con valores por defecto para el formulario de creación
    product = null; // o cualquier estructura que esperes en el formulario
  }

  // Resto de las consultas permanecen igual
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories} 
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
