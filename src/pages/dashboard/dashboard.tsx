import {
  BiFileFind,
  BiTimeFive,
  BiCheckShield,
  BiCheck,
  BiX,
  BiDotsHorizontalRounded,
  BiUserCircle,
  BiDollarCircle,
} from "react-icons/bi";

const POConfirmationDashboard = () => {
  return (
    <div className="px-6 py-2">
      <div className="space-y-4">
        {/* Header Section */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              PO Confirmation Center
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              จัดการและตรวจสอบใบสั่งซื้อที่รอการยืนยัน
            </p>
          </div>
          {/* <div className="relative">
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all relative">
              <BiBell size={22} className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
          </div> */}
        </header>

        {/* Top Summary: เน้นสิ่งที่ต้องทำทันที */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <POSummaryCard
            title="รอการยืนยัน"
            value="12"
            unit="รายการ"
            color="text-blue-600"
            bg="bg-blue-50"
            icon={<BiFileFind />}
          />
          <POSummaryCard
            title="เกินกำหนด (Overdue)"
            value="3"
            unit="รายการ"
            color="text-rose-600"
            bg="bg-rose-50"
            icon={<BiTimeFive />}
            isAlert
          />
          <POSummaryCard
            title="รอตรวจสอบยอด"
            value="28"
            unit="รายการ"
            color="text-amber-600"
            bg="bg-amber-50"
            icon={<BiDollarCircle />}
          />
          <POSummaryCard
            title="ยืนยันแล้ววันนี้"
            value="156"
            unit="รายการ"
            color="text-emerald-600"
            bg="bg-emerald-50"
            icon={<BiCheckShield />}
          />
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Side: PO List Table */}
          <section className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-800">
                Pending Confirmation List
              </h3>
              <div className="flex gap-2">
                <select className="text-sm font-semibold border border-slate-200 bg-slate-50 rounded-lg px-3 py-1.5 text-slate-600 focus:ring-2 focus:ring-blue-500/10 outline-none">
                  <option>All Vendors</option>
                  <option>Priority Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-50/50">
                    <th className="px-8 py-4 font-bold">PO Number</th>
                    <th className="px-8 py-4 font-bold">Vendor</th>
                    <th className="px-8 py-4 font-bold text-right">Amount</th>
                    <th className="px-8 py-4 font-bold">Delivery Date</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <PORow
                    no="PO-2026-0482"
                    vendor="Global Tech Solutions"
                    amount="45,000.00"
                    date="20 Mar 2026"
                    status="Waiting"
                    isUrgent
                  />
                  <PORow
                    no="PO-2026-0485"
                    vendor="Industrial Parts Co."
                    amount="12,240.00"
                    date="22 Mar 2026"
                    status="Reviewing"
                  />
                  <PORow
                    no="PO-2026-0489"
                    vendor="Prime Logistics"
                    amount="8,500.00"
                    date="25 Mar 2026"
                    status="Waiting"
                  />
                </tbody>
              </table>
            </div>
          </section>

          {/* Right Side: Alert & Notification Panel */}
          <aside className="space-y-6">
            <h3 className="text-xs font-black uppercase text-slate-500 px-1">
              Activity & Alerts
            </h3>
            <div className="space-y-4">
              <NotificationItem
                title="PO-2026-0410 ถูกยกเลิก"
                time="5 นาทีที่แล้ว"
                desc="Vendor แจ้งว่าสินค้าหมดสต็อก"
                type="error"
              />
              <NotificationItem
                title="มี PO ใหม่รออนุมัติ"
                time="12 นาทีที่แล้ว"
                desc="ฝ่ายผลิตเปิด PO วัสดุสิ้นเปลือง"
                type="info"
              />
              <NotificationItem
                title="Reminder: ยืนยันยอดรับ"
                time="1 ชม. ที่แล้ว"
                desc="มี 5 รายการที่ยังไม่ได้กดยืนยัน"
                type="warning"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// --- Atomic Components ---

interface POSummaryCardProps {
  title: string;
  value: string;
  unit: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
  isAlert?: boolean;
}

const POSummaryCard = ({
  title,
  value,
  unit,
  color,
  bg,
  icon,
  isAlert = false,
}: POSummaryCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-blue-200 transition-all hover:shadow-md">
    <div
      className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
    >
      {icon}
    </div>
    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
      {title}
    </p>
    <div className="flex items-baseline gap-2 mt-1">
      <h3
        className={`text-2xl font-extrabold ${isAlert ? "text-rose-600" : "text-slate-800"}`}
      >
        {value}
      </h3>
      <span className="text-slate-400 text-xs font-semibold">{unit}</span>
    </div>
  </div>
);

interface PORowProps {
  no: string;
  vendor: string;
  amount: string;
  date: string;
  status: string;
  isUrgent?: boolean;
}

const PORow = ({
  no,
  vendor,
  amount,
  date,
  status,
  isUrgent = false,
}: PORowProps) => (
  <tr className="hover:bg-slate-50/80 transition-colors group">
    <td className="px-8 py-5">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-900 text-sm">{no}</span>
        {isUrgent && (
          <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">
            Urgent
          </span>
        )}
      </div>
    </td>
    <td className="px-8 py-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
          <BiUserCircle size={20} />
        </div>
        <span className="text-slate-600 font-semibold text-sm">{vendor}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-right font-mono font-bold text-slate-800 text-sm">
      {amount}
    </td>
    <td className="px-8 py-5 text-slate-500 font-medium text-sm">{date}</td>
    <td className="px-8 py-5">
      <span
        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${status === "Waiting" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`}
      >
        {status}
      </span>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
          <BiCheck size={18} />
        </button>
        <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
          <BiX size={18} />
        </button>
        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-200 shadow-sm">
          <BiDotsHorizontalRounded size={18} />
        </button>
      </div>
    </td>
  </tr>
);

interface NotificationItemProps {
  title: string;
  time: string;
  desc: string;
  type: "error" | "warning" | "info";
}

const NotificationItem = ({
  title,
  time,
  desc,
  type,
}: NotificationItemProps) => {
  const colors = {
    error: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  return (
    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden group hover:border-slate-200 transition-all">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${colors[type]}`}
      ></div>
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
          {time}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default POConfirmationDashboard;
