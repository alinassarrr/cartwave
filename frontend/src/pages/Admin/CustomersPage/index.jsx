import React, { useState, useEffect } from "react";
import SectionHeader from "../../../components/SectionHeader";
import { adminService } from "../../../api/admin";
import "./styles.css";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const fetchCustomers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching customers for page:", page);

      const params = {
        page,
        per_page: 10,
      };

      const response = await adminService.getCustomers(params);
      console.log("Customers response:", response);

      const data = response.data || response;
      console.log("Customers data:", data);

      // Extract customers array and pagination from the response
      const customersArray = data.data || data;
      const paginationData = data;

      setCustomers(Array.isArray(customersArray) ? customersArray : []);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        per_page: paginationData.per_page || 10,
        total: paginationData.total || 0,
      });
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(`Failed to load customers: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handlePageChange = (page) => {
    fetchCustomers(page);
  };

  if (loading) return <div className="loading">Loading customers...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="customers-page">
      <SectionHeader
        title="Customer Management"
        subtitle="View and manage your customer database"
      />

      <div className="customers-table">
        <div className="table-header">
          <span>Customer</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Orders</span>
          <span>Total Spent</span>
          <span>Status</span>
        </div>

        {customers.length === 0 ? (
          <div className="no-customers">
            <p>No customers found</p>
          </div>
        ) : (
          customers.map((customer) => {
            console.log("Customer data:", customer);
            return (
              <div className="customer-row" key={customer.id}>
                <div className="customer-info">
                  <strong>
                    {customer.first_name} {customer.last_name}
                  </strong>
                  <p>Customer #{customer.id}</p>
                </div>
                <span>{customer.email}</span>
                <span>{customer.phone_number || "N/A"}</span>
                <span>{customer.orders_count || 0}</span>
                <span>
                  ${(Number(customer.orders_sum_total) || 0).toFixed(2)}
                </span>
                <span className="status active">Active</span>
              </div>
            );
          })
        )}
      </div>

      {pagination.total > 0 && (
        <div className="pagination">
          <p>
            Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{" "}
            {Math.min(
              pagination.current_page * pagination.per_page,
              pagination.total
            )}{" "}
            of {pagination.total} customers
          </p>
          <div className="pagination-controls">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              Previous
            </button>
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={page === pagination.current_page ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
