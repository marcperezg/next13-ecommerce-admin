import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  let size;

  // Verifica si el sizeId es "new" y evita la consulta a la base de datos
  if (params.sizeId !== "new") {
    size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });
  } else {
    // Opcional: Inicializa size con valores por defecto para el formulario de creación
    // Esto depende de cómo tu SizeForm maneja los casos de creación (por ejemplo, si esperas un objeto vacío o null)
    size = null; // o { /* valores por defecto */ } según lo necesites
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;
