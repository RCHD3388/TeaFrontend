import dashboard_svg from "./../assets/sidebar_icon/dashboard.svg";
import project_svg from "./../assets/sidebar_icon/project.svg";
import inventory_svg from "./../assets/sidebar_icon/inventory.svg";
import purchasing_svg from "./../assets/sidebar_icon/purchasing.svg";
import supplier_svg from "./../assets/sidebar_icon/supplier.svg";
import employee_svg from "./../assets/sidebar_icon/employee.svg";
import user_svg from "./../assets/sidebar_icon/user.svg";
import request_svg from "./../assets/sidebar_icon/request.svg";
import category_svg from "./../assets/sidebar_icon/category.svg";
import process_svg from "./../assets/sidebar_icon/process.svg";

interface ISidebarItem {
  id: number
  link_to: string,
  link_name: string,
  icon: string,
  index?: number,
  role: string[]
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
  {id: 1, link_to: "/appuser/dashboard", link_name: "Dashboard", icon: dashboard_svg, role: ["owner", "admin", "mandor", "staff_pembelian"]},
  {id: 2, link_to: "/appuser/project", link_name: "Proyek", icon: project_svg, role: ["owner", "admin", "mandor"]},
  {id: 3, link_to: "/appuser/inventory", link_name: "Inventori", icon: inventory_svg, role: ["owner", "admin", "staff_pembelian"]},
  {id: 4, link_to: "/appuser/purchasing", link_name: "Pembelian", icon: purchasing_svg, role: ["owner", "admin", "staff_pembelian"]},
  {id: 5, link_to: "/appuser/supplier", link_name: "Supplier", icon: supplier_svg, role: ["owner", "admin", "staff_pembelian"]},
  {id: 6, link_to: "/appuser/employee", link_name: "Pegawai", icon: employee_svg, role: ["owner", "admin"]},
  {id: 7, link_to: "/appuser/user", link_name: "User", icon: user_svg, role: ["owner", "admin"]},
  {id: 8, link_to: "/appuser/category", link_name: "Kategori", icon: category_svg, role: ["owner", "admin"]},
  {id: 9, link_to: "/appuser/request", link_name: "Permintaan", icon: process_svg, role: ["owner", "admin", "mandor"]},
  {id: 10, link_to: "/appuser/approval", link_name: "Persetujuan", icon: request_svg, role: ["owner", "admin", "mandor"]},
]