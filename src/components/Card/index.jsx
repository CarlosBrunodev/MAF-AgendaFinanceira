import Heading from "../Heading"

/*
const Card = ({title, description, img, color="blue"}) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <img src={img}/>
  </div>
)
*/
const Card = ({title, subtitle, description, color="bg-gradient-to-tr from-indigo-500 to-blue-400", size="w-full"}) => (
  <div className={`flex m-1 flex-col items-start ${size} ${color} p-3 rounded-md`}>
    <div className="my-2">
      <Heading color="text-white" weight="font-medium">{subtitle}</Heading>
    </div>
    <div className="my-2">
      <Heading color="text-white" size="text-4xl" weight="font-medium">{title}</Heading>
    </div>
    <div className="my-2">
      <Heading color="text-white" weight="font-medium">{description}</Heading>
      </div>
  </div>
)


export const CardChart = ({title,children, subtitle, description, color="bg-gradient-to-tr from-indigo-500 to-blue-400", size="w-full"}) => (
  <div className={`flex m-1 flex-col items-start ${size} ${color} p-3 rounded-md`}>
    <div className="my-2">
      <Heading color="text-white" weight="font-medium">{subtitle}</Heading>
    </div>
    <div className="my-2">
      <Heading color="text-white" size="text-4xl" weight="font-medium">{title}</Heading>
    </div>
    <div className="my-2">
      <Heading color="text-white" weight="font-medium">{description}</Heading>
    </div>
    
    {children}
  </div>
)
export default Card