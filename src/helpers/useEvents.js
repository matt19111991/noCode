import { useCallback, useEffect, useMemo } from "react";

import { actions } from "Actions";

export const useActions = (rawActions) => {
	const mountingActions = useMemo(() => rawActions.filter(action => action.mounting));
	const updatingActions = useMemo(() => rawActions.filter(action => action.updating));

	const getAction = useCallback((actionToFind) =>
		actions.find(a => a.name === actionToFind.name)(actionToFind.params), [actions]
	);

	useEffect(() => {
		if (mountingActions.length !== 0) {
			mountingActions.forEach(getAction);
		}
	}, []);

	useEffect(() => {
		if (updatingActions.length !== 0) {
			updatingActions.forEach(getAction);
		}
	});

	const events = useMemo(() => rawActions
		.filter(action => !!action.event)
		.map(action => {
			const actionKey = `on${action.event.charAt(0).toUpperCase()}${action.event.slice(1)}`;
			const actionFunc = actions.find(a => a.name === action.name);

			return { [actionKey]: () => actionFunc(action.params) }
		}), [rawActions]);

	return {
		mountingActions,
		updatingActions,
		events: { ...Object.assign({}, ...events) } ?? {}
	}
};
