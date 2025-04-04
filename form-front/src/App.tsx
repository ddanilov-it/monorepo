import React from "react";
import ClientForm from "./pages/ClientForm";

// Define the function to be passed as onClientAdded
const handleClientAdded = () => {
    // This function could update your table or refresh the list of clients
    console.log("Client added successfully!");
};

const App = () => {
    return <ClientForm onClientAdded={handleClientAdded} />;
};

export default App;
