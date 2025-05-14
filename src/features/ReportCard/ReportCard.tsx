import { JourneyTrack } from "features/JourneyTrack/JourneyTrack";
import { WidgetWrapper } from "features/WidgetWrapper/WidgetWrapper";
import { ReportReqRes } from "shared/config/store/types/reportSlice.types"


interface ReportCardProps {
    report: ReportReqRes;
}

export const ReportCard = ({
    report
}: ReportCardProps) => {
  return (
    <WidgetWrapper>
        <JourneyTrack vehicleForward={report.forwardVehicle} vehicleBack={report.backVehicle}/>
    </WidgetWrapper>
  )
}
