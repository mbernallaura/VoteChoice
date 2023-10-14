// Descripción: El componente "SinVotaciones" muestra un mensaje cuando el usuario no tiene votaciones disponibles o 
// recientes.

// Funcionamiento:

// Muestra una imagen de ilustración con un icono de "sin votaciones".
// Muestra un título que indica "Sin votaciones".
// Muestra un mensaje que indica que el usuario no ha creado ninguna votación o no tiene votaciones recientes.

import Image from "next/image";
import React from "react";

const SinVotaciones = () => {
    return (
        <div className="flex flex-col items-center justify-center font-dmsans bg-white rounded-2xl my-14 mx-8 px-4 xl:px-0 md:m-24 h-full py-6 shadow">
            <div className="flex items-center ">
                <Image src="/Images/sinvotaciones/sinvotaciones-ImagePlaceholder.png" alt="noVotaciones" width={50} height={50} />
            </div>
            <div className="flex flex-col items-center mt-5 gap-5 text-center">
                <h2 className="text-2xl font-bold">No voting activity</h2>
                <p className="text-lg text-center max-w-md">{"You haven't created any voting activities yet or you don't have any recent votes."}</p>
            </div>
        </div>
    )
}

export default SinVotaciones