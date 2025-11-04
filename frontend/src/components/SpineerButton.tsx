import { Button } from "../components/ui/button"
import { Spinner } from "../components/ui/spinner"

export function SpinnerButton(props:any) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" disabled size="sm">
        <Spinner />
       {props.text}
      </Button>
    </div>
  )
}

    //   <Button className="" variant="secondary" disabled size="sm">
    //     <Spinner />
    //     Processing
    //   </Button>
    //   <Button disabled size="sm">
    //     <Spinner />
    //         {props}
    //   </Button>