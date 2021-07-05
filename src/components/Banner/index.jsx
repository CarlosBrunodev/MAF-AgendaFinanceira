
const Banner = ({children, img}) => (
  /*<div className="h-96 p-64	flex justify-center items-center bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${img})`}}>*/
  <div className="h-full p-80 flex justify-center items-center bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${img})`}}>
    {children}
  </div>
)

export default Banner