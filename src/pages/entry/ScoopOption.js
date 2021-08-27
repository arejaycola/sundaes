import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const ScoopOptions = ({ name, imagePath, updateItemCount, validInputs }) => {
	const handleChange = (event) => {
		updateItemCount(name, event.target.value);
	};

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img style={{ width: '75%' }} alt={`${name} scoop`} src={`http://localhost:3030${imagePath}`} />
			<Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
				<Form.Label column xs="6" style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Control style={!validInputs ? { border: '1px solid red' } : null} type="number" defaultValue={0} onChange={handleChange} />
				</Col>
			</Form.Group>
		</Col>
	);
};
export default ScoopOptions;
