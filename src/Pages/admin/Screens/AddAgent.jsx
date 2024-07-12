import React, { useState } from 'react'
import SideBar from '../global/SideBar'
import Select from 'react-select';
import zoneOptions from '../../../components/Zone';

const AddAgent = ({user}) => {
    const [errors, setErrors] = useState({});
    const [selectedZones, setSelectedZones] = useState([]);


    const customStyles = {
        control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? '2px solid #3182ce' : '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        boxShadow: state.isFocused ? '0 0 0 3px rgba(49, 130, 206, 0.2)' : 'none',
        '&:hover': {
            border: '2px solid #3182ce',
        },
        }),
        multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#edf2f7',
        }),
        multiValueLabel: (provided) => ({
        ...provided,
        color: '#718096',
        }),
        multiValueRemove: (provided) => ({
        ...provided,
        color: '#718096',
        ':hover': {
            backgroundColor: '#cbd5e0',
            color: '#718096',
        },
        }),
    };


  const handleZoneChange = (selectedOptions) => {
    setSelectedZones(selectedOptions);
  };


  return (
    <div>
      <SideBar user={user} >
        
          <div className="flex justify-center items-center mb-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <form className="w-full max-w-4xl p-4" onSubmit={(e) => e.preventDefault()}>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Prenom
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                    id="firstName"
                    type="text"
                    placeholder="Prenom"
                    
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Nom
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                    id="lastName"
                    type="text"
                    placeholder="Nom"
                    
                  />
                </div>
              </div>

              <div className="flex mb-4 items-center space-x-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Genre:</span>
                <label className="inline-flex items-center">
                  <input
                    className={`form-radio h-5 w-5 text-blue-600 ${errors.gender ? 'border-red-500' : ''}`}
                    type="radio"
                    name="gender"
                    value="masculin"
                    
                    
                  />
                  <span className="ml-2">Masculin</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    className={`form-radio h-5 w-5 text-blue-600 ${errors.gender ? 'border-red-500' : ''}`}
                    type="radio"
                    name="gender"
                    value="feminin"
                    
                  />
                  <span className="ml-2">Feminin</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                  id="email"
                  type="email"
                  placeholder="Email"
                  
                />
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Numero
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                    id="address"
                    type="text"
                    placeholder="Address"
                    
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identityNumber">
                  Numero de CNI
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.identityNumber ? 'border-red-500' : ''}`}
                  id="identityNumber"
                  type="text"
                  placeholder="Numero d'identite"
                  
                />
              </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zones">
                        Zone Géographique
                    </label>
                    <Select
                      isMulti
                      isSearchable
                      name="zones"
                      options={zoneOptions}
                      styles={customStyles}
                      className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.zones ? 'border-red-500' : ''}`}
                      onChange={handleZoneChange}
                      value={selectedZones}
                  />
                </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                  id="description"
                  placeholder="Description"
                  rows="4"
                  
                />
              </div>

              <div className="flex max-w-4xl">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                  
                >
                  Ajouter Agent
                </button>
              </div>

            </form>
          </div>
       
      </SideBar>
    </div>
  )
}

export default AddAgent