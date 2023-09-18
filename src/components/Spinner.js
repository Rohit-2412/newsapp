import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center py-4">
            <img src={loading} alt="loading" />
        </div>
    );
};

export default Spinner;
