import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {
  let color;

  // Verifica si el colorId es "new" y, en ese caso, evita realizar la consulta a la base de datos
  if (params.colorId !== "new") {
    color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
    });
  } else {
    // Opcional: Inicializa color con valores por defecto para el formulario de creación
    // Esto dependerá de cómo tu ColorForm maneje los casos de creación
    // (por ejemplo, si espera un objeto vacío, null, o valores predeterminados)
    color = null; // o { /* valores por defecto */ } según sea necesario para tu formulario
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

export default ColorPage;
