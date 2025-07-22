import Ambient from "@/components/ambient"
import Pomodoro from "@/components/pomodoro"

const page = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-5 p-4 md:p-10">
      <Pomodoro/>
      <Ambient/>
    </div>
  )
}
export default page
