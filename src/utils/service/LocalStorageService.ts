
class LocalStorageService {
  static getUser() {
    const persistUser: string = localStorage.getItem('persist:user') || ""
    return persistUser == "" ? "" : JSON.parse(persistUser);
  }

  static setItem(key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageService;
