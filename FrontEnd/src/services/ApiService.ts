// Centralized API service for backend communication
// Adjust baseUrl as per your backend server


class ApiService {
  // Update Order
  async updateOrder(id: number, dto: any) {
    const response = await fetch(`${this.baseUrl}/Order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  }
  // Delete Order
  async deleteOrder(id: number) {
    const response = await fetch(`${this.baseUrl}/Order/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete order');
    // No need to return response.json() for 204 No Content
  }
  private baseUrl = 'http://localhost:5000/api'; // Change if backend runs elsewhere

  // Address
  async getAllAddresses() {
    const response = await fetch(`${this.baseUrl}/Address`);
    return response.json();
  }
  async getAddressById(id: number) {
    const response = await fetch(`${this.baseUrl}/Address/${id}`);
    return response.json();
  }
  async createAddress(dto: any) {
    const response = await fetch(`${this.baseUrl}/Address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include',
    });
    return response.json();
  }

  // Billing
  async getAllBillings() {
    const response = await fetch(`${this.baseUrl}/Billing`);
    return response.json();
  }
  async getBillingById(id: number) {
    const response = await fetch(`${this.baseUrl}/Billing/${id}`);
    return response.json();
  }
  async createBilling(dto: any) {
    const response = await fetch(`${this.baseUrl}/Billing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // BillItem
  async getAllBillItems() {
    const response = await fetch(`${this.baseUrl}/BillItem`);
    return response.json();
  }
  async getBillItemById(id: number) {
    const response = await fetch(`${this.baseUrl}/BillItem/${id}`);
    return response.json();
  }
  async createBillItem(dto: any) {
    const response = await fetch(`${this.baseUrl}/BillItem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // City
  async getAllCities() {
    const response = await fetch(`${this.baseUrl}/City`);
    return response.json();
  }
  async getCityById(id: number) {
    const response = await fetch(`${this.baseUrl}/City/${id}`);
    return response.json();
  }
  async createCity(dto: any) {
    const response = await fetch(`${this.baseUrl}/City`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Country
  async getAllCountries() {
    const response = await fetch(`${this.baseUrl}/Country`);
    return response.json();
  }
  async getCountryById(id: number) {
    const response = await fetch(`${this.baseUrl}/Country/${id}`);
    return response.json();
  }
  async createCountry(dto: any) {
    const response = await fetch(`${this.baseUrl}/Country`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Customer
  async getAllCustomers() {
    try {
      const response = await fetch(`${this.baseUrl}/Customer`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
  async getCustomerById(id: number) {
    const response = await fetch(`${this.baseUrl}/Customer/${id}`);
    return response.json();
  }
  async createCustomer(dto: any) {
    const response = await fetch(`${this.baseUrl}/Customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Dispatch
  async getAllDispatches() {
    const response = await fetch(`${this.baseUrl}/Dispatch`);
    return response.json();
  }
  async getDispatchById(id: number) {
    const response = await fetch(`${this.baseUrl}/Dispatch/${id}`);
    return response.json();
  }
  async createDispatch(dto: any) {
    const response = await fetch(`${this.baseUrl}/Dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Distributor
  async getAllDistributors() {
    const response = await fetch(`${this.baseUrl}/Distributor`);
    return response.json();
  }
  async getDistributorById(id: number) {
    const response = await fetch(`${this.baseUrl}/Distributor/${id}`);
    return response.json();
  }
  async createDistributor(dto: any) {
    const response = await fetch(`${this.baseUrl}/Distributor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Employee
  async getAllEmployees() {
    const response = await fetch(`${this.baseUrl}/Employee`);
    return response.json();
  }
  async getEmployeeById(id: number) {
    const response = await fetch(`${this.baseUrl}/Employee/${id}`);
    return response.json();
  }
  async createEmployee(dto: any) {
    const response = await fetch(`${this.baseUrl}/Employee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // ItemMaster
  async getAllItemMasters() {
    try {
      const response = await fetch(`${this.baseUrl}/ItemMaster`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
  async getItemMasterById(id: number) {
    const response = await fetch(`${this.baseUrl}/ItemMaster/${id}`);
    return response.json();
  }
  async createItemMaster(dto: any) {
    const response = await fetch(`${this.baseUrl}/ItemMaster`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Order
  async getAllOrders() {
    try {
      const response = await fetch(`${this.baseUrl}/Order`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
  async getOrderById(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}/Order/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
  async createOrder(dto: any) {
    const response = await fetch(`${this.baseUrl}/Order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // OrderItem
  async getAllOrderItems() {
    const response = await fetch(`${this.baseUrl}/OrderItem`);
    return response.json();
  }
  async getOrderItemById(id: number) {
    const response = await fetch(`${this.baseUrl}/OrderItem/${id}`);
    return response.json();
  }
  async createOrderItem(dto: any) {
    const response = await fetch(`${this.baseUrl}/OrderItem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Permission
  async getAllPermissions() {
    const response = await fetch(`${this.baseUrl}/Permission`);
    return response.json();
  }
  async getPermissionById(id: number) {
    const response = await fetch(`${this.baseUrl}/Permission/${id}`);
    return response.json();
  }
  async createPermission(dto: any) {
    const response = await fetch(`${this.baseUrl}/Permission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Printing
  async getAllPrintings() {
    const response = await fetch(`${this.baseUrl}/Printing`);
    return response.json();
  }
  async getPrintingById(id: number) {
    const response = await fetch(`${this.baseUrl}/Printing/${id}`);
    return response.json();
  }
  async createPrinting(dto: any) {
    const response = await fetch(`${this.baseUrl}/Printing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Production
  async getAllProductions() {
    const response = await fetch(`${this.baseUrl}/Production`);
    return response.json();
  }
  async getProductionById(id: number) {
    const response = await fetch(`${this.baseUrl}/Production/${id}`);
    return response.json();
  }
  async createProduction(dto: any) {
    const response = await fetch(`${this.baseUrl}/Production`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // Role
  async getAllRoles() {
    const response = await fetch(`${this.baseUrl}/Role`);
    return response.json();
  }
  async getRoleById(id: number) {
    const response = await fetch(`${this.baseUrl}/Role/${id}`);
    return response.json();
  }
  async createRole(dto: any) {
    const response = await fetch(`${this.baseUrl}/Role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // RolePermission
  async getAllRolePermissions() {
    const response = await fetch(`${this.baseUrl}/RolePermission`);
    return response.json();
  }
  async getRolePermissionById(id: number) {
    const response = await fetch(`${this.baseUrl}/RolePermission/${id}`);
    return response.json();
  }
  async createRolePermission(dto: any) {
    const response = await fetch(`${this.baseUrl}/RolePermission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }

  // State
  async getAllStates() {
    const response = await fetch(`${this.baseUrl}/State`);
    return response.json();
  }
  async getStateById(id: number) {
    const response = await fetch(`${this.baseUrl}/State/${id}`);
    return response.json();
  }
  async createState(dto: any) {
    const response = await fetch(`${this.baseUrl}/State`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
        credentials: 'include'
    });
    return response.json();
  }
}

const apiService = new ApiService();
export default apiService;
