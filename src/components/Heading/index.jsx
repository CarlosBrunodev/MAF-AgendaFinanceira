
const Heading = ({children, width, color="text-gray-800", size="text-xl", weight, spacing}) => (
  <>
     <p className={`antialiased ${width} ${color} ${size} ${weight} ${spacing}`}>{children}</p>
  </>
)

export const HeadingLine = ({ children, color="text-gray-800", size="text-xl", weight, spacing , lineColor="border-blue-500	"}) => (
  <div className={`border-l-4	px-3 py-1 ${lineColor}`}>
    <p className={`antialiased ${color} ${size} ${weight} ${spacing}`}>{children}</p>
  </div>
)

export default Heading
