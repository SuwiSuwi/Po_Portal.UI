import { useNavigate } from "react-router-dom";
import { BiGhost, BiHomeAlt, BiArrowBack } from "react-icons/bi";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="relative flex justify-center items-center mb-6">
          <h1 className="text-[180px] font-bold text-gray-300 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
            404
          </h1>

          <div className="relative bg-white p-6 rounded-3xl shadow-xl border-2 border-text-muted/10 animate-bounce">
            <BiGhost className="w-20 h-20 text-primary" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-text-main mb-4 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-text-muted text-lg mb-8 leading-relaxed">
          ขออภัยครับ ไม่พบหน้าที่คุณต้องการ <br />
          หน้านี้อาจถูกย้าย ลบ หรือคุณอาจพิมพ์ URL ผิด
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-text-muted/30 text-text-main hover:bg-white hover:shadow-md transition-all w-full sm:w-auto justify-center font-medium"
          >
            <BiArrowBack />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 transition-all w-full sm:w-auto justify-center font-medium"
          >
            <BiHomeAlt />
            Back to Home
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 text-text-muted/50 text-sm">
        Error Code: 404
      </div>
    </div>
  );
};

export default NotFound;
