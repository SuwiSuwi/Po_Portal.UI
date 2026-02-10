// src/types/common.d.ts
declare global {
  export interface Auth {
    token: string | null; // Token ที่ใช้ในการยืนยันตัวตน
    isAuthenticated: boolean; // สถานะการล็อกอิน
    expiryDate: number | null;
    user: {
      userid: number;
      username: string;
      group: string;
      groupid: number;
      email: string;
      company: string;
    } | null; // ข้อมูลผู้ใช้ (ถ้ามี)
    menuactive?: number;
  }

  // ประกาศ Decimal เป็น Big
  export type Decimal = Big;

  export type FormatType =
    | "number"
    | "textonum"
    | "datetime"
    | "date"
    | "shotdate";

  export interface FormatProps {
    data: any; // ข้อมูลที่ต้องการแปลง
    format: FormatType; // รูปแบบที่ต้องการแปลง
    digit?: number; // จำนวนตำแหน่งทศนิยม (กรณีที่เป็นตัวเลข)
  }
}

// ทำให้ไฟล์นี้เป็น global module
export {};
