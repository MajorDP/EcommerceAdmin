# Admin Panel for Online Store 🛒

This project is an **admin-side application** for managing an online store. The application provides admins with tools to efficiently manage orders, track store statistics, and handle offers. Built with scalability and usability in mind, it ensures a smooth experience for admins while overseeing store operations.

**_LINK TO USER-SIDE APPLICATION:_**

- https://github.com/MajorDP/Ecommerce

## Newest Changes 💫

- /orders:
  - Admins can see all orders, filter them based on date, and sort them based on price, id, count of products in order, etc.
- /orders/id:
  - Finished, added general order info, map location chosen by user (FROM THE OTHER APP) and info on all products

## Upcoming Features 🚀

### **1. Order Management**

- View, filter, and search for orders.
- Access detailed order information:
  - Client details: Name, phone, email, postal code, map location, etc.
  - Order details: Items, total cost, payment method (e.g., cash on delivery).
  - Order status: Unconfirmed, Shipping, Rejected, Delivered.
- Accept or reject orders with customizable reasons.

### **2. Offer Management**

- Review offers submitted by clients.
- Approve or decline offers with optional feedback or reasons.

### **3. Store Statistics**

- Track and visualize key metrics:
  - Total orders (daily, weekly, monthly, yearly).
  - Review trends.
  - Accepted vs. rejected offers.
  - Top-selling products.

### **4. User reviews**

- List of users (clients) tracking:
  - Their orders
  - "Partnership" requests, allowing users (clients) to list and sell their products on the website under given rules and ability for admins to accept/reject said requests withreason

---

## Technologies Used 🛠️

| Stack        | Details                                    |
| ------------ | ------------------------------------------ |
| **Frontend** | React, TypeScript, JavaScript, TailwindCSS |
| **Backend**  | Supabase (BaaS)                            |
| **Database** | Supabase (BaaS)                            |
| **Others**   | react-leaflet                              |
