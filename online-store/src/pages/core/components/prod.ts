class Product  {

    protected isLoading: Boolean;
    protected type;
    protected data: null;

    constructor(type: string) {
      this.isLoading = false;
      this.type = type;
      this.data = null;
    }
    
  
    async fetchData() {
      this.isLoading = true;
  
      try {
        const url = `https://dummyjson.com/${this.type}`;
        const response = await fetch(url);
        const json = await response.json();
        this.data = json;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
      
    }
  
    getData() {
      return this.isLoading ? `${this.type} is still loading` : this.data;
    }
  };
  
export default Product;
  
  