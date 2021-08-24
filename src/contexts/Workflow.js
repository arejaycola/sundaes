import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const Workflow = createContext();

//create custom hook to check where we are inside a provider
export const useWorkflow = () => {
	const context = useContext(Workflow);

	if (!context) {
		throw Error('userWorkflow must be used within a WorkflowProvider');
	}

	return context;
};

export const WorkflowProvider = (props) => {
	const [orderPhase, setOrderPhase] = useState('inProgress');
	return <Workflow.Provider value={{ orderPhase, setOrderPhase }} {...props} />;
};
