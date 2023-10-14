// Descripción: Componente que representa la página de inicio de la aplicación. Muestra un encabezado, descripción y un botón
//  "Empezar" que redirige al inicio de sesión.

// Funcionamiento: Este componente muestra información de bienvenida, describiendo la plataforma de votación simplificada. 
// El botón "Empezar" redirige a la página de inicio de sesión. La imagen principal se encuentra a la derecha en pantallas 
// grandes y arriba en pantallas pequeñas. Ideal para la página de inicio de una aplicación.

import Link from "next/link";
import React from "react";
import ImagePrincipal from "./ImagePrincipal";

const Init = () => {
    return (
        <main className="flex justify-between items-center mx-2 md:mx-0 font-dmsans flex-col md:flex-row md:py-8 mb-4 sm:mb-0 md:h-100">
            <section className="my-10 h-auto w-full text-center md:w-1/2 md:text-left md:pr-4 md:pl-16">
                <h1 className="text-4xl font-bold leading-tight">Decisions made collectively</h1>
                <div className="my-8 sm:mt-8 sm:mb-10 pr-2 md:pr-4 xl:pr-10">
                    <p className="text-lg md:w-10/12">Our platform focuses on simplifying the voting process and bringing people together in decision-making.</p>
                </div>
                <div>
                    <Link href={'/login'}>
                        <button className="bg-primaryPurple text-white font-semibold rounded-3xl px-5 py-3">Join us →</button>
                    </Link>  
                </div>
            </section>
            <div className="md:w-1/2 h-full mt-8">
                <ImagePrincipal />
            </div>
        </main>
    )
}

export default Init;
