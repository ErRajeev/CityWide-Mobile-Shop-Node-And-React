import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance ";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/contacts");
      setContacts(response.data);
    } catch (err) {
      setError("Failed to fetch contacts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="justify-content-center m-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p>{error}</p>
        <button onClick={fetchContacts} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        {contacts.length > 0 ? (
          contacts.map((data) => (
            <div className="card mb-4 shadow-sm" key={data?._id}>
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2>{data?.name}</h2>
                <h4>{data?.email}</h4>
                <h4>{data?.mobile}</h4>
              </div>
              <div className="card-body">
                <h4>Dear, CityWide Team</h4>
                <h5 className="mb-2">{data?.text}</h5>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center">No contacts found.</h2>
        )}
        <div className="text-center mt-3">
          <button onClick={fetchContacts} className="btn btn-primary">
            Refresh Contacts
          </button>
        </div>
      </div>
    </>
  );
};

export default Contacts;
