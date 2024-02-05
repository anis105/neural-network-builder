import React, { useState } from 'react';

const LayerModal = ({ addLayer }) => {
    const [inputFeatures, setInputFeatures] = useState(0);
    const [outputFeatures, setOutputFeatures] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming every added layer is linear, but you can add logic for different types
        addLayer({
            type: 'linear',
            in_features: parseInt(inputFeatures, 10),
            out_features: parseInt(outputFeatures, 10)
        });
    };

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h2>Add Linear Layer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Input Features:
                        <input
                            type="number"
                            value={inputFeatures}
                            onChange={(e) => setInputFeatures(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Output Features:
                        <input
                            type="number"
                            value={outputFeatures}
                            onChange={(e) => setOutputFeatures(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Layer</button>
            </form>
        </div>
    );
};

export default LayerModal;
