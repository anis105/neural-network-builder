import React from 'react';
import { MantineProvider, Container, Title, Paper, Space } from '@mantine/core';
import AddLayerForm from './components/AddLayerForm';

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
            <Container size="sm" style={{ marginTop: '40px' }}>
                <Title align="center">Neural Network Configuration Builder</Title>
                <Space h="md" /> {/* Adds some space between the title and the form */}
                <Paper shadow="xs" padding="md" radius="md">
                    <AddLayerForm />
                </Paper>
            </Container>
        </MantineProvider>
    );
}

export default App;
