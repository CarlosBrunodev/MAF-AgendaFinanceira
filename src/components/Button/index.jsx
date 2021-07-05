const Button = ({children,type="button", disabe, size = "w-full" , color = "bg-gray-800", textSize = "text-lg	", hoverColor = "bg-gray-700" }) => (
  <div>
    <button
   
      disabled={disabe}
      className={`${size} py-3 ${color} rounded-sm ${textSize}
                  font-medium text-white uppercase focus:outline-none 
                  hover:${hoverColor} hover:shadow-none`}>
      {children}
    </button>
  </div>
);

export const ButtonIcon = ({children,disable, onClick, size = "w-full" , color = "bg-gray-800", textSize = "text-lg	", hoverColor = "bg-gray-700" }) => (
  <>
    <button
      onClick={onClick}
      disabled={disable}
      className={`${size} py-2.5 ${color} rounded-sm ${textSize}
                  font-medium flex items-center justify-center text-white uppercase focus:outline-none 
                  hover:${hoverColor} hover:shadow-none`}>
      {children}
    </button>
  </>
);

export default Button;


