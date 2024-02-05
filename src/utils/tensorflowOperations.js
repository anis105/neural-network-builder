import * as tf from '@tensorflow/tfjs';

// Function to create a TensorFlow.js model based on a configuration object
export async function createAndRunModel(config) {
    // Create a sequential model
    const model = tf.sequential();

    // Iterate over the layers in the config and add them to the model
    config.layers.forEach(layer => {
        if (layer.type === 'linear') {
            model.add(tf.layers.dense({
                units: layer.out_features,
                inputShape: [layer.in_features],
                activation: layer.activation || undefined,
            }));
        }
        // Add other layer types based on your requirements
        // Example for a convolutional layer:
        // else if (layer.type === 'conv2d') {
        //     model.add(tf.layers.conv2d({
        //         filters: layer.filters,
        //         kernelSize: layer.kernel_size,
        //         activation: layer.activation,
        //         inputShape: layer.input_shape,
        //     }));
        // }
    });


    // Dummy compile to demonstrate - replace with actual parameters
    model.compile({
        optimizer: 'sgd',
        loss: 'meanSquaredError',
    });

    // Generate dummy input data
    const inputShape = config.layers[0].inputShape || [config.layers[0].in_features];
    console.log(config.layers[0].in_features); // Debugging line
    const input = tf.randomNormal([1, config.layers[0].in_features]);
    const output = model.predict(input);

    // Convert output tensor to array and download as JSON
    const outputData = await output.array();
    downloadJSON(outputData, 'modelOutput.json');
}

// Function to download data as a JSON file
function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
