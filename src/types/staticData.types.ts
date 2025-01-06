export enum CategoryType {
  PROJECT_COST = "pengeluaran_proyek",
  PRIORITY = "prioritas",
  COMPLETION_STATUS = "status_penyelesaian",
  ITEM = "kategori_item",
  TOOL_STATUS = "status_alat",
}

export const CategoryTypeValues = Object.values(CategoryType)

export enum CategoryTypeColor {
  PROJECT_COST = "red",
  PRIORITY = "yellow",
  COMPLETION_STATUS = "green",
  ITEM = "blue",
  TOOL_STATUS = "blue",
}

export enum EmployeeRoleType {
  OWNER = "owner",
  ADMIN = "admin",
  MANDOR = "mandor",
  STAFF_PEMBELIAN = "staff_pembelian",
  PEGAWAI = "pegawai",
}

export enum RequestStatus {
  MENUNGGU = 'menunggu persetujuan',
  DISETUJUI = 'disetujui',
  DITOLAK = 'ditolak',
  PROSES = 'proses',
  PENGIRIMAN = 'pengiriman',
  DIBATALKAN = 'dibatalkan',
  SELESAI = 'selesai',
}

export const EmployeeRoleTypeValues = Object.values(EmployeeRoleType)

export enum WarehouseType {
  INVENTORY = "Inventory",
  PROJECT = "Project",
}

export const WarehouseTypeValues = Object.values(WarehouseType)


export enum RequestItemType {
  PEMINJAMAN = 'Peminjaman',
  PENGEMBALIAN = 'Pengembalian',
}
export const RequestItemTypeValues = Object.values(RequestItemType)

export enum RequestItem_ItemType {
  MATERIAL = 'Material',
  TOOL = 'Tool',
}
export const RequestItem_ItemTypeValues = Object.values(RequestItem_ItemType)

export enum RequestStatusType {
  MENUNGGU = 'menunggu persetujuan',
  DISETUJUI = 'disetujui',
  DITOLAK = 'ditolak',
  PROSES = 'proses',
  PENGIRIMAN = 'pengiriman',
  DIBATALKAN = 'dibatalkan',
  SELESAI = 'selesai',
}
export const RequestStatusTypeValues = Object.values(RequestStatusType)

export interface itemDetail {
  item: String
  item_name: String
  quantity: number
  item_type: String
}

export enum TransactionCategoryId {
  PUR = "PUR",
  TRF = "TRF",
  ADD = "ADD",
  USE = "USE",
  SND = "SND",
  REC = "REC"
}

export class TransactionCategory {
  private static descriptions: { [key in TransactionCategoryId]: string } = {
    [TransactionCategoryId.PUR]: "Pembelian",
    [TransactionCategoryId.TRF]: "Perpindahan",
    [TransactionCategoryId.ADD]: "Admin Entry",
    [TransactionCategoryId.USE]: "Penggunaan",
    [TransactionCategoryId.SND]: "Pengiriman",
    [TransactionCategoryId.REC]: "Penerimaan"
  };

  public static getDescription(id: TransactionCategoryId): string {
    return this.descriptions[id];
  }
}

export const TransactionCategoryTypeValues = ["Pembelian", "Perpindahan", "Admin Entry", "Penggunaan", "Pengiriman", "Penerimaan"]