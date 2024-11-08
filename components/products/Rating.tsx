import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs"

export const Rating = ({
    value,
    caption,
  }: {
    value: number
    caption: string
  }) => {
    const Full = () => (
      <BsStarFill className="text-yellow-500 w-5 h-auto fill-current" />
    )
    const Half = () => (
      <BsStarFill className="text-yellow-500 w-5 h-auto fill-current" />
    )
    const Empty = () => (
      <BsStar className="text-yellow-500 w-5 h-auto fill-current" />
    )
  
    return (
      <div className="flex gap-2">
        <div className="flex gap-1">
          {value >= 1 ? <Full /> : value >= 0.5 ? <Half /> : <Empty />}
          {value >= 2 ? <Full /> : value >= 1.5 ? <Half /> : <Empty />}
          {value >= 3 ? <Full /> : value >= 2.5 ? <Half /> : <Empty />}
          {value >= 4 ? <Full /> : value >= 3.5 ? <Half /> : <Empty />}
          {value >= 5 ? <Full /> : value >= 4.5 ? <Half /> : <Empty />}
        </div>
  
        {caption && <span className="text-sm">{caption}</span>}
      </div>
    )
  }