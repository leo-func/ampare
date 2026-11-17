import { SOSView } from "@/view/SOSView";
import { useSOSViewModel } from "@/viewmodel/sos.viewmodel";

export default function Index() {
  const model = useSOSViewModel()

  return (
    <SOSView {...model}/>
  )
}
