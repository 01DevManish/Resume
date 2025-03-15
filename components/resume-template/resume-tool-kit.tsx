import { useDownloadPdf } from "@/hook/use-download-pdf";
import {
  Download,
  ListRestart,
  LoaderCircle,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

const ResumeToolKit = ({
  toolTip,
}: {
  toolTip: ReactZoomPanPinchContentRef;
}) => {
  const { handleDownload, isLoading } = useDownloadPdf();

  return (
    <div className="flex mb-2 absolute top-5 left-[50%] -translate-x-[50%] backdrop-blur-lg rounded z-10 bg-black/90 border border-primary/20">
      <button
        className="hover:bg-primary-foreground py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.zoomIn(0.1)}
      >
        <ZoomInIcon className="w-4 h-4" />
      </button>
      <button
        className="hover:bg-primary-foreground py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.zoomOut(0.1)}
      >
        <ZoomOutIcon className="w-4 h-4" />
      </button>
      <button
        className="hover:bg-primary-foreground py-2.5 px-3.5 border-l border-primary/20"
        onClick={() => toolTip.resetTransform()}
      >
        <ListRestart className="w-4 h-4" />
      </button>
      <button
        className="hover:bg-primary-foreground py-2.5 px-3.5 border-l border-primary/20"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default ResumeToolKit;