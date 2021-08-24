import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { WorkflowProvider } from './contexts/Workflow';
import Order from './pages/Order';

function App() {
	return (
		<Container>
			<WorkflowProvider>
				<OrderDetailsProvider>
					<Order />
				</OrderDetailsProvider>
			</WorkflowProvider>
		</Container>
	);
}

export default App;
