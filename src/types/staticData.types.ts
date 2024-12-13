export enum CategoryType {
  PROJECT_COST = "pengeluaran_proyek",
  PRIORITY = "prioritas",
  COMPLETION_STATUS = "status_penyelesaian",
  ITEM = "item",
  REQUEST_STATUS = "status_permintaan",
}

export const CategoryTypeValues = Object.values(CategoryType)

export enum CategoryTypeColor {
  PROJECT_COST = "red",
  PRIORITY = "yellow",
  COMPLETION_STATUS = "green",
  ITEM = "blue",
  REQUEST_STATUS = "blue",
}

export enum EmployeeRoleType {
  OWNER = "owner",
  ADMIN = "admin",
  MANDOR = "mandor",
  STAFF_PEMBELIAN = "staff_pembelian",
  PEGAWAI = "pegawai",
}

export const EmployeeRoleTypeValues = Object.values(EmployeeRoleType)

export enum WarehouseType {
  INVENTORY = "Inventory",
  PROJECT = "Project",
}

export const WarehouseTypeValues = Object.values(WarehouseType)