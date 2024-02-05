import React, { useState } from 'react';
import { Modal, Button, TextInput, Group } from '@mantine/core';
import { createAndRunModel } from '../utils/tensorflowOperations';

const AddLayerForm = () => {
    const [layers, setLayers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputFeatures, setInputFeatures] = useState('');
    const [outputFeatures, setOutputFeatures] = useState('');

    const addLayer = () => {
        const layer = {
            type: 'linear',
            in_features: parseInt(inputFeatures, 10),
            out_features: parseInt(outputFeatures, 10),
        };
        setLayers([...layers, layer]);
        setShowModal(false); // Close modal after adding
        setInputFeatures(''); // Reset input field
        setOutputFeatures(''); // Reset output field
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    console.log("JSON content:", json);
                    setLayers(json.layers || []);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("An error occurred while parsing the JSON file.");
                }
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a JSON file.");
        }
    };

    return (
        <div>
            <Group position="center">
                <Button onClick={() => setShowModal(true)}>Add Layer</Button>
                <input type="file" accept=".json" onChange={handleFileChange} style={{ display: 'block', marginTop: 15 }} />
                <Button onClick={() => createAndRunModel({ layers })} color="green">Compute and Download Results</Button>
            </Group>
            <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title="Add a new layer"
            >
                <TextInput
                    label="Input Features"
                    value={inputFeatures}
                    onChange={(event) => setInputFeatures(event.currentTarget.value)}
                    type="number"
                />
                <TextInput
                    label="Output Features"
                    value={outputFeatures}
                    onChange={(event) => setOutputFeatures(event.currentTarget.value)}
                    type="number"
                    style={{ marginTop: 15 }}
                />
                <Button onClick={addLayer} style={{ marginTop: 15 }}>Add Layer</Button>
            </Modal>
            <div>
                {layers.map((layer, index) => (
                    <div key={index}>
                        {`Layer ${index + 1}: Type - ${layer.type}, Input Features - ${layer.in_features}, Output Features - ${layer.out_features}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddLayerForm;
