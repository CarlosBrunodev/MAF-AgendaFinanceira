
const TextSession = ({ children , color }) => (
  <>
    <div className={`flex w-full flex-wrap md:flex-nowrap  items-center justify-center p-4 md:p-14 ${color}`}>
      <div className="text-2xl p-4 w-full md:mr-20 md:w-2/5 text-justify">
        <h1>
          {children} 
        </h1>
      </div>
      <img className="w-full m-3 md:w-96 rounded-2xl" src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" />
    </div>
  </>
)

export const TextSessionInvert = ({ children , color }) => (
  <>
   <div className={`flex flex-col-reverse md:flex-row w-full flex-wrap md:flex-nowrap justify-center  items-center p-4 md:p-14 ${color}`}>
      <img className="w-full  m-3 md:w-96 md:mr-20 rounded-2xl" src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" />

      <div className="text-2xl p-4 w-full md:w-2/5 text-justify">
        <h1>
          {children} 
        </h1>
      </div>
    </div>
    {/* <div className={`flex items-center grid-cols-2 p-14 ${color}`}>
      <div className="ml-60 font-sans flex max-w-lg space-y-0.5">
        <img className="rounded-2xl max-w-2xl" src="/lgpd.jpeg" />
      </div>
      <div className="max-w-lg m-32 font-sans text-2xl ml-56 text-justify ">
        <h1>
          {children} 
        </h1>
      </div>
    </div> */}
  </>
)

export default TextSession