import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
	const [isChecked, setisChecked] = useState(false);

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img style={{ width: '75%' }} alt={`${name} topping`} src={`http://localhost:3030${imagePath}`} />
			<Form.Group controlId="name-count">
				<Form.Label column cs="6" style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Form.Check
					type="checkbox"
					checked={isChecked}
					data-testid={`toppings-${name}`}
					onChange={(e) => {
						setisChecked(!isChecked);
						updateItemCount(name, e.target.checked ? 1 : 0);
					}}
				/>
			</Form.Group>
		</Col>
	);
};
export default ToppingOption;
