// Descripción: El componente "ProfileInfo" se encarga de mostrar y gestionar la información del perfil del usuario. Permite 
// al usuario editar su nombre, contraseña y eliminar su cuenta. También muestra la primera letra del nombre del usuario.

// Funcionamiento: El componente obtiene la información del usuario a través de la sesión activa.
// Permite al usuario editar su nombre y contraseña utilizando campos de entrada de texto. La edición se habilita al hacer 
// clic en el botón switch.

"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useSession } from "next-auth/react";
import ModalGeneral from '@/containers/ModalGeneral';
import ModalEliminarCuenta from './ModalEliminarCuenta';
import ModalSuccessChanges from './ModalSuccessChanges';
import Loader from './Loader';
import Handler from './Handler';
import { APIGetMe, APIUpdateMe } from '@/lib/APICalls';


const ProfileInfo = () => {

    const { data: session } = useSession();

    const [edit, setEdit] = React.useState(false)
    const [successfulSave, setSuccessfulSave] = React.useState(false)
    const [eliminarCuenta, setEliminarCuenta] = React.useState(false)
    const [loaderActive, setLoaderActive] = React.useState(false)
    const [error, setError] = React.useState('')
    const email = session.user?.email;
    const availableEdit = {
        true: "h-10 p-2 rounded-lg my-2 border border-blue-500 bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-500",
        false: "h-10 p-2 rounded-lg my-2 border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
    }

    const [formData, setFormData] = React.useState({
        name: '',
        password: '',
    })

    useEffect( () => {
        const dbDatos = async () =>{
            try {
                setLoaderActive( true )
                const dataMe = await APIGetMe( email );
                const dbName = Object.values( dataMe )[1].name;
                const dbPassword = Object.values( dataMe )[1].password;
                setFormData({
                    name: dbName,
                    password: dbPassword
                })
                setLoaderActive( false );
            } catch (error) {
                console.error(error);
            }
        }
        dbDatos();
    
    }, [email])
    

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoaderActive(true);
    
        // Check if name and password fields are not empty
        if (formData.name.trim() === '' || formData.password.trim() === '') {
            setLoaderActive(false);
            setError('Fields cannot be empty')
        }else if (formData.password.length < 8) {
            setLoaderActive(false);
            setError('Password must be at least 8 characters long.')
        }
        else{
            const update = await APIUpdateMe(email, formData);
            setLoaderActive(false);
            setSuccessfulSave(!successfulSave);
        }
        setLoaderActive(false);
    }

  return (
    <>
        <Loader active={loaderActive} />
        <div className='flex justify-center w-full p-0 test:w-1/2 md:px-4 font-dmsans'>
            <div className="flex w-full justify-between mx-8">
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                    <h1 className="font-bold text-3xl my-3">Profile</h1>
                    <div className='flex justify-between items-center'>
                        <h2 className="text-gray-800 font-bold text-xl my-2">Edit Profile</h2>
                          <div className="right-24 top-24 xl:right-36 cursor-pointer">
                              <Handler state={edit} setState={setEdit} />
                          </div>
                    </div>
                      <label htmlFor="name" className="text-sm">FULL NAME</label>
                      <input 
                        type="text" 
                        className={availableEdit[`${edit}`]} 
                        readOnly={!edit}
                        name = "name"
                        value = {formData.name} 
                        onChange={handleChange} 
                    />
                    <hr className="flex-grow border-secondaryBlack mb-2" />
                    <label htmlFor="email" className="text-sm">EMAIL</label>
                    <input 
                        type="text" 
                        className={availableEdit['false']} 
                        readOnly
                        name = "email"
                        value= { email } 
                        onChange={handleChange} 
                    />
                    <hr className="flex-grow border-secondaryBlack mb-2" />
                    <label htmlFor="password" className="text-sm">PASSWORD</label>
                    <input 
                        type="password" 
                        className={availableEdit[`${edit}`]}
                        readOnly={!edit}
                        name = "password"
                        value = {formData.password} 
                        onChange={handleChange} 
                    />
                    <hr className="flex-grow border-secondaryBlack mb-2" />
                    <span className="text-red-500 text-center md:text-left text-sm mt-3">{error}</span>
                    <button 
                        type="button"
                        className="text-red-500 text-center text-sm md:text-left font-semibold mt-3"
                        onClick = {() => setEliminarCuenta(!eliminarCuenta)}
                    > 
                        DELETE ACCOUNT 
                    </button>
                    <div className='flex justify-center mt-6'>
                        <button
                            type="submit"
                            className="text-secondaryWhite text-lg font-semibold rounded-4xl bg-green-500 py-3 px-10"
                        >
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
            <ModalGeneral state={eliminarCuenta} changeState={setEliminarCuenta}>
                <ModalEliminarCuenta state={eliminarCuenta} changeState={setEliminarCuenta} />
            </ModalGeneral>
            <ModalGeneral state={successfulSave} changeState={setSuccessfulSave}>
                <ModalSuccessChanges />
            </ModalGeneral>
        </div>
    </>
  )
}

export default ProfileInfo