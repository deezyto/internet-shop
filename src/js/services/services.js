
export default class Resources {
  constructor(url) {
    this.url = url;
  }
  async getResource() {
    const res = await fetch(`${this.url}`);
  
    if (!res.ok) {
      throw new Error(`Could not fetch ${this.url}, status ${res.status}`);
    }
  
    return await res.json();
  }
}