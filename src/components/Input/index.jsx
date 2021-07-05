import {Controller} from "react-hook-form";
import {useState} from "react"

const Input = (props) => {

  const [upload, setUpload] = useState()

  console.log(upload)
  const {error, children, label, placeholder,weight, name, type, refs, defaultValues} = props;
  switch (type) {
    case 'checkbox':
      return (
        <div className="my-2 mt-5 flex items-center">
            <input defaultValue={defaultValues} ref={refs} id={label} type={type} name={name} placeholder={placeholder}
                className={`block my-1
                ${error || "border-gray-200"}
                focus:outline-none`}/>
         
            {children}

        </div>
      )

    case 'time':
      return (
        <div className="my-3">
        <label htmlFor={label} className={`block text-xs ${weight} text-gray-600 uppercase`}>{label}</label>
        <input defaultValue={defaultValues} ref={refs} id={label} type={type} name={name} placeholder={placeholder}
            className={`block w-full py-3 px-2 my-1
            text-sm
            appearance-none 
            rounded	
            border-2 
            ${error || "border-gray-200"}
            focus:outline-none`}/>
        {children}
    </div>
      )


      case 'file':
      return (
        <div className="my-3">
        <label htmlFor={label} className={`block text-xs ${weight} text-gray-600 uppercase`}>{label}</label>
    
          <label
                        title="Adicionar nova imagem"
                        className="flex flex-col justify-center items-center text-5xl text-gray-700 bg-gray-300 cursor-pointer w-full rounded-md h-24"
                      ><svg
                            class="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                          </svg>
                          <span class="mt-2 text-base leading-normal">Selecione o documento</span>
                          <input onChange={(e) => setUpload(e.target.files[0].name)} type="file"  defaultValue={defaultValues} ref={refs} id={label} type={type} name={name} placeholder={placeholder} class="hidden" />
            
                      </label>

        {upload && (
          <p className="font-medium border-yellow-500  my-3 p-1 px-2 border-l-4 text-sm">Arquivo selecionado : {upload}</p>
        )}
       
        {children}
    </div>
      )
      
    default:
      return (
        <div className="my-3">
            <label htmlFor={label} className={`block text-xs ${weight} text-gray-600 uppercase`}>{label}</label>
            <input defaultValue={defaultValues} ref={refs} id={label} type={type} name={name} placeholder={placeholder}
                className={`block w-full py-3 px-2 my-1
                text-sm
                appearance-none 
                rounded	
                border-2 
                ${error || "border-gray-200"}
                focus:outline-none`}/>
            {children}
        </div>
      )
  }
 
}

export const InputMask = (props) => {
  const {
    error,mask,as,control,children, weight, label, placeholder, name, rules, defaultValues
  } = props
  return (
    <div className="my-3">
        <label htmlFor={label} className={`block text-xs ${weight} text-gray-600 uppercase`}>{label}</label>

        <Controller
            defaultValue={defaultValues} id={label} name={name} placeholder={placeholder}
            control={control}
            as={as}
            rules={rules}
            className={`block w-full py-3 px-2 my-1
            text-sm
            appearance-none 
            rounded	
            border-2 
            ${error || "border-gray-200"}
            focus:outline-none`}
            mask={mask}
        />

        {children}
    </div>
  )
}

export const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div>
      <input type="text" className="input" value={amount} onChange={onChangeAmount} />
    </div>
  )
}

export const Select = ({error, onChange, refs, children, label, placeholder, name, defaultValues}) => {
  return (
    <div className="my-3">
        <label htmlFor={label} className="block text-xs font-semibold text-gray-600 uppercase">{label}</label>
        <select onChange={onChange} defaultValue={defaultValues} ref={refs} id={label} name={name} placeholder={placeholder}
                className={`block w-full py-3 px-2 my-1
                text-sm
                appearance-none 
                rounded	
                border-2 
                ${error || "border-gray-200"}
                focus:outline-none`}>

            {children}
        </select>

       
    </div>
  )
}
export default Input