import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useWorkflow } from '../../contexts/Workflow';

const SummaryForm = () => {
	const [tcChecked, setTcChecked] = useState(false);
	const { setOrderPhase } = useWorkflow();

	const popover = (
		<Popover id="popover-basic">
			<Popover.Content>No ice cream will actually be delivered</Popover.Content>
		</Popover>
	);

	const checkboxLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: 'blue' }}> Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<Form>
			<Form.Group controlId="terms-and-condition">
				<Form.Check type="checkbox" checked={tcChecked} onChange={(e) => setTcChecked(e.target.checked)} label={checkboxLabel} />
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!tcChecked} onClick={() => setOrderPhase('complete')}>
				Confirm Order
			</Button>
		</Form>
	);
};
export default SummaryForm;
